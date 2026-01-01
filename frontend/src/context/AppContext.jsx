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
  };

  return (
    <>
      <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
    </>
  );
};
