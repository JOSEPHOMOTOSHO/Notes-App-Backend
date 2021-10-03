import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { objInt } from '../interfaces/interface';
const UsersSchema = new mongoose.Schema<objInt>(
  {
    firstName: {
      type: String,
      required: [true, 'Name is needed'],
    },
    lastName: {
      type: String,
      required: [true, 'Name is needed'],
    },
    email: {
      type: String,
      required: [true, 'Email is needed'],
      unique: true,
      lowercase: true,
    },
    googleId: {
      type: String,
      // required : true,
    },
    facebookId:{
      type: String
    },
    password: {
      type: String,
      minlength: [7, 'Password length should not be less than 5'],
    },
    location: {
      type: String,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
    },
    about: {
      type: String,
    },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }  
);
UsersSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('notesUsers', UsersSchema);