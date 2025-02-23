import User from '../models/user.model.js';
import Message from '../models/message.model.js';

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedUserId }}).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.messsage);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const {id:userToChatId} = req.params
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {senderId:myId, receiverId:userToChatId},
        {senderId:userToChatId, receiverId:myId}
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage controller:", error.messsage);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {text, image} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.upload.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    // todo: realtime functionally goes here => socket.io

    res.status(201).json(newMessage);


  } catch (error) {
    console.log("Error in sendMessage controller:", error.messsage);
    res.status(500).json({ message: "Internal Server error" });
  }
};