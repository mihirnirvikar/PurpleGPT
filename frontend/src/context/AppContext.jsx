import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [threadId, setThreadId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [inActive, setInActive] = useState(false);
  const [prevChatsThreadId, setPrevChatsThreadId] = useState(null);
  const [activeThreadId, setActiveThreadId] = useState(null);

  const [accessToken, setAccessToken] = useState(() => {
    localStorage.getItem("accessToken") || null
  });

  const saveAccessToken = (token) => {
    setAccessToken(token);
    if(token) {
      localStorage.setItem("accessToken", token);
    }else{
      localStorage.removeItem("accessToken");
    }
  }

  const values = {
    prompt,
    setPrompt,
    reply,
    setReply,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    threadId,
    setThreadId,
    chatHistory,
    setChatHistory,
    inActive,
    setInActive,
    prevChatsThreadId,
    setPrevChatsThreadId,
    activeThreadId,
    setActiveThreadId,
    accessToken,
    setAccessToken,
    saveAccessToken
  };

  return (
    <>
      <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
    </>
  );
};
