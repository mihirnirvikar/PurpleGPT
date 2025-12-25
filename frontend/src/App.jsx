import { Routes, Route } from "react-router-dom";
import { ChatWindow } from "./components/ChatWindow.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Outlet } from "react-router-dom";


function App() {
  
  return (
    <>
      <div className="flex flex-row h-screen">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
