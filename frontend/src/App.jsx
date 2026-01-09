import { Routes, Route } from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import { Error } from "./pages/Error.jsx";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/c" element={<Layout />} />
        <Route path="/c/login" element={<Login />} />
        <Route path="*" element={<Error />} />
        <Route path="/c/reset-password" element={<Login />} />
      </Routes>
    </>
  );
};
