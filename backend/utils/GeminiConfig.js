const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const SystemInstruction = require("./SystemInstruction");
console.log(SystemInstruction);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const historyArr = [];

async function main(que) {
  historyArr.push({
    role: "user",
    parts: [
      {
        text: que,
      },
    ],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    history: historyArr,
    config: {
      systemInstruction: SystemInstruction,
      temperature: 1.0,
      maxOutputTokens: 2048,
    },

    contents: `${que}`,
  });

  const text =
    response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  historyArr.push({
    role: "model",
    parts: [
      {
        text: text,
      },
    ],
  });

  return text;
}

module.exports = main;
