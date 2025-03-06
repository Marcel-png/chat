"use client";
import { useState, useEffect, KeyboardEvent } from "react";
 import Header from "./components/hearder";
import Footer from "./components/footer";
import MainSection from "./components/section";
import Seo from "./components/op";

// Définition du type Message 
type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function App() {
  const [input, setInput] = useState<string>(""); // Gestion de l'entrée utilisateur
  const [messages, setMessages] = useState<Message[]>([]); // Historique des messages
  const [loading, setLoading] = useState<boolean>(false); // État de chargement

  // Chargement des messages depuis le localStorage
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages") || "[]") as Message[];
    setMessages(storedMessages);
  }, []);

  // Sauvegarde des messages dans le localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return; // Ignore si l'entrée est vide

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput(""); // Réinitialisation du champ d'entrée
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la requête au serveur.");
      }

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply || "Je ne comprends pas." }]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
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
      <Footer
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}
