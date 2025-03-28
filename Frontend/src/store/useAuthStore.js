import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_SOCKET_URL;

export const useAuthStore = create((set, get) => ({
  user: null,
  isLogIn: false,
  isSignUp: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onLineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      if (response.status === 200) {
        set({ user: response.data, isLogIn: true });
        get().connectSocket();
      }
      console.log('User: ', response.data);
    } catch (error) {
      console.log(`Error in checkAuth: ${error}`);
      set({ user: null, isLogIn: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async data => {
    try {
      set({ isSignUp: true });
      const res = await axiosInstance.post('/auth/signup', data);
      if (res.status === 200) {
        set({ user: res.data });
        set({ isLogIn: true });
        toast.success('Signed up successfully!');
        get().connectSocket();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Error creating account';
      toast.error(`Error while creating account: ${errorMessage}`);
      return false;
    } finally {
      set({ isSignUp: false });
    }
  },
  login: async data => {
    try {
      set({ isLogIn: true });
      const res = await axiosInstance.post('/auth/signin', data);
      if (res.status !== 200) {
        toast.error('Invalid credentials!');
        return;
      }
      set({ user: res.data });
      toast.success('Logged in successfully!');
      get().connectSocket();
    } catch (error) {
      toast.error('Invalid credentials!');
    } finally {
      set({ isLogIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/signout');
      set({ user: null });
      set({ isLogIn: false });
      toast.success('Logged out successfully!');
      get().disConnectSocket();
    } catch (error) {
      toast.error('Error logging out');
    }
  },
  updateProfile: async data => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ user: res.data });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.log(`Error in updateProfile: ${error}`);
      toast.error(error?.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { user } = get();
    if (!user || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: user._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on('user-socket-map', usersId => {
      set({ onLineUsers: usersId });
    });
  },
  disConnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
}));
