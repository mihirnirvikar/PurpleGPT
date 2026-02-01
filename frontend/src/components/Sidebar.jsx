import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { AppContext } from "../context/AppContext.jsx";
import api from "../utils/api.js";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
export const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [filterData, setFilterData] = useState([]);
  const [yourChats, setYourChats] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {
    chatHistory,
    setChatHistory,
    reply,
    inActive,
    setInActive,
    setNewChat,
    setPrompt,
    setReply,
    threadId,
    setThreadId,
    setPrevChats,
    prevChatsThreadId,
    setPrevChatsThreadId,
    activeThreadId,
    setActiveThreadId,
    isLoggedIn,
  } = useContext(AppContext);

  const [renameThreadId, setRenameThreadId] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const fetchHistory = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Session expired, please login again");
      return;
    }

    if (!isLoggedIn) {
      return;
    }

    try {
      const { data } = await api.get(`/threads`);
      const filteredData = data.map((item) => {
        return {
          threadId: item.threadId,
          title: item.title,
        };
      });
      setFilterData(filteredData);
      setChatHistory(data);
      // toast.success("History Fetched Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch history");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchHistory();
    }
  }, [isLoggedIn]);

  const handleDelete = async () => {
    if (!activeThreadId) {
      toast.error("Please select a thread to delete");
      return;
    }
    console.log("Deleting thread:", activeThreadId);
    try {
      const { data } = await api.delete(`/threads/${activeThreadId}`);
      setPrevChats([]);
      setNewChat(true);
      fetchHistory();
      toast.success("Thread Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete thread");
    }
  };

  const handleRename = async (chat) => {
    setRenameThreadId(activeThreadId);
    setInputValue(chat.title);
  };

  const saveRename = async () => {
    try {
      const { data } = await api.put(
        `/threads/${renameThreadId}`,
        {
          newTitle: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      fetchHistory();
      setRenameThreadId(null);
      setActiveThreadId(null);
      setInputValue("");
      toast.success("Thread Renamed Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to rename thread");
    }
  };

  return (
    <>
      <div
        className={`p-2 h-screen ${inActive ? "cursor-w-resize" : ""}`}
        onClick={(e) => {
          if (inActive) {
            e.stopPropagation();
            localStorage.setItem("inActive", !inActive);
            setInActive(!inActive);
          }
        }}
      >
        <div
          className={`flex items-center ${
            inActive ? "pt-1 " : "justify-between pt-1"
          } mb-4`}
        >
          <div
            className={`flex w-10 h-10 text-xl justify-center items-center  px-1 rounded-lg text-bg-gray-800 hover:bg-gray-300 dark:hover:bg-[#45454563] cursor-pointer ${
              inActive ? " group-hover:hidden dark:bg-[#212121]" : ""
            }`}
          >
            <img src="favicon.svg" alt="Logo Image" />
          </div>

          <button
            className={`flex w-10 h-10 text-xl justify-center items-center  px-2 rounded-lg text-bg-gray-800 hover:bg-gray-300 dark:hover:bg-[#45454563] cursor-w-resize ${
              inActive ? " hidden group-hover:block  dark:bg-[#212121]" : ""
            }`}
            onClick={() => {
              localStorage.setItem("inActive", !inActive);
              setInActive(!inActive);
              setActiveThreadId(null);
            }}
          >
            <img
              className={`${theme === "dark" ? "invert" : ""}`}
              src="close.svg"
              alt="Close Bar"
            />
          </button>
        </div>

        <div
          className={`w-full h-10 flex items-center justify-center cursor-pointer p-2 text-black  hover:bg-gray-300 dark:hover:bg-[#45454563] dark:text-white rounded-lg mb-2 ${
            inActive ? "w-fit" : "block"
          }`}
          onClick={() => {
            setNewChat(true);
            setReply("");
            setInActive(false);
            setThreadId(uuidv4());
            setPrevChats([]);
            setPrevChatsThreadId(null);
          }}
        >
          <button
            className={`flex items-center cursor-pointer ${inActive ? "" : "gap-2"}`}
          >
            <i className="fa-solid fa-pen-to-square"></i>
            <p>{inActive ? "" : `New chat`}</p>
          </button>
        </div>

        <div
          className={`p-2 text-black dark:text-white text-sm mb-2 ${
            inActive ? "hidden" : ""
          }`}
        >
          <p
            className="items-center"
            onClick={() => {
              setYourChats(!yourChats);
            }}
          >
            Your chats{" "}
            <i
              className={`fa-solid fa-angle-${yourChats ? "down" : "right"}`}
            ></i>{" "}
          </p>
        </div>

        {yourChats && (
          <div
            className={`overflow-y-auto no-scrollbar scroll-smooth h-[78%] mb-2 ${
              inActive ? "hidden" : ""
            }`}
          >
            {filterData?.map((chat, index) => {
              return (
                <div
                  className={`w-full flex items-center p-2 text-black rounded-lg relative group ${
                    chat.threadId === prevChatsThreadId
                      ? "bg-[#E5E7EB] dark:bg-[#3A3A3A]"
                      : "hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A]"
                  } dark:text-white mb-1`}
                  key={chat.threadId}
                  onClick={() => {
                    setNewChat(false);
                    setInActive(false);
                    setActiveThreadId(null);
                    setPrevChatsThreadId(chat?.threadId);
                    setThreadId(chat?.threadId);
                  }}
                >
                  {renameThreadId === chat.threadId ? (
                    <input
                      autoFocus
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onBlur={() => saveRename()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveRename();
                        if (e.key === "Escape") {
                          setRenameThreadId(null);
                          setActiveThreadId(null);
                          setInputValue("");
                        }
                      }}
                      className="w-[90%]  outline-none text-black dark:text-white"
                    />
                  ) : (
                    <div className="flex items-center w-full">
                      <p className="truncate w-[90%]">{chat.title}</p>
                      <button
                        className={`cursor-pointer opacity-0 ${chat.threadId === prevChatsThreadId ? "opacity-100" : ""} group-hover:opacity-100 transition-opacity duration-200`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveThreadId(
                            activeThreadId === chat.threadId
                              ? null
                              : chat.threadId,
                          );
                        }}
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                  )}

                  {activeThreadId === chat.threadId && (
                    <div className="z-50 absolute top-10 right-0 w-30 bg-[#FFFFFF] dark:bg-[#424242] p-1 rounded-lg dark:text-white]">
                      <ul className="w-full ">
                        <li
                          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                          onClick={(e) => {
                            handleRename(chat);
                            e.stopPropagation();
                          }}
                        >
                          <i className="fa-solid fa-pencil"></i> &nbsp; Rename
                        </li>

                        <li
                          className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <i className="fa-solid fa-box-archive"></i>
                          &nbsp; Archive
                        </li>

                        <li
                          className="px-2 py-1 rounded hover:bg-[#e32a2a38] text-red-400 dark:hover:bg-[#e32a2a38] cursor-pointer"
                          onClick={(e) => {
                            handleDelete();
                            e.stopPropagation();
                          }}
                        >
                          <i className="fa-regular fa-trash-can"></i> &nbsp;
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* <div
          className={`flex w-48 items-center gap-3 mt-4 cursor-pointer fixed bottom-3 z-10 ${
            inActive ? "hidden" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex w-10 h-10 text-xl justify-center items-center bg-gray-200 mr-2 rounded-lg text-bg-gray-800 dark:bg-[#181818] hover:bg-gray-300 dark:hover:bg-[#3A3A3A]">
              <img src="favicon.svg" alt="Logo Image" />
            </div>
          </div>
          <div className="flex text-xl font-bold text-black dark:text-white">
            <h1>PurpleGPT</h1>
          </div>
        </div> */}
      </div>
    </>
  );
};
