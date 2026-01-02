import purpleGPT2 from "../assets/purpleGPT2.0.png";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
export const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const [filterData, setFilterData] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { chatHistory, setChatHistory, reply, inActive, setInActive } = useContext(AppContext);

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

  return (
    <>
      <div className={`p-2 w-full`}>
        <div className={`flex items-center ${inActive ? "ml-2 pt-1 " : "justify-between pt-1"} mb-4`}>
          <div className={`flex w-10 h-10 text-xl justify-center items-center bg-gray-200 mr-2 rounded-lg text-bg-gray-800 dark:bg-[#181818] hover:bg-gray-300 dark:hover:bg-[#3A3A3A]  ${inActive ? "group-hover:hidden dark:bg-[#212121]" : ""}`}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#C269E4"
                stroke-width="14"
                stroke-linecap="round"
              />

              <path
                d="M70 135 L70 85 
                  Q70 60 100 60 
                  Q130 60 130 85 
                  Q130 105 100 105 
                  L90 105 
                  Q70 105 70 135 
                  Z"
                stroke="#C269E4"
                stroke-width="16"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
              />

              <line
                x1="100"
                y1="105"
                x2="135"
                y2="105"
                stroke="#C269E4"
                stroke-width="10"
                stroke-linecap="round"
              />

              <circle cx="145" cy="105" r="12" fill="#C269E4" />
            </svg>
          </div>

          <button className={`flex w-10 h-10 text-xl justify-center items-center bg-gray-200 mr-2 rounded-lg text-bg-gray-800 hover:bg-gray-300 dark:bg-[#181818]  dark:hover:bg-[#3A3A3A] ${inActive ? "hidden group-hover:block pl-1.5 dark:bg-[#212121]" : ""}`} onClick={() => {
            setInActive(!inActive);
          }}>
            <svg
              width="26"
              height="32"
              viewBox="0 0 38 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <rect
                x="2"
                y="2"
                width="34"
                height="26"
                rx="7"
                stroke={theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="3"
              />

              <line
                x1="15"
                y1="2"
                x2="15"
                y2="28"
                stroke={theme === "dark" ? "#ffffff" : "#000000"}
                stroke-width="3"
              />
            </svg>
          </button>
        </div>

        <div className={`w-full flex items-center justify-center p-2 text-black  hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A] dark:text-white rounded-lg mb-2 ${inActive ? "w-fit" : "block"}`}>
          <button>
            <i class="fa-solid fa-pencil"></i>&nbsp; {inActive ? "" : "New Chat"}
          </button>
        </div>

        <div className={`p-2 text-black dark:text-white text-sm mb-2 ${inActive ? "hidden" : ""}`}>
          <p>
            Your chats <i class="fa-solid fa-angle-right"></i>{" "}
          </p>
        </div>

        <div className={`verflow-y-auto no-scrollbar scroll-smooth h-[69vh] mb-2  ${inActive ? "hidden" : ""}`}>
          {filterData?.map((chat, index) => {
            return (
              <div
                className="w-full flex items-center p-2 text-black hover:bg-[#E5E7EB] dark:hover:bg-[#3A3A3A] dark:text-white rounded-lg"
                key={index}
              >
                <p className="truncate w-[90%]">{chat.title}</p>
                <button className="cursor-pointer">
                  <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </div>
            );
          })}
        </div>

        <div className={`flex w-full items-center gap-3 mt-4  ${inActive ? "hidden" : ""}`}>
          <div className="flex items-center justify-between">
            <div className="flex w-10 h-10 text-xl justify-center items-center bg-gray-200 mr-2 rounded-lg text-bg-gray-800 dark:bg-[#181818] hover:bg-gray-300 dark:hover:bg-[#3A3A3A]">
              <svg
                width="40"
                height="40"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="#C269E4"
                  stroke-width="14"
                  stroke-linecap="round"
                />

                <path
                  d="M70 135 L70 85 
                    Q70 60 100 60 
                    Q130 60 130 85 
                    Q130 105 100 105 
                    L90 105 
                    Q70 105 70 135 
                    Z"
                  stroke="#C269E4"
                  stroke-width="16"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  fill="none"
                />

                <line
                  x1="100"
                  y1="105"
                  x2="135"
                  y2="105"
                  stroke="#C269E4"
                  stroke-width="10"
                  stroke-linecap="round"
                />

                <circle cx="145" cy="105" r="12" fill="#C269E4" />
              </svg>
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
