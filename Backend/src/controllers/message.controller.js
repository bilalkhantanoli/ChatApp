import cloudinary from "../lib/cloudinary.js";
import Message from "../models/messages.models.js";
import User from "../models/user.models.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsers: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id: receiverId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: receiverId },
        { senderId: receiverId, receiverId: loggedInUserId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {  message, media } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl = "";
    if (media) {
        const uploadResponse = await cloudinary.uploader.upload(media);
        imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
        media: imageUrl,
    })
    await newMessage.save();

    res.status(200).json(newMessage);
   
  } catch (error) {
    console.error("Error in sendMessage: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
