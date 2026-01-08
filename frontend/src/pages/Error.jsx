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
      <div className="flex h-screen  items-center justify-center dark:bg-[#212121] dark:text-white bg-white text-black ">
        <div className="flex flex-col w-76">
          <div className="flex gap-3 items-center">
            <img className="w-12 h-12" src="/favicon.svg" alt="Logo Image" />
            <h1 className="text-4xl font-semibold">PurpleGPT</h1>
          </div>
          <div className="px-2">
            <h1 className="text-2xl  mt-2">
              <b>404</b> - Page Not Found
            </h1>
            <p className="mt-1">
              Where the page should be, Empty space and missing words - A void
              in the code.
            </p>
          </div>

          <div className="flex items-center justify-between mt-4 px-2 cursor-pointer ">
            <button className="bg-linear-to-r from-[#8E2DE2] to-[#5012cc] text-white px-4 py-2 rounded-full group transition-all ease-in-out duration-300 cursor-pointer" onClick={() => {
                  navigate("/c");
                }}>
              Return{" "}
              <i
                className="fa-solid fa-arrow-right text-sm group-hover:px-1.5"
              ></i>
            </button>
            <p className="mr-2">
              Redirecting in {count}s
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
