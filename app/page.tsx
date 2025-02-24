"use client";
import { useState, useEffect, KeyboardEvent } from "react";
import Header from "./components/hearder";
import Footer from "./components/footer";
import MainSection from "./components/section";
import Seo from "./components/op";


export default function App() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages") || "[]");
    setMessages(storedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply || "Je ne comprends pas." }]);
    } catch (e) {
      setMessages([...newMessages, { sender: "bot", text: "Erreur de communication." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
       <Seo
        title="BKMind"
        description="Bienvenue sur BKMind."
        keywords="chat, bot, ia"
        author="Marcel-png"
        ogTitle="BKMind"
        ogDescription="Bienvenue sur BKMind."
        ogImage="/180665068.png"
      />
      <Header />
      <MainSection messages={messages} loading={loading} />
      <Footer input={input} setInput={setInput} handleSend={handleSend} handleKeyDown={handleKeyDown} />
    </div>
  );
}


