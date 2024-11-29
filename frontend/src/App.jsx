import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import Login from "./components/Login.jsx";
import Property from "./components/Property.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
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
