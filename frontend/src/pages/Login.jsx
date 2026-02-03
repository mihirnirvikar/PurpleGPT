import { useState, useContext } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

export const Login = () => {
  // const [formType, setFormType] = useState("signin");
  const [eyeIcon, setEyeIcon] = useState("open");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { accessToken, saveAccessToken, setIsLoggedIn, formType, setFormType } =
    useContext(AppContext);

  const formSubmitHandler = async (e) => {
    e?.preventDefault();

    try {
      if (formType === "signup") {
        const { data } = await api.post(`/api/auth/register`, {
          name: username,
          email: email,
          password: password,
        });
        saveAccessToken(data.accessToken);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        navigate("/c");
        toast.success(data.message);
      } else {
        const { data } = await api.post(`/api/auth/login`, {
          email: email,
          password: password,
        });
        saveAccessToken(data.accessToken);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        navigate("/c");
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex min-w-0 max-w-full h-screen items-center justify-center xl:gap-40 lg:gap:40 md:gap-20 sm:gap-10 dark:bg-[#14181E] dark:text-white bg-white text-[#4f4f4f] relative">
        <div
          className={`flex-col gap-6 xl:w-120 lg:w-100 md:w-80 xl:block lg:block sm:hidden md:block hidden`}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              className="xl:w-52 lg:w-40 md:w-32 xl:h-52 lg:h-40 md:h-32"
              src="/favicon.svg"
              alt="PurpleGPT Logo"
            />
            <p className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-semibold">
              PurpleGPT 3.0
            </p>

            <h1 className="xl:text-2xl lg:text-xl md:text-lg sm:text-md mt-12 font-semibold dark:text-[#A3A3A3] text-[#4F4F4F]">
              <span>
                <Typewriter
                  words={[
                    "Where ideas turn into code.",
                    "Building smarter conversations with code.",
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
        </div>

        <div className="justify-center items-center flex flex-col">
          <form>
            <div className="w-full xl:w-120 lg:w-100 md:w-80 sm:w-80 flex flex-col">
              {formType === "signup" ? (
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex justify-center items-center flex-col gap-6 text-[#4f4f4f] dark:text-white">
                    <h1 className="text-4xl font-semibold ">Sign Up</h1>
                    <p className="text-md">Enter your credentials to sign up</p>
                  </div>
                  <div className="w-full mt-10 border dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg">
                    <i className="fa-regular fa-user ml-4 mr-4"></i>
                    <input
                      id="username"
                      name="username"
                      className="w-full py-3 outline-none"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col gap-6 mb-12 text-[#4f4f4f] dark:text-white">
                  <h1 className="text-4xl font-semibold ">Sign In</h1>
                  <p className="text-md">Enter your credentials to sign in</p>
                </div>
              )}

              <div>
                <div className="w-full mt-4 border dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg">
                  <i className="fa-regular fa-envelope ml-4 mr-4"></i>
                  <input
                    id="email"
                    name="email"
                    className="w-full py-3 outline-none"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="w-full border mt-4 dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg">
                  <i className="fa-solid fa-lock ml-4 mr-4"></i>
                  <input
                    id="password"
                    name="password"
                    className="flex-1 py-3 outline-none"
                    type={`${eyeIcon === "open" ? "password" : "text"}`}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setEyeIcon(eyeIcon === "open" ? "close" : "open");
                    }}
                  >
                    {eyeIcon === "open" ? (
                      <i className="fa-solid fa-eye mr-4 ml-4"></i>
                    ) : (
                      <i className="fa fa-eye-slash mr-4 ml-4"></i>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 text-sm">
                  <div></div>
                  <div
                    className="dark:text-[#A3A3A3] text-[#4f4f4f] cursor-pointer hover:underline"
                    onClick={() => {
                      navigate("/c/reset-password");
                    }}
                  >
                    <p>Forget Password?</p>
                  </div>
                </div>

                <div>
                  <button
                    className="w-full h-13 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white dark:text-[#D9D9D9] mt-12 cursor-pointer dark:hover:bg-[#4f4f4f] hover:bg-[#404040] hover:text-white dark:focus:bg-[#4f4f4f] focus:bg-[#404040]  focus:text-white"
                    type="submit"
                    onSubmit={formSubmitHandler}
                  >
                    <p className="text-lg font-semibold">
                      {formType === "signup" ? "Sign Up" : "Sign In"}
                    </p>
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2 text-sm dark:text-[#A3A3A3]">
                  <div
                    className="cursor-pointer hover:underline px-1"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <p>Back to home?</p>
                  </div>
                  <div
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      setFormType(formType === "signup" ? "signin" : "signup");
                    }}
                  >
                    <p>
                      {formType === "signup"
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    </p>
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
