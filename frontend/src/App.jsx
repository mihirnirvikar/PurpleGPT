import { Sidebar } from "./components/Sidebar.jsx";
import { ChatWindow } from "./components/ChatWindow.jsx";

export const App = () => {
  return (
    <>
      <div className="flex h-[100vh] flex-0">
        <div className="w-64 dark:bg-[#181818] bg-[#F9F9F9]">
          <Sidebar />
        </div>
        <div className="flex-1 dark:bg-[#212121] bg-[#FFFFFF]">
          <ChatWindow />
        </div>
      </div>
    </>
  );
};
