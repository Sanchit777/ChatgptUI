import { useEffect, useState } from "react";
import { FaClipboardList, FaSearch } from "react-icons/fa";

const Sidebar = ({ chatHistory }) => {
  const [recentChats, setRecentChats] = useState([]);


  useEffect(() => {
    setRecentChats(chatHistory.slice(-10));
  }, [chatHistory]);

  return (
    <div className="h-screen w-64 bg-black text-white p-4 flex flex-col">

      <div className="flex items-center justify-between">
        <FaClipboardList className="text-xl" />
        <FaSearch className="text-xl cursor-pointer" />
      </div>


      <div className="mt-4">
        <div className="text-yellow-400 font-semibold">ChatGPT</div>
        <div className="text-gray-400">Explore GPTs</div>
      </div>


      <div className="mt-6 text-gray-300 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        <div className="text-xs font-semibold mb-2">Previous Chats</div>
        {recentChats.length > 0 ? (
          recentChats.map((chat, index) => (
            <div key={index} className="hover:bg-gray-700 px-2 py-1 rounded cursor-pointer">
              {chat}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent chats</p>
        )}
      </div>

      <div className="mt-auto">
        <div className="flex items-center justify-between text-gray-400 cursor-pointer hover:text-white">
          <span>Upgrade plan</span>
        </div>
        <div className="text-xs text-gray-500">More access to the best models</div>
      </div>
    </div>
  );
};

export default Sidebar;
