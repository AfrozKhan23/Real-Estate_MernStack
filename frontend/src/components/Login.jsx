import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pathUrl from "../utils/Path";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email is Required"),
      // password: yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      console.log("Form Submitted", values);

      try {
        const response = await axios.post(`${pathUrl}api/v1/admin/login`, {
          email,
          password,
        });

        if (response) {
          const { token } = response.data;
          // console.log(response.data);
          // console.log(token);
          localStorage.setItem("token", token);
          localStorage.setItem("isLoggedIn", true);
          navigate("/admin");
        } else {
          setError("Invalid email or password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("An error occurred while logging in");
      }
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form-box">
        <h1 className="form-heading">Admin Login</h1>
        <input
          className="form-input1"
          type="email"
          name="email"
          id="email"
          placeholder="Enter admin email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="form-error">{formik.errors.email}</span>
        <input
          className="form-input2"
          type="password"
          name="password"
          id="password"
          placeholder="Enter admin password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="form-error">{formik.errors.password}</span>
        {error && <p className="form-error">{error}</p>}{" "}
        {/* Display any error message */}
        <button type="submit" className="form-btn">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
