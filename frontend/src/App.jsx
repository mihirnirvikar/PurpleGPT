import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Login } from "./pages/Login.jsx";
import { Error } from "./pages/Error.jsx";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
