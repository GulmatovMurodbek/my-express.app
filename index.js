import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/configeDB.js";
import CareerRouter from "./routes/career.js";
import ClassterRouter from "./routes/classter.js";
import { getCareersForAsk } from "./controllers/careersController.js";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", CareerRouter);
app.use("/api", ClassterRouter);

// Пайваст ба Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Савол лозим аст." });
  }

  try {
    const careers = await getCareersForAsk();

    const context = careers.map((c) => ({
      name: c.name,
      purpose: c.purpose,
      skills: c.skills,
      advice: c.advice,
      universities: c.universities,
    }));

    const prompt = `
Ту ёрдамчии зеҳнии сунъӣ ҳастӣ. Ба саволи зерин ҷавоб деҳ бо такя ба маълумоти зер.
Агар ҷавоб дар маълумот набошад, кӯшиш кун ҷавоби умумӣ ва фаҳмо диҳӣ.

Маълумот дар база:
${JSON.stringify(context, null, 2)}

Саволи корбар:
${question}

Ҷавобро бо забони тоҷикӣ, равшан ва фаҳмо навис.
`.trim();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // зудтар ва ройгон
    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({ answer });
  } catch (err) {
    console.error("❌ Хатогӣ:", err.message);
    res.status(500).json({ error: "Хатогӣ дар сервер ё Gemini API" });
  }
});

connectDB();
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
