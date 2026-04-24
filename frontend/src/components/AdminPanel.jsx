import { useState, useEffect, useMemo } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import pathUrl from "../utils/Path.js";

const AdminPanel = () => {
  const [pics, setPics] = useState([]);
  const [vid, setVid] = useState(null);
  const [property, setProperty] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${pathUrl}/api/v1/property`);
        setProperty(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  function handleImages(e) {
    setPics(e.target.files);
    formik.setFieldValue("photos", e.target.files);
    formik.setFieldTouched("photos", true, false);
  }

  function handleVideo(e) {
    setVid(e.target.files[0]);
    formik.setFieldValue("videos", e.target.files[0]);
    formik.setFieldTouched("videos", true, false);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${pathUrl}/api/v1/property/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProperty((prevProperty) =>
        prevProperty.filter((prop) => prop._id !== id)
      );
      toast.success("Property deleted");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to delete property");
    }
  };

  const closeAddDialog = () => {
    setOpenAddDialog(false);
    setError("");
    formik.resetForm();
    setPics([]);
    setVid(null);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      photos: null,
      videos: null,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is Required"),
      email: yup.string().email("Enter a valid email").required("Email is Required"),
      phone: yup.string().required("Phone is Required"),
      address: yup.string().required("Address is Required"),
      photos: yup.mixed().required("Image is required"),
      videos: yup.mixed().required("Video is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setSaving(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("address", values.address);

      Array.from(pics).forEach((pic) => {
        formData.append("photos", pic);
      });

      formData.append("videos", vid);

      try {
        const response = await axios.post(
          `${pathUrl}/api/v1/property/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperty([...property, response.data]);
        toast.success("Property created successfully");

        closeAddDialog();
      } catch (error) {
        const message =
          error?.response?.data?.error ||
          error?.message ||
          "Failed to create property. Please try again.";
        setError(message);
        toast.error(message);
      } finally {
        setSaving(false);
      }
    },
  });

  const rows = useMemo(
    () =>
      property.map((prop) => ({
        id: prop._id,
        image: prop.images?.[0] || "",
        name: prop.name || "-",
        address: prop.address || "-",
        phone: prop.phone || "-",
      })),
    [property]
  );

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 120,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <img src={params.value} alt="Property" className="admin-thumbnail" />
        ) : (
          <span className="admin-no-image">No image</span>
        ),
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
    { field: "address", headerName: "Address", flex: 1.4, minWidth: 240 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color="error"
          aria-label="Delete property"
          onClick={() => handleDelete(params.id)}
        >
          <DeleteOutlineRoundedIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Header />
      <section className="admin-dashboard">
        <div className="admin-table-card">
          <div className="admin-toolbar">
            <div>
              <Typography variant="h5" className="admin-title">
                Properties
              </Typography>
              <Typography className="admin-subtitle">
                Manage property listings with a modern dashboard table.
              </Typography>
            </div>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setOpenAddDialog(true)}
            >
              Add Property
            </Button>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
              },
            }}
          />
        </div>
      </section>

      <Dialog
        open={openAddDialog}
        onClose={closeAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Property</DialogTitle>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
              <TextField
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                fullWidth
              />
              <TextField
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                multiline
                minRows={3}
                fullWidth
              />

              <div className="admin-file-picker">
                <Typography variant="body2">Property Images</Typography>
                <input type="file" name="photos" multiple onChange={handleImages} />
                {formik.touched.photos && formik.errors.photos && (
                  <p className="admin-form-error">{formik.errors.photos}</p>
                )}
              </div>
              <div className="admin-file-picker">
                <Typography variant="body2">Property Video</Typography>
                <input type="file" name="videos" onChange={handleVideo} />
                {formik.touched.videos && formik.errors.videos && (
                  <p className="admin-form-error">{formik.errors.videos}</p>
                )}
              </div>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeAddDialog} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? "Saving..." : "Create Property"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Footer />
    </>
  );
};

export default AdminPanel;
