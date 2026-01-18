import { createContext } from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.js";

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
    return localStorage.getItem("accessToken") || null
  });
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false)
  

  const saveAccessToken = (token) => {
    setAccessToken(token);
    if(token) {
      localStorage.setItem("accessToken", token);
    }else{
      localStorage.removeItem("accessToken");
    }
  }

  const fetchUserData = async() => {
    if(!isLoggedIn) {
      return
    }

    const token = localStorage.getItem("accessToken")

    if(!token){
      setIsLoggedIn(false)
      setUserData(null)
      return 
    }

    try {
      const {data} = await api.get("/api/user/get-user-info");
      setUserData(data.data)
      setIsLoggedIn(true)
      // console.log(data)
    } catch (error) {
      console.log(error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setUserData(null);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [accessToken])

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
    saveAccessToken,
    userData,
    setUserData,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <>
      <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
    </>
  );
};
