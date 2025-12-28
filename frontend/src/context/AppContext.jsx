import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);

  const values = {
    prompt,
    setPrompt,
    reply,
    setReply,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
  };

  return (
    <>
      <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
    </>
  );
};
