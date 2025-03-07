import { KeyboardEvent } from "react";
import Image from "next/image";

interface FooterProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function Footer({
  input,
  setInput,
  handleSend,
  handleKeyDown,
}: FooterProps) {
  return (
    <footer className="bg-white shadow-lg w-11/12 md:w-3/4 rounded-xl h-20 flex items-center justify-between px-4 fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow text-black border border-gray-300 rounded-full px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        placeholder="Votre question ici..."
      />
      <button
        onClick={handleSend}
        className="ml-4 p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all flex items-center justify-center"
        aria-label="Soumettre"
      >
        <Image
          src="/arrow-up.svg"
          alt="Icône de soumission"
          width={24}
          height={24}
        />
      </button>
    </footer>
  );
}
