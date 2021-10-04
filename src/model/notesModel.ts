import mongoose from "mongoose";
import { NotesInterface } from "../interfaces/interface";
const notesSchema = new mongoose.Schema<NotesInterface>(
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
  { timestamps: true }
);
const NotesModel = mongoose.model<NotesInterface>("Notes", notesSchema);
export default NotesModel;