import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import {
  Globe,
  Plus,
  Image,
  FileText,
  Pencil,
  BarChart,
  MoreHorizontal,
  Lightbulb,
  Settings,
  Send,
} from "lucide-react";

export default function ChatGPTUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages([...messages, userMessage]);
    setChatHistory([...chatHistory, input]);

    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "This is a dummy AI response." },
      ]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-white text-black gap-30">
      <Sidebar chatHistory={chatHistory} />

      <div className="flex flex-col items-center justify-center flex-1 ">
        <h1 className="text-2xl font-semibold mt-4">What can I help with?</h1>

        {messages.length > 0 && (
          <div className="w-full max-w-4xl h-96 overflow-y-auto border border-gray-300 rounded-xl p-4 mt-4 bg-gray-100 shadow-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                } my-2`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}

        <div className="relative flex flex-col items-start w-full max-w-4xl mt-4 border border-gray-300 rounded-xl px-6 py-4 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="w-full bg-transparent focus:outline-none text-left text-lg"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <div className="flex items-center gap-3 mt-4">
            <button className="flex items-center justify-center text-gray-500 border border-gray-300 px-3 py-2 rounded-full">
              <Plus size={22} />
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-full">
              <Globe size={18} /> Search
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-full">
              <Settings size={18} /> Reason
            </button>
            <button
              className="flex items-center gap-1 text-sm text-white bg-blue-500 px-4 py-2 rounded-full"
              onClick={sendMessage}
            >
              <Send size={18} /> Send
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-6 flex-wrap justify-center max-w-4xl">
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-full text-sm">
            <Image size={18} /> Create image
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-full text-sm">
            <FileText size={18} /> Summarize text
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-full text-sm">
            <Lightbulb size={18} /> Brainstorm
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-full text-sm">
            <BarChart size={18} /> Analyze data
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-full text-sm">
            <Pencil size={18} /> Surprise me
          </button>
          <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-full text-sm">
            <MoreHorizontal size={18} /> More
          </button>
        </div>
      </div>
    </div>
  );
}
