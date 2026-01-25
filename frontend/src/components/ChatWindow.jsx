import { Chat } from "./Chat.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { SyncLoader } from "react-spinners";
import api from "../utils/api.js";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { guestApi } from "../utils/api.js";
import { toast } from "react-toastify";

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
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
    setFormType,
  } = useContext(AppContext);

  const [active, setActive] = useState(false);
  const [model, setModel] = useState(localStorage.getItem("model") || "2.0");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [userIconActive, setUserIconActive] = useState(false);

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
      if (userData) {
        const { data } = await api.post("/chat", {
          threadId: currentThreadId,
          message: prompt,
        });
        // console.log(data.resp);
        setReply(data.resp);
        setNewChat(false);
        console.log(data);
      } else {
        const { data } = await guestApi.post("/api/guest/guest-chat", {
          threadId: currentThreadId,
          message: prompt,
        });
        // console.log(data.resp);
        setReply(data.resp);
        setNewChat(false);
      }
    } catch (error) {
      // console.log(error);

      // Guest limit reached
      if (error.response?.status === 403) {
        toast.error(error.response.data.message);
        navigate("/c/login");
      }
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

  const handleLogout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUserData(null);
      setNewChat(true);
      setPrevChats([]);
      toast.success(data.message);
      navigate("/c/login");
    } catch (error) {
      toast(error.response?.message);
    }
  };

  return (
    <>
      <div
        className="flex flex-col justify-between items-center min-h-dvh px-4 py-2 "
        onClick={(e) => {
          e.stopPropagation();
          setActiveThreadId(null);
          setActive(false);
          setUserIconActive(false);
        }}
      >
        <div className="headerSection flex z-10 justify-between items-center w-full sticky top-0 bg-white dark:bg-[#14181E] ">
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
              <span className="text-lg text-gray-600 dark:text-gray-400 font-semibold">
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
                    className="px-7 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("model", "1.0");
                      setModel("1.0");
                      setActive(false);
                    }}
                  >
                    PurpleGPT 1.0
                  </li>
                  <li
                    className="px-7 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                    onClick={() => {
                      localStorage.setItem("model", "2.0");
                      setModel("2.0");
                      setActive(false);
                    }}
                  >
                    PurpleGPT 2.0
                  </li>
                  <li
                    className="px-7 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
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

          <div className="flex gap-3 items-center justify-center">
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

            <div className="flex items-center justify-center">
              <button
                className="flex items-center justify-center w-10 h-10 p-1.5 text-2xl font-semibold rounded-full bg-[#C269E4] hover:bg-[#ac5ecb] dark:hover:bg-[#ad50d2] text-white mr-4 cursor-pointer "
                onClick={(e) => {
                  e.stopPropagation();
                  setUserIconActive(!userIconActive);
                }}
              >
                {userData?.name ? (
                  userData.name.charAt(0).toUpperCase()
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </button>

              {userIconActive && (
                <div className="z-990 absolute top-12 right-5 w-36 bg-[#F9F9F9] dark:bg-[#424242] p-1 rounded-lg dark:text-white">
                  <ul className="w-full">
                    <li
                      className="px-6 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("model", "1.0");
                        setModel("1.0");
                        setActive(false);
                      }}
                    >
                      <i className="fa-solid fa-user"></i> &nbsp;Profile
                    </li>
                    <li
                      className="px-6 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("model", "2.0");
                        setModel("2.0");
                        setActive(false);
                      }}
                    >
                      <i className="fa-solid fa-gear"></i> &nbsp;Setting
                    </li>
                    <li
                      className="px-6 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("model", "3.0");
                        setModel("3.0");
                        setActive(false);
                      }}
                    >
                      <i className="fa-solid fa-box-archive"></i> &nbsp;Archive
                    </li>

                    <li
                      className="px-6 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                      onClick={() => {
                        localStorage.setItem("model", "3.0");
                        setModel("3.0");
                        setActive(false);
                      }}
                    >
                      {isLoggedIn ? (
                        <div onClick={handleLogout}>
                          <i className="fas fa-sign-out"></i> &nbsp;logout
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            navigate("/c/login");
                            setFormType("signin");
                          }}
                        >
                          <i className="fa-solid fa-arrow-right-to-bracket"></i>{" "}
                          &nbsp;login
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="chatSection flex-1 overflow-y-auto no-scrollbar scroll-smooth px-3 py-2 mt-2 w-full max-w-3xl relative"
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

        <div className="inputSection flex flex-col w-full min-w-sm max-w-3xl justify-center items-center">
          <div
            className="w-full h-26 px-2 py-2 flex flex-col justify-between rounded-2xl items-center overflow-hidden dark:bg-[#14181E] border border-gray-400 dark:border-gray-600 mb-2 "
            onClick={() => {
              inputRef.current.focus();
            }}
          >
            <textarea
              className="w-full flex-1 outline-none dark:bg-[#14181E] text-sm dark:text-white px-2 py-2 resize-none"
              ref={inputRef}
              rows="1"
              placeholder="Ask anything..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="w-full flex justify-between items-center  mt-2 ">
              <button
                className="flex justify-center items-center text-lg dark:text-white w-10 h-10 p-1 rounded-lg hover:bg-[#E5E7EB] dark:hover:bg-[#454545] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>

              <button
                className="flex justify-center items-center text-xl dark:text-white w-10 h-10 p-auto rounded-lg  hover:bg-[#E5E7EB]  dark:hover:bg-[#454545] cursor-pointer"
                onClick={fetchResponse}
              >
                <i className="fa-solid fa-paper-plane text-[#AE4AFF]"></i>
              </button>
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
