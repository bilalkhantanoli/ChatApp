import React from 'react';
import { useChatStore } from '../store/useChatStore';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import Chat from '../components/Chat';

const HomePage = () => {
  const { getUsers, getMessages, selectedUser } = useChatStore();
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg w-full max-w-6xl shadow-cl h-[clac(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <ChatContainer /> : <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
