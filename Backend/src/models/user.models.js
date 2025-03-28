// Importing mongoose
import mongoose from 'mongoose';

// Defining the user schema

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Creating the user model
const User = mongoose.model('User', userSchema);

export default User;
