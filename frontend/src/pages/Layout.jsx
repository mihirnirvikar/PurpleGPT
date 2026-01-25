import { Sidebar } from "../components/Sidebar.jsx";
import { ChatWindow } from "../components/ChatWindow.jsx";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import api from "../utils/api.js";

export const Layout = () => {
  const { inActive, setInActive, guestSessionId, setGuestSessionId } =
    useContext(AppContext);
  const divRef = useRef(null);

  useEffect(() => {
    if (inActive) {
      divRef.current.classList.add("inActive");
    } else {
      divRef.current.classList.remove("inActive");
    }
  }, [inActive]);

  const handleGuestUser = async () => {
    if (guestSessionId) {
      return;
    }

    try {
      const { data } = await api.get("/api/guest/create-guest-session");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGuestUser();
  }, []);

  return (
    <>
      <div ref={divRef} className="flex min-h-dvh max-w-full min-w-sm overflow-hidden">
        <div
          className={`${
            inActive
              ? "max-w-18 min-w-14 group dark:bg-[#2B2D31] border-r dark:border-[#3A3A3A] border-[#D9D9D9] transition-all ease-in-out duration-300"
              : "max-w-64 min-w-0"
          } dark:bg-[#14181A] bg-[#F9F9F9] transition-all ease-in-out duration-300`}
        >
          <Sidebar />
        </div>
        <div className="flex-1 min-w-0 min-h-dvh overflow-hidden dark:bg-[#14181E] bg-[#FFFFFF] ">
          <ChatWindow />
        </div>
      </div>
    </>
  );
};
