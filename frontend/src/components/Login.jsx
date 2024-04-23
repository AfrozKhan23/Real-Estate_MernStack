import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pathUrl from "../utils/Path";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is Required"),
      password: yup.string().required("password is Required"),
    }),
    onSubmit: async (values) => {
      const formEmail = values.email;
      const formPassword = values.password;

      try {
        const response = await axios.post(`${pathUrl}api/v1/admin`, {
          email: formEmail,
          password: formPassword,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          navigate("/admin");
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in");
      }
    },
  });

  return (
    <form
      className="form"
      onSubmit={formik.handleSubmit}
      action="/"
      method="post"
    >
      <div className="form-box">
        <h1 className="form-heading">Admin Login</h1>
        <input
          className="form-input1"
          type="email"
          name="email"
          id="email"
          placeholder="Enter admin email"
          onChange={formik.handleChange}
        />
        <span className="form-error">{formik.errors.email}</span>
        <input
          className="form-input2"
          type="password"
          name="password"
          id="password"
          placeholder="Enter admin password"
          onChange={formik.handleChange}
        />
        <span className="form-error">{formik.errors.password}</span>
        <button type="submit" className="form-btn">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
