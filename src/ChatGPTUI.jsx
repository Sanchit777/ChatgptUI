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
  Menu
} from "lucide-react";

export default function ChatGPTUI() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-white text-black">
      {/* Sidebar (Hidden on small screens) */}
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}>
        <Sidebar chatHistory={chatHistory} closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Chat Section */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {/* Toggle Sidebar Button */}
        <button className="absolute top-4 left-4 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>

        <h1 className="text-xl md:text-2xl font-semibold mt-6 text-center">What can I help with?</h1>

        {messages.length > 0 && (
          <div className="w-full max-w-[90%] md:max-w-4xl h-96 overflow-y-auto border border-gray-300 rounded-xl p-3 md:p-4 mt-4 bg-gray-100 shadow-sm">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} my-2`}>
                <div className={`max-w-xs px-3 md:px-4 py-2 rounded-lg ${msg.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
        )}

        {/* Chat Input */}
        <div className="relative flex flex-col items-start w-full max-w-[90%] md:max-w-4xl mt-4 border border-gray-300 rounded-xl px-4 py-3 md:px-6 md:py-4 shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="w-full bg-transparent focus:outline-none text-left text-lg"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <button className="flex items-center justify-center text-gray-500 border border-gray-300 px-3 py-2 rounded-full">
              <Plus size={18} />
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-full">
              <Globe size={16} /> Search
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 border border-gray-300 px-3 py-2 rounded-full">
              <Settings size={16} /> Reason
            </button>
            <button
              className="flex items-center gap-1 text-sm text-white bg-blue-500 px-4 py-2 rounded-full"
              onClick={sendMessage}
            >
              <Send size={16} /> Send
            </button>
          </div>
        </div>

        {/* Feature Buttons */}
        <div className="flex gap-2 mt-6 flex-wrap justify-center max-w-[90%] md:max-w-4xl">
          {[["Create image", Image], ["Summarize text", FileText], ["Brainstorm", Lightbulb], ["Analyze data", BarChart], ["Surprise me", Pencil], ["More", MoreHorizontal]].map(([label, Icon], i) => (
            <button key={i} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm">
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
