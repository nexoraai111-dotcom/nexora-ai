import { useState } from "react";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{padding:"40px"}}>
      <h2>AI Dashboard</h2>

      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="اكتب سؤالك..."
      />

      <button onClick={send}>إرسال</button>

      <p>{reply}</p>

      <hr />

      <button onClick={async () => {
        const res = await fetch("/api/checkout", {method:"POST"});
        const data = await res.json();
        window.location = data.url;
      }}>
        اشتراك 💳
      </button>
    </div>
  );
}
