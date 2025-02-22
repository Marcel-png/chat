interface Message {
    sender: "user" | "bot";
    text: string;
  }
  
interface MainSectionProps {
    messages: Message[];
    loading: boolean;
  }
  
  export default function MainSection({ messages, loading }: MainSectionProps) {
    return (
      <main className="flex-grow overflow-auto mt-16 mb-20 px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col items-start space-y-1">
              {msg.sender === "user" && <p className="text-lg font-bold text-black">Moi :</p>}
              {msg.sender === "bot" && <p className="text-lg font-bold text-blue-400">ChatBot :</p>}
              <p className={`text-lg p-2 rounded-lg text-black ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}>
                {msg.text}
              </p>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></span>
              <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></span>
            </div>
          )}
        </div>
      </main>
    );
  }
  