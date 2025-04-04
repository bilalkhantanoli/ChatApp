import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeleton/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { getUsers, isUserLoading, selectedUser, setSelectedUser, users } = useChatStore();
  const { onLineUsers } = useAuthStore();
  const [showOnlineUser, setShowOnlineUser] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filterOnlineUsers = showOnlineUser
    ? users.filter(user => onLineUsers.includes(user._id))
    : users;

  if (isUserLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 p-5 w-full">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineUser}
              onChange={e => setShowOnlineUser(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show Online Users</span>
          </label>
          <span className="text-xs text-zinc-400">{onLineUsers.length - 1}</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filterOnlineUsers.map(user => (
          <button
            key={user._id}
            className={`flex items-center gap-3 w-full p-3 hover:bg-base-300 transition-colors ${
              selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={
                  user.profilePicture ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s'
                }
                alt={user.fullName}
                className="rounded-full size-12 object-cover"
              />
              {onLineUsers.includes(user._id) && (
                <span className="bottom-0 right-0 size-3 bg-green-500 absolute rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onLineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}
        {filterOnlineUsers.length === 0 && (
          <div className="py-4 text-center text-zinc-400">No Online Users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
