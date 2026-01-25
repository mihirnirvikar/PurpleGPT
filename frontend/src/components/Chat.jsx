import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import ReactMarkDown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import api from "../utils/api.js";

export const Chat = () => {
  const {
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    reply,
    setReply,
    prevChatsThreadId,
  } = useContext(AppContext);

  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (!reply) {
      setLatestReply(null);
      return;
    }

    const content = reply.split(" ");
    let idx = 0;

    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));
      idx++;

      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [reply]);

  useEffect(() => {
    if (!prevChatsThreadId) return;

    const fetchHistoryChats = async () => {
      try {
        const { data } = await api.get(
          `/threads/${prevChatsThreadId}`
        );
        
        setPrevChats(data.messages);
        setNewChat(false);
        setReply(null);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistoryChats();
  }, [prevChatsThreadId]);

  return (
    <>
      {newChat && (
        <div className="flex justify-center items-center h-full max-w-full min-w-sm">
          <div>
            <h1 className="text-black dark:text-white text-2xl text-center mb-2">
              New Chat
            </h1>
            <p className="text-black dark:text-white text-center mb-4">
              What’s on your mind? Ask anything, anywhere.
            </p>
          </div>
        </div>
      )}

      <div className="text-black dark:text-white flex flex-col gap-4">
        {prevChats?.slice(0, -1).map((chat, index) =>
          chat.role === "user" ? (
            <div className="flex justify-end" key={index}>
              <div className="bg-[#AE4AFF] text-white px-4 py-2 rounded-lg rounded-br-none max-w-full">
                {chat.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start" key={index}>
              <div className="bg-gray-200 dark:bg-[#2B2D31] px-4 py-2 rounded-lg rounded-bl-none max-w-full">
                <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkDown>
              </div>
            </div>
          )
        )}

        {prevChats?.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-[#2B2D31] px-4 py-2 rounded-lg rounded-bl-none max-w-full">
              <ReactMarkDown rehypePlugins={[rehypeHighlight]}>
                {latestReply !== null
                  ? latestReply
                  : prevChats[prevChats.length - 1].content}
              </ReactMarkDown>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
