import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1f1f1f]">
      <img
        src="/favicon.svg"
        alt="PurpleGPT Background Logo"
        className="absolute w-150 opacity-90"
      />

      <div className="absolute z-100 top-8 right-10 flex items-center gap-4">
        <button
          onClick={() => navigate("/c/login")}
          className="text-gray-300 hover:text-white transition cursor-pointer hover:underline"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/c/login")}
          className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-md shadow-purple-500/30 hover:scale-105 transition cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      <div className=" absolute inset-0 backdrop-blur-xl bg-black/80"></div>

      <div className="w-2/6 h-screen z-10 flex flex-col justify-center gap-6 px-10 text-white">
        <div className="self-end bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl rounded-br-none shadow-lg">
          ✨ Summarize this article
        </div>

        <div className="self-start bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl rounded-bl-none shadow-lg">
          💡 Explain JavaScript closures
        </div>

        <div className="self-end bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl rounded-br-none shadow-lg">
          ⚙️ Generate React component
        </div>
      </div>

      <div className="w-1/2 relative z-10 text-center">
        <div className="mx-auto mb-12 w-60 h-60 flex items-center justify-center rounded-full backdrop-blur-md bg-black/20">
          <img
            src="/favicon.svg"
            alt="PurpleGPT Logo"
            className="w-52 h-52 drop-shadow-[0_0_35px_rgba(168,85,247,0.75)]"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            PurpleGPT
          </span>
        </h1>

        <p className="text-gray-300 text-lg mb-12">
          Ask anything. Get instant answers.
        </p>

        <button
          onClick={() => navigate("/c")}
          className="
            px-8 py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500
            shadow-lg shadow-purple-500/30
            focus:outline-none focus:ring-2 focus:ring-purple-400 group cursor-pointer"
        >
          Get Started{" "}
          <i className="fa-solid fa-arrow-right  group-hover:pl-2 duration-300 ease-in-out"></i>
        </button>
      </div>

      <div className="w-2/6 h-screen z-10 flex flex-col justify-center gap-6 px-10 text-white">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl">
          ⚡ <span className="text-lg font-semibold">Fast Responses</span>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl">
          🧠 <span className="text-lg font-semibold">Smart AI</span>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-4 rounded-xl">
          🔒 <span className="text-lg font-semibold">Secure Chats</span>
        </div>
      </div>
    </div>
  );
};
