import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/configeDB.js";
import CareerRouter from "./routes/career.js";
import cors from "cors";
import ClassterRouter from "./routes/classter.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", CareerRouter);
app.use("/api", ClassterRouter);
app.post("/api/ask", async (req, res) => {
  const { question } = req.body;

  try {
    const r = await fetch(
      "https://my-express-app-1-axrd.onrender.com/api/careers"
    );
    const careers = await r.json();

    const context = careers.map((c) => ({
      name: c.name,
      purpose: c.purpose,
      skills: c.skills,
      advice: c.advice,
      universities: c.universities,
    }));
    const prompt = `
        Ту ёрдамчии AI ҳастӣ. Ба саволи зерин ҷавоб деҳ бо такя ба маълумоти зер:
  
        Маълумот: ${JSON.stringify(context, null, 2)}
  
        Саволи корбар: ${question}
  
        Ҷавоби муфассал ва фаҳмо диҳед.
      `;

    // 4️⃣ Фиристодан ба OpenAI
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await resp.json();
    console.log(data);
    
    const answer = data.choices?.[0]?.message?.content || "Ҷавоб ёфт нашуд.";

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Хатогӣ дар сервер" });
  }
});

connectDB();
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
