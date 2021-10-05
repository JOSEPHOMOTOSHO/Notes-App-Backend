import mongoose, { ObjectId } from 'mongoose';
import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';
// import mongoose from "mongoose";

// declare module "express" {
//   interface Request {
//     // user?: string | JwtPayload;
//     user?: any; 
//       flash?: any,
//       isAuthenticated?:any,
//   }
// }


interface RequestInterface extends Request{
  user?: string | JwtPayload 
 
}

export default RequestInterface

export interface obj{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}

export interface objInt {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location:string;
  gender:string;
  role:string;
  about:string;
  googleId: string;
  avatar:string
  facebookId:string;
}
export interface notificationsInterface {
  content : string;
  noteId: ObjectId;
  userId: ObjectId;
}

export interface objJoi{
  firstName:string,
  lastName:string,
  email:string,
  password:string
}

export interface DatabaseUserInterface {
  email : string;
  password: string;
  id: string;
}

export interface Use{
  id?: string
}

export interface NoteInterface extends mongoose.Document {
  title: string;
  body: string;
  collaboratorId: [string];
  createdBy: mongoose.Schema.Types.ObjectId;
  tags: [string];
  folderId: string;
  softDelete: boolean;
  fileUpload:string
}

export interface FolderInterface extends mongoose.Document {
  title: string;
  createdBy:ObjectId;
  Notes:[];
}

export interface collabInt {
  email : string;
  id: string;
}  
export interface NotesInterface extends mongoose.Document {
  title: string;
  body: string;
  tags: [string];
  folderId: string;
  softDelete:Boolean;
  collaboratorId: [string];
  createdBy: mongoose.Schema.Types.ObjectId;
}