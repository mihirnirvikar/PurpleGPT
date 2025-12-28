import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppContextProvider } from "./context/AppContext.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppContextProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AppContextProvider>
  </StrictMode>
);
