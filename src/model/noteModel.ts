import mongoose from "mongoose";
import  { NoteInterface } from "../interfaces/interface";

const noteSchema = new mongoose.Schema<NoteInterface>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
    },
    collaboratorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "noteUsers",
      },
    ],
    tags: {
      type: [String],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "noteUsers",
      required: true,
    },
    folderId: {
      type: String,
      required: true,
    },
    softDelete: {
      default: false,
    },
  },
  { 
    timestamps: true 
  }
);

const Note = mongoose.model<NoteInterface>("Note", noteSchema);

export default Note;
