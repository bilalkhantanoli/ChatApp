import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/utils";

const Chat = () => {
  const { isMessageLoading, selectedUser, message, getMessages } =
    useChatStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser?._id);
  }, [selectedUser._id, getMessages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((msg) => (
          <div
            key={msg._id}
            className={`chat ${
              msg.senderId === selectedUser._id ? "chat-start" : "chat-end"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.senderId === user._id
                      ? user.profilePicture ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
                      : selectedUser.profilePicture ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
                  }
                  alt="profile picture"
                />
              </div>
            </div>
            <div className="chat-bubble flex flex-col">
              {
                msg.media && (
                  <img 
                  src={msg.media}
                  alt="media"
                  className="sm:max-w[200px] rounded-md mb-2"
                  />
                )
                
              }
              {msg.message && <p>{msg.message}</p>}

            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{formatTime(msg.createdAt)}</time>
            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  );
};

export default Chat;
