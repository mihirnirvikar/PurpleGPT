import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Error = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/c");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <>
      <div className="flex h-screen  items-center justify-center dark:bg-[#14181E] dark:text-white bg-white text-black ">
        <div className="flex flex-col w-100">
          <div className="flex items-center justify-center">
            <img className="w-20 h-20" src="/favicon.svg" alt="Logo Image" />
            <h1 className="text-5xl ml-4  font-semibold bg-linear-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
              PurpleGPT
            </h1>
          </div>
          <div className="px-2 mt-4 ">
            <h1 className="text-3xl mt-2 flex justify-center items-center">
              <b className="text-3xl">404&nbsp;</b> - Page Not Found
            </h1>
            <p className="mt-4">
              Where the page should be, Empty space and missing words - A void
              in the code.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 px-2 cursor-pointer ">
            <button
              className="bg-linear-to-r from-[#8E2DE2] to-[#5012cc] text-white px-4 py-2 rounded-full group transition-all ease-in-out duration-300 cursor-pointer"
              onClick={() => {
                navigate("/c");
              }}
            >
              Return{" "}
              <i className="fa-solid fa-arrow-right text-sm group-hover:px-1.5"></i>
            </button>
            <p className="mr-4">Redirecting in {count}s</p>
          </div>
        </div>
      </div>
    </>
  );
};
