import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import { Error } from "./pages/Error.jsx";
import { ResetPassword } from "./pages/ResetPassword.jsx";
import {ToastContainer} from "react-toastify";
import { Profile } from "./pages/Profile.jsx";

export const App = () => {
  return (
    <>
      <ToastContainer position="top-right" theme="light" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/c" element={<Layout />} />
        <Route path="/c/login" element={<Login />} />
        <Route path="/c/reset-password" element={<ResetPassword />} />
        <Route path="/c/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
