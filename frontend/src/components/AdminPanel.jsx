import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";
import pathUrl from "../utils/Path.js";

const AdminPanel = () => {
  const [pics, setPics] = useState([]);
  const [vid, setVid] = useState(null);
  const [property, setProperty] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

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
  // hello
  function handleImages(e) {
    setPics(e.target.files);
  }

  function handleVideo(e) {
    setVid(e.target.files[0]);
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
      console.log("Property deleted successfully:", id);
    } catch (error) {
      console.log("Error deleting property:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      photos: [],
      videos: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is Required"),
      email: yup.string().required("Email is Required"),
      phone: yup.string().required("Phone is Required"),
      address: yup.string().required("Address is Required"),
      photos: yup.mixed().required("Image is required"),
      videos: yup.mixed().required("Video is required"),
    }),
    onSubmit: async (values) => {
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
        console.log("Property added successfully:", response.data);

        formik.setValues({
          name: "",
          email: "",
          phone: "",
          address: "",
          photos: [],
          videos: [],
        });
        setPics([]);
        setVid(null);
      } catch (error) {
        if (error.response) {
          console.log("Response error:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request error:", error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    },
  });

  return (
    <>
      <Header />
      <div className="admin">
        <div className="admin-aside">
          <form
            action="/"
            method="post"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data" // need to understand what multipart does?
          >
            <h1 className="aside-h1">Add Property</h1>
            <label htmlFor="name">Name :</label>
            <input
              className="admin-input1"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <p className="admin-error">{formik.errors.name}</p>

            <label htmlFor="email">Email :</label>
            <input
              className="admin-input2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <p className="admin-error">{formik.errors.email}</p>

            <label htmlFor="phone">Phone :</label>
            <input
              className="admin-input3"
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter your phone number..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <p className="admin-error">{formik.errors.phone}</p>

            <label htmlFor="address">Address :</label>
            <textarea
              className="admin-textarea"
              name="address"
              id="address"
              placeholder="Enter property address..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            <p className="admin-error">{formik.errors.address}</p>

            <label htmlFor="photos">Image :</label>
            <input
              className="admin-img"
              type="file"
              name="photos"
              id="photos"
              multiple
              onChange={handleImages}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.photos}</p>

            <label htmlFor="videos">Video :</label>
            <input
              className="admin-video"
              type="file"
              name="videos"
              id="videos"
              onChange={handleVideo}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.videos}</p>

            <button type="submit" className="prop-btn">
              Add property
            </button>
          </form>
        </div>
        <div className="admin-main">
          <div className="admin-header">
            <span>Photo</span>
            <span>Name</span>
            <span>Address</span>
            <span>Phone</span>
          </div>
          <div>
            {property.map((prop) => (
              <ul key={prop._id} className="admin-ul">
                {prop.images && prop.images.length > 0 ? (
                  <li className="img-li">
                    <img
                      src={prop.images[0]}
                      alt="image"
                      className="dashboard-img"
                    />
                  </li>
                ) : (
                  <li>No images available.</li>
                )}
                <li className="prop-name">{prop.name}</li>
                <li className="prop-address">{prop.address}</li>
                <li className="prop-phone">{prop.phone}</li>
                <li>
                  <AiTwotoneDelete
                    className="delete-icon"
                    onClick={() => handleDelete(prop._id)}
                  />
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;
