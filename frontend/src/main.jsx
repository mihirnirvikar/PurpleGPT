import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppContextProvider } from "./context/AppContext.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
