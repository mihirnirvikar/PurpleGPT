import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

export const Chat = () => {
  const { newChat, setNewChat, prevChats } = useContext(AppContext);
  setNewChat(false);

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
        {prevChats?.map((chat, index) =>
          chat.role === "user" ? (
            <div className="flex justify-end" key={index}>
              <div className="bg-[#C269E4] text-white px-4 py-2 rounded-lg rounded-br-none max-w-full">
                {chat.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start" key={index}>
              <div className="bg-gray-200 dark:bg-[#3A3A3A] text-black dark:text-white px-4 py-2 rounded-lg rounded-bl-none max-w-full">
                <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkDown>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};
