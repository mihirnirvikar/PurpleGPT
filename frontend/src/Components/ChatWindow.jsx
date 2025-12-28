import { Chat } from "./Chat.jsx";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export const ChatWindow = () => {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);

  const BtnHandler = () => {
    toggleTheme();
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen px-4 py-2 ">
        <div className="flex justify-between items-center w-full sticky top-0 bg-white pb-2 dark:bg-[#212121] ">
          <div className="flex items-center px-5 py-1 rounded-lg hover:bg-gray-200 cursor-pointer dark:hover:bg-[#3A3A3A] ">
            <h1 className="text-lg text-gray-800 dark:text-white font-semibold">
              PurpleGPT{" "}
              <span className="text-lg text-gray-600 dark:text-gray-400">
                2.0<i class="fa-solid fa-angle-down text-sm"></i>
              </span>
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <button
              className="flex items-center justify-center w-10 h-10 p-1.5 text-xl rounded-lg bg-gray-200 text-black hover:bg-gray-300 dark:bg-[#212121] dark:hover:bg-[#3A3A3A] dark:text-white"
              onClick={BtnHandler}
            >
              {theme === "dark" ? (
                <i class="fa-regular fa-sun"></i>
              ) : (
                <i class="fa-regular fa-moon"></i>
              )}
            </button>

            <button
              className="
            flex items-center justify-center w-10 h-10 p-1.5 text-xl rounded-full bg-[#C269E4] hover:bg-[#ac5ecb] dark:hover:bg-[#ad50d2] text-white mr-4 "
            >
              <i class="fa-regular fa-user"></i>
            </button>
          </div>
        </div>
        <div>
          <Chat />
        </div>
        <div className="flex flex-col  ">
          <div class="w-190 h-14 flex gap-3 justify-between rounded-full items-center overflow-hidden dark:bg-[#303030] border border-gray-400 dark:border-none mb-2 ">

            <div className="flex justify-center items-center text-xl dark:text-white w-12 h-12 p-1 ml-1 rounded-full  hover:bg-[#E5E7EB] dark:hover:bg-[#454545] ">
              <i class="fa-solid fa-plus"></i>
            </div>
            <input
              className="w-166 outline-none dark:bg-[#303030] text-sm dark:text-white"
              type="text"
              placeholder="Ask anything..."
            />
            <div className="flex justify-center items-center text-xl dark:text-white w-12 h-12 p-1 mr-1 rounded-full  hover:bg-[#E5E7EB]  dark:hover:bg-[#454545]">
              <i class="fa-solid fa-paper-plane"></i>
            </div>
          </div>
          <div className="flex justify-center items-center text-xs text-black dark:text-white">
            <p>
              PurpleGPT can make mistakes. Check important info. See Cookie
              Preferences.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
