import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    } else {
      return res.status(400).json({ message: 'Invalid User Data' });
    }
  } catch (error) {
    console.log('Error in signup: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.error('Error in signin: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const signout = (req, res) => {
  try {
    res.clearCookie('_token_');
    res.cookie('_token_', '', { maxAge: 0 });
    res.status(200).json({ message: 'Signout successfully' });
  } catch (error) {
    console.error('Error in signout: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePicture: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.error('Error in updateProfile: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error('Error in checkAuth: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
