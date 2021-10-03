import mongoose from 'mongoose'
import notesUsers from '../model/signupModel';
import {  NoteFolder } from '../interfaces/interface'



const NoteSchema = new mongoose.Schema<NoteFolder>(
  {
    title:{
      type: String,
      required: [true, 'Name is needed'],
    },
    createdBy:{
        type: String,
        required: [true, 'Id is required']
    },
    Notes:{
        type: [],
        required: [ true, '']
    },
},  
  {
    timestamps: true,
  });

export default mongoose.model('folders', NoteSchema);