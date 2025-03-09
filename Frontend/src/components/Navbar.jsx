import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full z-10 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto h-16 px-4">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatt App</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {
              user && (
                <>
                <Link
              to={"/profile"}
              className="btn btn-sm gap-2 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <button className="flex gap-2 items-center cursor-pointer" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
