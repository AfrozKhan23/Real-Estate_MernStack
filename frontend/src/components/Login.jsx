import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import pathUrl from "../utils/Path";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Min 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      try {
        const response = await axios.post(`${pathUrl}/api/v1/admin`, values);
        const { token } = response.data || {};
        if (!token) {
          setError("Invalid email or password");
          return;
        }
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login successful");
        navigate("/admin");
      } catch (err) {
        const message =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Login failed. Please try again.";
        setError(
          message,
        );
        toast.error(message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to manage your properties</p>

        <form className="auth-form" onSubmit={formik.handleSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            className={`auth-input ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            type="email"
            name="email"
            id="email"
            placeholder="admin@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <span className="auth-error">{formik.errors.email}</span>
          )}

          <label htmlFor="password">Password</label>
          <input
            className={`auth-input ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <span className="auth-error">{formik.errors.password}</span>
          )}

          {error && <p className="auth-error auth-error-banner">{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
