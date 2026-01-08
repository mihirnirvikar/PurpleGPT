import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const formSubmitHandler = () => {};
  const [formType, setFormType] = useState("signup");
  const [eyeIcon, setEyeIcon] = useState("close");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-screen  items-center justify-center dark:bg-[#212121] dark:text-white bg-white text-[#4f4f4f]">
        <div className="flex justify-center items-center flex-col gap-6 w-5/12">
          <img className="w-52 h-52" src="/favicon.svg" alt="PurpleGPT Logo" />
          <p className="text-5xl font-semibold">PurpleGPT 3.0</p>

          <h1 className="text-2xl mt-12 font-semibold dark:text-[#A3A3A3] text-[#4F4F4F]">
            <span>
              <Typewriter
                words={[
                  "Where ideas turn into code.",
                  "Building smarter conversations with code.",
                  "Crafted for developers, powered by intelligence.",
                  "Code smarter. Build faster.",
                  "The developer lifestyle, simplified.",
                  "Eat. Sleep. Code. Repeat.",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1000}
              />
            </span>
          </h1>
        </div>

        <div className="w-5/12 justify-center items-center flex flex-col">
          <form onSubmit={formSubmitHandler}>
            <div className="w-full">
              {formType === "signup" ? (
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-center items-center flex-col gap-6 text-[#4f4f4f] dark:text-white">
                    <h1 className="text-4xl font-semibold ">
                      Sign Up
                    </h1>
                    <p className="text-md">Enter your credentials to sign up</p>
                  </div>
                  <div className="w-120 mt-10 border dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-1 hover:outline-1 flex justify-center items-center text-lg">
                    <i class="fa-regular fa-user ml-4 mr-4"></i>
                    <input
                      id="username"
                      name="username"
                      className="w-full py-3 outline-none"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col gap-6 mb-12 text-[#4f4f4f] dark:text-white">
                  <h1 className="text-4xl font-semibold ">
                    Sign In
                  </h1>
                  <p className="text-md">Enter your credentials to sign in</p>
                </div>
              )}

              <div>
                <div className="w-120 mt-4 border dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-1 hover:outline-1 flex justify-center items-center text-lg">
                  <i class="fa-regular fa-envelope ml-4 mr-4"></i>
                  <input
                    id="email"
                    name="email"
                    className="w-full py-3 outline-none"
                    type="text"
                    placeholder="Email"
                  />
                </div>

                <div className="w-120 border mt-4 dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-1 hover:outline-1 flex justify-center items-center text-lg">
                  <i class="fa-solid fa-lock ml-4 mr-4"></i>
                  <input
                    id="password"
                    name="password"
                    className="flex-1 py-3 outline-none"
                    type={`${eyeIcon === "open" ? "text" : "password"}`}
                    placeholder="Password"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setEyeIcon(eyeIcon === "open" ? "close" : "open");
                    }}
                  >
                    {eyeIcon === "open" ? (
                      <i class="fa-solid fa-eye mr-4 ml-4"></i>
                    ) : (
                      <i class="fa fa-eye-slash mr-4 ml-4"></i>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <div></div>
                  <div className="dark:text-[#A3A3A3] text-[#4f4f4f] cursor-pointer" onClick={() => {
                    navigate("/c/reset-password");
                  }}>
                    <p>Forget Password?</p>
                  </div>
                </div>

                <div>
                  <button
                    className="w-120 h-12 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white dark:text-[#D9D9D9] mt-12 cursor-pointer"
                    type="submit"
                  >
                    <p className="text-lg font-semibold">{formType === "signup" ? "Sign Up" : "Sign In"}</p>
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2 text-sm dark:text-[#A3A3A3]">
                  <div></div>
                  <div className="cursor-pointer" onClick={() => {
                    setFormType(formType === "signup" ? "signin" : "signup");
                  }}>
                    <p>{formType === "signup" ? "Already have an account?" : "Don't have an account?"}</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
