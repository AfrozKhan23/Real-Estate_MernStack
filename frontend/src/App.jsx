import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/AppLayout.jsx";
import Login from "./components/Login.jsx";
import Property from "./components/Property.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import setupAxiosAuth from "./utils/setupAxiosAuth.js";
import "./App.scss";

const App = () => {
  useEffect(() => {
    setupAxiosAuth();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property/:id" element={<Property />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
