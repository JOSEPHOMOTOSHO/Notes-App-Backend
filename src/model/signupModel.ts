// import { } from "../util";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { objInt } from '../interfaces/interface';

export interface obj {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location:string;
  gender:string;
  role:string;
  about:string;
}

const UsersSchema = new mongoose.Schema<obj>({
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
  password: {
    type: String,
    required: [true, 'Password needed'],
    minlength: [7, 'Password length should not be less than 5'],
  },
  location: {
    type: String
  },
  gender: {
    type: String
  },
  role: {
    type: String,
  },
  about: {
    type: String,
  },
});

UsersSchema.pre('save', async function (next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('notesUsers', UsersSchema);
