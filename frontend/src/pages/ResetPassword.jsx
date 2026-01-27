import { useState, useContext, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [eyeIcon, setEyeIcon] = useState("open");
  const [confirmEyeIcon, setConfirmEyeIcon] = useState("open");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRefs = useRef([]);
  const [otpForm, setOtpForm] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleInput = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = Array(6).fill("");

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const focusIndex = pastedData.length - 1;
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Please enter a valid otp");
      return;
    }

    try {
      const { data } = await api.post(`/api/auth/reset-password`, {
        email: email,
        otp: finalOtp,
        password: password,
        confirmPassword: confirmPassword,
      });
      console.log(data);
      navigate("/c/login");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const sendEmailOtpHandler = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      const { data } = await api.post("/api/auth/send-reset-otp", { email });
      setOtpForm(true);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center dark:bg-[#14181E] dark:text-white bg-white text-[#4f4f4f]">
        <div className="absolute top-25 left-35 z-10 flex justify-center items-center text-sm">
          <button
            className="w-12 h-12 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white font-semibold text-md dark:text-[#D9D9D9] cursor-pointer dark:hover:bg-[#4f4f4f] hover:bg-[#404040] hover:text-white dark:focus:bg-[#4f4f4f] focus:bg-[#404040]  focus:text-white text-xl"
            onClick={() => {
              navigate("/c/login");
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>

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
                  <p className="text-md">Enter your credentials to reset password</p>
                </div>

                <div>
                  <div className="w-full flex justify-center items-center mt-12 gap-1">
                    <div
                      className={`${otpForm === true ? "w-120" : "w-100"} border dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg`}
                    >
                      <i className="fa-regular fa-envelope ml-4 mr-4"></i>
                      <input
                        name="email"
                        className="w-full py-3 outline-none pr-2"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    {!otpForm && (
                      <button
                        className="w-20 h-13 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white dark:text-[#D9D9D9] cursor-pointer dark:hover:bg-[#4f4f4f] hover:bg-[#404040] hover:text-white dark:focus:bg-[#4f4f4f] focus:bg-[#404040]  focus:text-white"
                        onClick={sendEmailOtpHandler}
                        type="button"
                      >
                        <p className="text-md font-semibold">Submit</p>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {otpForm && (
                <div className="w-120">
                  <div className="flex gap-2 mb-4 mt-8 items-center">
                    <p className="font-semibold text-lg mr-4">Otp: </p>
                    {Array(6)
                      .fill(0)
                      .map((_, index) => (
                        <input
                          type="text"
                          maxLength="1"
                          key={index}
                          value={otp[index] || ""}
                          name="otp"
                          required
                          className="w-12 h-12 bg-[#4f4f4f] text-white text-center text-xl rounded-md"
                          ref={(e) => (inputRefs.current[index] = e)}
                          onInput={(e) => handleInput(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onPaste={index === 0 ? handlePaste : undefined}
                        />
                      ))}
                  </div>

                  <div className="w-120 border mt-8 dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg">
                    <i className="fa-solid fa-lock ml-4 mr-4"></i>
                    <input
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

                  <div className="w-120 border mt-4 dark:border-[#D9D9D9] border-[#4f4f4f] rounded-lg dark:outline-[#D9D9D9] outline-[#4f4f4f] focus-within:outline-2 hover:outline-2 flex justify-center items-center text-lg">
                    <i className="fa-solid fa-lock ml-4 mr-4"></i>
                    <input
                      name="confirmPassword"
                      className="flex-1 py-3 outline-none"
                      type={`${
                        confirmEyeIcon === "open" ? "password" : "text"
                      }`}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setConfirmEyeIcon(
                          confirmEyeIcon === "open" ? "close" : "open",
                        );
                      }}
                    >
                      {confirmEyeIcon === "open" ? (
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
                        navigate("/c/login");
                      }}
                    >
                      <p>Back to login?</p>
                    </div>
                  </div>

                  <div>
                    <button className="w-120 h-13 dark:bg-[#303030] border border-[#D9D9D9] rounded-lg outline-[#D9D9D9] bg-[#4f4f4f] text-white dark:text-[#D9D9D9] mt-12 cursor-pointer dark:hover:bg-[#4f4f4f] hover:bg-[#404040] hover:text-white dark:focus:bg-[#4f4f4f] focus:bg-[#404040]  focus:text-white">
                      <p className="text-lg font-semibold">Submit</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
