import { useState, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { AppContext } from "../context/AppContext.jsx";

export const ResetPassword = () => {
  const [eyeIcon, setEyeIcon] = useState("close");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/auth/register`, {
        name: username,
        email: email,
        password: password,
      });
      saveAccessToken(data.accessToken);
      navigate("/c");
    } catch (error) {
      console.log(error);
    }
  };
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
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-center items-center flex-col gap-6 text-[#4f4f4f] dark:text-white">
                  <h1 className="text-4xl font-semibold ">Reset Password</h1>
                  <p className="text-md">Enter your credentials to sign up</p>
                </div>

                <div className="w-full flex justify-center items-center mt-12 gap-1">
                  <div className="w-100 border dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg">
                    <i className="fa-regular fa-envelope ml-4 mr-4"></i>
                    <input
                      id="email"
                      name="email"
                      className="w-full py-3 outline-none pr-2"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    className="w-20 h-13 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white dark:text-[#D9D9D9] cursor-pointer dark:hover:bg-[#4f4f4f] hover:bg-[#404040] hover:text-white dark:focus:bg-[#4f4f4f] focus:bg-[#404040]  focus:text-white"
                    type="submit"
                  >
                    <p className="text-md font-semibold">Submit</p>
                  </button>
                </div>
              </div>
              <div>
                <button
                  className="w-120 h-13 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white dark:text-[#D9D9D9] mt-12 cursor-pointer dark:hover:bg-[#4f4f4f] hover:bg-[#404040] hover:text-white dark:focus:bg-[#4f4f4f] focus:bg-[#404040]  focus:text-white"
                  type="submit"
                >
                  <p className="text-lg font-semibold">Submit</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
