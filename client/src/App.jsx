
import { useState, useEffect } from "react";

export default function App() {
  const [telegramId, setTelegramId] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user?.id) {
      setTelegramId(tg.initDataUnsafe.user.id);
    }
  }, []);

  const sendContent = async () => {
    await fetch("/send-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        telegram_id: telegramId,
        day: 0
      })
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Контент-Фабрика</h1>
      <p>Ваш Telegram ID: {telegramId || "не определён"}</p>
      <button onClick={sendContent}>Отправить урок 1</button>
    </div>
  );
}
