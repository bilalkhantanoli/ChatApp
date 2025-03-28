import React from 'react';
import { User } from 'lucide-react';
const SidebarSkeleton = () => {
  const skeletonUsers = Array(9).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 p-5 w-full">
        <div className="flex items-center gap-2">
          <User className="h-8 w-8" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {skeletonUsers.map((_, index) => (
          <div key={index} className="flex items-center gap-3 w-full p-3">
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
