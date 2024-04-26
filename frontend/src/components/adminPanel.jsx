import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import pathUrl from "../utils/Path";
import { AiTwotoneDelete } from "react-icons/ai";

const AdminPanel = () => {
  const [pics, setPics] = useState([]);
  const [vid, setVid] = useState([]);
  const [property, setProperty] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${pathUrl}api/v1/property`);
        setProperty(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [property]);

  function handleImages(e) {
    setPics(e.target.files);
  }

  function handleVideo(e) {
    setVid(e.target.files[0]);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${pathUrl}api/v1/property/delete/${id}`);
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
      address: yup.string().required("address is Required"),
      photos: yup.mixed().required("Image is required"),
      videos: yup.mixed().required("Video is required"),
    }),
    onSubmit: async (values, actions) => {
      const formName = values.name;
      const formEmail = values.email;
      const formPhone = values.phone;
      const formAddress = values.address;
      const formImgs = pics;
      const formVideo = vid;

      const formData = new FormData();
      formData.append("name", formName);
      formData.append("email", formEmail);
      formData.append("phone", formPhone);
      formData.append("address", formAddress);

      for (let i = 0; i < formImgs.length; i++) {
        formData.append("photos", formImgs[i]);
      }

      formData.append("videos", formVideo);
      actions.resetForm();

      try {
        const response = await axios.post(
          `${pathUrl}api/v1/property/create`,
          formData
        );
        setProperty([...property, response.data]);
        console.log("Property added successfully:", response.data);
      } catch (error) {
        console.log("Error adding property:", error);
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
            encType="multipart/form-data"
          >
            <h1 className="aside-h1">Add Property</h1>
            <label htmlFor="name" id="name">
              Name :
            </label>
            <input
              className="admin-input1"
              type="name"
              name="name"
              id="name"
              placeholder="Enter your name..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.name}</p>
            <br />

            <label htmlFor="email" id="email">
              Email :
            </label>
            <input
              className="admin-input2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.email}</p>
            <br />

            <label htmlFor="phone" id="phone">
              Phone :
            </label>
            <input
              className="admin-input3"
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter your phone number..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <br />
            <p className="admin-error">{formik.errors.phone}</p>

            <label htmlFor="address" id="address">
              Address :
            </label>
            <textarea
              className="admin-textarea"
              name="address"
              id="address"
              placeholder="Enter property address..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.address}</p>

            <label htmlFor="photos" id="photos">
              Image :
            </label>
            <input
              className="admin-img"
              type="file"
              name="photos"
              id="photos"
              multiple={true}
              onChange={(e) => handleImages(e)}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.photos}</p>
            <br />
            <label htmlFor="videos" id="videos">
              Video :
            </label>
            <input
              className="admin-video"
              type="file"
              name="videos"
              id="videos"
              onChange={(e) => handleVideo(e)}
              onBlur={formik.handleBlur}
            />
            <p className="admin-error">{formik.errors.photos}</p>
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
            {property?.map((prop) => (
              <ul key={prop._id} className="admin-ul">
                {prop.images.length > 0 && (
                  <li className="img-li">
                    <img
                      src={`${pathUrl}${prop.images[0]}`}
                      alt="image"
                      className="dashboard-img"
                    />
                  </li>
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
