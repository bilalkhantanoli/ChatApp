import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
    message: [],
    users: [],
    isUserLoading: false,
    selectedUser: null,
    isMessageLoading: false,

    getUsers: async () =>{
        set({isUserLoading: true});
        try {
            const response = await axiosInstance.get("/message/users");
            set({users: response.data});
        } catch (error) {
            console.error(`Error in getUsers: ${error}`);
        }finally{
            set({isUserLoading: false});
        }
    },
    getMessages: async (id) =>{
        set({isMessageLoading: true});
        try {
            const response = await axiosInstance.get(`/message/${id}`);
            set({message: response.data});
            
        } catch (error) {
            console.error(`Error in getMessages: ${error}`);
        }finally{
            set({isMessageLoading: false});
        }
    },
    setSelectedUser: (selectedUser) => set({selectedUser}),
}))