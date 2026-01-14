import { Chat } from "./Chat.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { SyncLoader } from "react-spinners";
import api from "../utils/api.js";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/AppContext.jsx";

export const ChatWindow = () => {
  const { theme, setTheme, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    prevChats,
    setPrevChats,
    setNewChat,
    threadId,
    setThreadId,
    setActiveThreadId,
  } = useContext(AppContext);

  const [active, setActive] = useState(false);
  const [model, setModel] = useState(localStorage.getItem("model") || "2.0");
  const inputRef = useRef(null);

  const BtnHandler = () => {
    toggleTheme();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && prompt !== "") {
      fetchResponse();
    }
  };

  const fetchResponse = async () => {
    if (!prompt.trim()) return;
    let currentThreadId = threadId;
    if (!currentThreadId) {
      currentThreadId = uuidv4();
      setThreadId(currentThreadId);
    }

    setLoading(true);
    try {
      const { data } = await api.post("/chat", {
        threadId: currentThreadId,
        message: prompt,
      });
      // console.log(data.resp);
      setReply(data.resp);
      setNewChat(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!reply) return;

    setPrevChats((prev) => [
      ...prev,
      { role: "user", content: prompt },
      { role: "assistant", content: reply },
    ]);

    setPrompt("");
  }, [reply]);

  return (
    <>
      <div
        className="flex flex-col justify-between items-center h-screen px-4 py-2 "
        onClick={(e) => {
          e.stopPropagation();
          setActiveThreadId(null);
          setActive(false);
        }}
      >
        <div className="headerSection flex z-10 justify-between items-center w-full sticky top-0 bg-white dark:bg-[#212121] ">
          <div className="flex items-center relative">
            <h1
              className="block w-full px-5 py-1 rounded-lg text-lg text-gray-800 hover:bg-gray-200 cursor-pointer
             dark:text-white dark:hover:bg-[#3A3A3A]"
              onClick={(e) => {
                e.stopPropagation();
                setActive(!active);
              }}
            >
              PurpleGPT{" "}
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {model}
                <i
                  className={`fa-solid fa-angle-${
                    active ? "right" : "down"
                  } text-sm`}
                ></i>
              </span>
            </h1>

            {active && (
              <div className="z-990 absolute top-10 left-0 w-44 bg-[#F9F9F9] dark:bg-[#424242] p-1 rounded-lg dark:text-white">
                <ul className="w-full">
                  <li
                    className=" px-7 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#3A3A3A] cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("model", "1.0");
                      setModel("1.0");
                      setActive(false);
                    }}
                  >
                    PurpleGPT 1.0
                  </li>
                  <li
                    className=" px-7 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#3A3A3A] cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("model", "2.0");
                      setModel("2.0");
                      setActive(false);
                    }}
                  >
                    PurpleGPT 2.0
                  </li>
                  <li
                    className=" px-7 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#3A3A3A] cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("model", "3.0");
                      setModel("3.0");
                      setActive(false);
                    }}
                  >
                    PurpleGPT 3.0
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex gap-4 items-center">
            <button
              className="flex items-center justify-center w-9 h-9 p-1.5 text-xl rounded-full bg-gray-200 text-black hover:bg-gray-300 dark:bg-[#212121] dark:hover:bg-[#3A3A3A] dark:text-white cursor-pointer"
              onClick={BtnHandler}
            >
              {theme === "dark" ? (
                <i className="fa-regular fa-sun"></i>
              ) : (
                <i className="fa-regular fa-moon"></i>
              )}
            </button>

            <button
              className="
            flex items-center justify-center w-10 h-10 p-1.5 text-xl rounded-full bg-[#C269E4] hover:bg-[#ac5ecb] dark:hover:bg-[#ad50d2] text-white mr-4 cursor-pointer"
            >
              <i className="fa-regular fa-user"></i>
            </button>
          </div>
        </div>

        <div
          className="chatSection flex-1 overflow-y-auto  no-scrollbar scroll-smooth px-3 py-2 mt-2 w-196 max-w-4xl relative"
          onClick={() => {
            setActive(false);
            setActiveThreadId(null);
          }}
        >
          <Chat />
        </div>

        {loading && (
          <div className="flex justify-center z-100 top-[75%] absolute">
            <SyncLoader color="#8B46E8" size={15} margin={5} />
          </div>
        )}

        <div className="inputSection flex flex-col  ">
          <div
            className="w-190 h-14 flex gap-3 justify-between rounded-full items-center overflow-hidden dark:bg-[#303030] border border-gray-400 dark:border-none mb-2 "
            onClick={() => {
              inputRef.current.focus();
            }}
          >
            <button
              className="flex justify-center items-center text-xl dark:text-white w-12 h-12 p-1 ml-1 rounded-full  hover:bg-[#E5E7EB] dark:hover:bg-[#454545] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <input
              className="w-166 outline-none dark:bg-[#303030] text-sm dark:text-white py-4"
              type="text"
              ref={inputRef}
              placeholder="Ask anything..."
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <button
              className="flex justify-center items-center text-xl dark:text-white w-12 h-12 p-1 mr-1 rounded-full  hover:bg-[#E5E7EB]  dark:hover:bg-[#454545] cursor-pointer"
              onClick={fetchResponse}
            >
              <i className="fa-solid fa-paper-plane text-[#AE4AFF]"></i>
            </button>
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
