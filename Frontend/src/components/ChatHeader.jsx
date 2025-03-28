import React from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onLineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="relative size-10 rounded-full">
              <img
                src={
                  selectedUser.profilePicture ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s'
                }
                alt={selectedUser.fullName}
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onLineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 hover:bg-base-200 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
