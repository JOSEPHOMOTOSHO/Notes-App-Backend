import mongoose from "mongoose";
import notesUsers from "../model/signupModel";
import { FolderInterface } from "../interfaces/interface";

const folderSchema = new mongoose.Schema<FolderInterface>(
  {
    title: {
      type: String,
      required: [true, "Name is needed"],
    },
    createdBy: {
      type: String,
      required: [true, "Id is required"],
    },
    Notes: {
      type: [],
      required: [true, ""],
    },
  },
  {
    timestamps: true,
  }
);

const Folder = mongoose.model<FolderInterface>("Folder", folderSchema);

export default Folder;
