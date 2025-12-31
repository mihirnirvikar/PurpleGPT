import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";


export const Chat = () => {
  const { newChat, setNewChat, prevChats, reply } = useContext(AppContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (!prevChats?.length) return;

    const content = reply.split(" ");
    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [reply]);

  return (
    <>
      {newChat && (
        <div className="flex justify-center items-center h-full w-full">
          <h1 className="text-black dark:text-white text-2xl flex items-center justify-center mb-4">
            New Chats
          </h1>
        </div>
      )}

      <div className="text-black dark:text-white flex flex-col gap-4">
        {prevChats?.slice(0, -1).map((chat, index) =>
          chat.role === "user" ? (
            <div className="flex justify-end" key={index}>
              <div className="bg-[#C269E4] text-white px-4 py-2 rounded-lg rounded-br-none max-w-full">
                {chat.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start" key={index}>
              <div className="bg-gray-200 dark:bg-[#3A3A3A] text-black dark:text-white px-4 py-2 rounded-lg rounded-bl-none max-w-full ">
                <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkDown>
              </div>
            </div>
          )
        )}

        {prevChats?.length > 0 && latestReply !== null && (
          <div className="flex justify-start" key={"latest-reply"}>
            <div className="bg-gray-200 dark:bg-[#3A3A3A] text-black dark:text-white px-4 py-2 rounded-lg rounded-bl-none max-w-full">
              <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                {latestReply}
              </ReactMarkDown>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
