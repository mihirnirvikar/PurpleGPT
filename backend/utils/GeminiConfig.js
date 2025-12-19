const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function main(que) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${que}`,
  });
  return response;
}

module.exports = main;