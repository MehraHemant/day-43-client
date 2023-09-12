import { Box } from "@mui/material";
import "./App.css";
import Login from "./component/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Home from "./component/Home";
import Signup from "./component/Signup";
import { useSelector } from "react-redux";
import Page404 from "./component/Page404";

function App() {
  const state = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/reset_password/:id" element={<ResetPassword />} />
      <Route
        path="/home"
        element={state.user ? <Home /> : <Navigate to="/" />}
      />
      <Route path="/sign_up" element={<Signup />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />{" "}
    </Routes>
  );
}

export default App;
