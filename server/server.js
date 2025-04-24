
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import content from "./contentData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN || "PASTE_YOUR_TOKEN_HERE";

app.use(express.static(path.join(__dirname, "public")));

app.post("/send-content", async (req, res) => {
  const { telegram_id, day } = req.body;
  const item = content[day];
  if (!item) return res.status(400).json({ error: "Контент не найден" });

  for (const text of [item.lesson, item.homework, item.checklist]) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: telegram_id, text })
    });
  }

  res.send({ success: true });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("✅ Server started on port " + PORT));
