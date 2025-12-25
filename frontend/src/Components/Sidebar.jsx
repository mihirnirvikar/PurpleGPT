import IndianGpt_logo from "../assets/indian_icon.png";
import { useEffect, useState } from "react";
import axios from "axios";

export const Sidebar = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThread = async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/thread"
      );
      console.log(data);
      setThreads(data);
    };

    fetchThread();
  }, []);

  return (
    <>
      <div className="sm:w-76 h-full border-r px-4 py-2">
        <div className="flex items-center justify-between mb-3">
          <img
            className="w-12 h-12 rounded-full bg-purple-300"
            src={IndianGpt_logo}
            alt=""
          />
          <i class="fa-solid fa-xmark text-2xl"></i>
        </div>
        <hr className="text-gray-400 mb-3" />

        <div className="mb-4">
          <button className="w-full py-2 px-4 rounded-md flex items-center hover:bg-gray-200">
            <i class="fa-solid fa-plus mr-1"></i> <span>New Chat</span>
          </button>
        </div>

        <h1 className="mb-2 text-gray-600 text-sm px-4">
          Your chats <i class="fa-solid fa-angle-down"></i>
        </h1>

        <div className="h-4/6 overflow-y-auto scroll-smooth px-2 mb-2">
          <div className="flex flex-col  ">
            {threads.map((thread) => (
              <div className="py-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <p className="px-2">{thread.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 mt-4">
          <button className="w-full py-2 px-4 rounded-md flex items-center hover:bg-gray-200 gap-2">
            <img className="w-12 h-12" src={IndianGpt_logo} alt="" /> <span>IndianGPT</span>
          </button>
        </div>
      </div>
    </>
  );
};
