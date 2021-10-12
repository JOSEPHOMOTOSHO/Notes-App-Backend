"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var notesSchema = new mongoose_1.default.Schema({
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
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "noteusers",
        },
    ],
    tags: {
        type: [String],
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "noteusers",
        required: true,
    },
    folderId: {
        type: String,
        required: true,
    },
    softDelete: {
        default: false,
    },
}, { timestamps: true });
var NotesModel = mongoose_1.default.model("Notes", notesSchema);
exports.default = NotesModel;
