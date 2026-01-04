import purpleGPT2 from "../assets/purpleGPT2.0.png";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [filterData, setFilterData] = useState([]);
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
    setPrevChatsThreadId,
    activeThreeDot,
    setActiveThreeDot
  } = useContext(AppContext);
  

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/thread`);
      const filteredData = data.map((item) => {
        return {
          threadId: item.threadId,
          title: item.title,
        };
      });
      setFilterData(filteredData);
      setChatHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [reply]);

  const handleDelete = async() =>{
    try {
      const { data } = await axios.delete(`${backendUrl}/thread/${activeThreeDot}`);
      fetchHistory();
      setPrevChats([]);
      setNewChat(true);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={`p-2 w-full`}>
        <div
          className={`flex items-center ${
            inActive ? "ml-2 pt-1 " : "justify-between pt-1"
          } mb-4`}
        >
          <div
            className={`flex w-10 h-10 text-xl justify-center items-center bg-gray-200 mr-2 rounded-lg text-bg-gray-800 dark:bg-[#181818] hover:bg-gray-300 dark:hover:bg-[#3A3A3A]  ${
              inActive ? "group-hover:hidden dark:bg-[#212121]" : ""
            }`}
          >
            <img src="favicon.svg" alt="Logo Image" />
          </div>

          <button
            className={`flex w-9 h-9 text-xl justify-center items-center bg-gray-200 mr-2 rounded-lg  text-bg-gray-800 hover:bg-gray-300 dark:bg-[#181818]  dark:hover:bg-[#3A3A3A] ${
              inActive
                ? "hidden group-hover:block pl-1.5 dark:bg-[#212121]"
                : ""
            }`}
            onClick={() => {
              setInActive(!inActive);
              setActiveThreeDot(null);
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
          className={`w-full flex items-center justify-center cursor-pointer p-2 text-black  hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A] dark:text-white rounded-lg mb-2 ${
            inActive ? "w-fit" : "block"
          }`}
          onClick={() => {
            setNewChat(true);
            setReply("");
            setInActive(false);
            setThreadId(uuidv4());
            setPrevChats([]);
          }}
        >
          <button className="flex items-center cursor-pointer">
            <i class="fa-solid fa-pencil"></i>&nbsp;{" "}
            {inActive ? "" : "New Chat"}
          </button>
        </div>

        <div
          className={`p-2 text-black dark:text-white text-sm mb-2 ${
            inActive ? "hidden" : ""
          }`}
        >
          <p>
            Your chats <i class="fa-solid fa-angle-right"></i>{" "}
          </p>
        </div>

        <div
          className={`overflow-y-auto cursor-pointer no-scrollbar scroll-smooth h-[69vh] mb-2  ${
            inActive ? "hidden" : ""
          }`}
        >
          {filterData?.map((chat, index) => {
            return (
              <div
                className="w-full flex items-center p-2 text-black hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A] dark:text-white rounded-lg relative"
                key={index}
                onClick={() => {
                  setNewChat(false);
                  setInActive(false);
                  setActiveThreeDot(null);
                  setPrevChatsThreadId(chat?.threadId);
                }}
              >
                <p className="truncate w-[90%]">{chat.title}</p>
                <button
                  className="cursor-pointer "
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveThreeDot(
                      activeThreeDot === chat.threadId ? null : chat.threadId
                    );
                  }}
                >
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

                {activeThreeDot === chat.threadId && (
                  <div className="z-50 absolute top-10 right-0 w-30 bg-[#FFFFFF] dark:bg-[#424242] p-1 rounded-lg dark:text-white">
                    <ul className="w-full">
                      <li className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#3A3A3A] cursor-pointer">
                        <i class="fa-solid fa-box"></i> &nbsp;
                        Rename
                      </li>
                      <li className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#3A3A3A] cursor-pointer" onClick={handleDelete}>
                        <i class="fa-regular fa-trash-can"></i> &nbsp;
                        Delete
                      </li>
                      <li className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#3A3A3A] cursor-pointer">
                        <i class="fa-solid fa-box"></i>
                        &nbsp;
                        Archive
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`flex w-full items-center gap-3 mt-4  ${
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
        </div>
      </div>
    </>
  );
};
