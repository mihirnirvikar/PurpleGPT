import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatWindow } from "./components/ChatWindow.jsx";
import { Chat } from "./components/Chat.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/thread",
    element: <App />,
    children: [
      {
        path: "/thread",
        element: <ChatWindow />,
        children: [
          {
            index: true,
            element: <Chat />,
          },
          {
            path: "/thread/:threadId",
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
