"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  const handlePayment = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI System v2 🚀</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="اكتب سؤالك"
      />

      <button onClick={sendMessage}>إرسال</button>

      <p>الرد: {reply}</p>

      <hr />

      <button onClick={handlePayment}>
        ادفع 5$
      </button>
    </div>
  );
}
