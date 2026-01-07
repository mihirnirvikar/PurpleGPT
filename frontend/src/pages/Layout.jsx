import { Sidebar } from "../components/Sidebar.jsx";
import { ChatWindow } from "../components/ChatWindow.jsx";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

export const Layout = () => {
  const { inActive, setInActive } = useContext(AppContext);
  const divRef = useRef(null);

  useEffect(() => {
    if (inActive) {
      divRef.current.classList.add("inActive");
    } else {
      divRef.current.classList.remove("inActive");
    }
  }, [inActive]);

  return (
    <>
      <div ref={divRef} className="flex h-screen flex-0">
        <div
          className={`${
            inActive
              ? "w-18 group dark:bg-[#212121] border-r dark:border-[#3A3A3A] border-[#D9D9D9] transition-all ease-in-out duration-300"
              : "w-64"
          } dark:bg-[#181818] bg-[#F9F9F9] transition-all ease-in-out duration-300`}
        >
          <Sidebar />
        </div>
        <div className="flex-1 dark:bg-[#212121] bg-[#FFFFFF]">
          <ChatWindow />
        </div>
      </div>
    </>
  );
};
