import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleHandler = () => {
    toggleTheme();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1.5 bg-white text-black dark:bg-[#212121] dark:text-white dark:border-gray-600">
        <div className="flex items-center justify-center ml-8">
          <h1 className="text-xl cursor-pointer px-4 py-2 rounded-xl dark:hover:bg-gray-600 hover:bg-gray-200">
            IndianGPT 2.0
            <i class="fa-solid fa-angle-down"></i>
          </h1>
        </div>

        <div className="text-2xl mr-8">
          <div className="flex items-center gap-4">
            <button
              className="p-2 border border-gray-200 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={toggleHandler}
            >
              {theme === "dark" ? (
                <i class="fa-regular fa-sun"></i>
              ) : (
                <i class="fa-regular fa-moon"></i>
              )}
            </button>

            <p className="p-2 bg-purple-400 cursor-pointer rounded-full">
              <i class="fa-regular fa-user text-white"></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
