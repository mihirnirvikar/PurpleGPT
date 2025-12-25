import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const ChatWindow = () => {
   
  return (
    <>
      <div className="flex flex-col h-full w-full dark:bg-[#212121] dark:text-white">
        <Header />
        <Outlet />
      </div>
    </>
  );
};
