import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import Property from "./components/Property";
import Adminpanel from "./components/adminPanel";
import PrivateRoute from "./components/PrivateRoute";
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
              <Adminpanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
