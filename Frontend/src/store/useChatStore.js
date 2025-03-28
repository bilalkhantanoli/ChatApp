import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
  message: [],
  users: [],
  isUserLoading: false,
  selectedUser: null,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get('/message/users');
      set({ users: response.data });
    } catch (error) {
      console.error(`Error in getUsers: ${error}`);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async id => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${id}`);
      set({ message: response.data });
    } catch (error) {
      console.error(`Error in getMessages: ${error}`);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async messageData => {
    const { selectedUser, message } = get();
    try {
      const response = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ message: [...message, response.data] });
    } catch (error) {
      console.error(`Error in sendMessage: ${error}`);
      toast.error(error.data.message);
    }
  },

  listenerMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on('new-message', newMessage => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ message: [...get().message, newMessage] });
    });
  },
  unListenerMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('new-message');
  },

  setSelectedUser: selectedUser => set({ selectedUser }),
}));
