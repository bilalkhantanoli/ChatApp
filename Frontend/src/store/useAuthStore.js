import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

export const useAuthStore = create((set) => ({
  user: null,
  isLogIn: false,
  isSignUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ user: response.data, isLogIn: true });
    } catch (error) {
      console.log(`Error in checkAuth: ${error}`);
      set({ user: null, isLogIn: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSignUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ user: res.data });
      toast.success("Signed up successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error creating account";
      toast.error(`Error while creating account: ${errorMessage}`);
      return false;
    } finally {
      set({ isSignUp: false });
    }
  },
  login: async (data) => {
    try{
      set({ isLogIn: true });
      const res = await axiosInstance.post("/auth/signin", data);
      set({ user: res.data });
      toast.success("Logged in successfully!");
    }catch(error){
      toast.error("Invalid credentials!");
    }finally{
      set({ isLogIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/signout");
      set({ user: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out");
    }
  }
}));
