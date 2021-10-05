import express, { Request, Response, NextFunction } from 'express';
import Folder from '../model/folderModel';
import Note from '../model/noteModel';

declare module "express" {
  interface Request {
      user?: any,
      isAuthenticated?:any,
  }
}

//Function to create notes
async function createNote(req: Request, res: Response, next: NextFunction) {
  const  folderId  = req.params.folderId;
  const { title, body, tags } = req.body;
  let user = req.user
  let createdBy = user.id;
  // if(user) createdBy = user.id;
  // else createdBy = req.body.createdBy

  try {
    const folderExist = await Folder.findById(folderId);    
    if (folderExist) {
      const note = {
        title,
        body,
        tags,
        folderId,
        createdBy
      };
      let noteCreated = await Note.create(note)
      return res.status(201).json({noteCreated})
    }
  } catch (err: any) {
    console.log(err, 'err')
    res.status(404).json({
      error: err.message,
    });
  }
}

async function getCollaborators(req: Request, res: Response) {
  const { noteId } = req.params;
  try {

    const note = await Note.findById(noteId).populate("collaboratorId");

    if (!note) return res.status(404).json({ error: 'Note does not exist' });
    
    return res.status(200).json({
      collaborators: note.collaboratorId,
    });
  } catch (err: any) {
    console.log(err)
    res.status(400).json({
      error: err.message,
    });
  }
}

const getAllNotes = async (req: Request, res: Response) => {
        
  const { email } = req.user as { [key: string]: string; };
  const { folderId } = req.params;
  try {
    
     const notes = await Note.find({ folderId, softDelete:false, createdBy:req.user.id }).sort( "-updatedAt")
    
    if(notes.length === 0) {
      return res.status(404).send("No Notes found")
   }
    return res.status(200).json(notes);
  } catch (err: any) {
    const message = err.message || err;
    return res.status(500).json({ error: message });
  }
};


async function sortByDesc(req:Request,res:Response,next:NextFunction){
  const input = req.query.sort
  let result = ""
  if(input === "ascending"){
      result = "-updatedAt"
  }else if(input === "descending"){
      result =  "updatedAt"
  }else{
      return res.status(404).send("Invalid Sort")
  }

  console.log("Input from url",input)
const updateByLatest = await Note.find().sort(result)
//const updateByLatest = await Note.find({updatedAt:"1"})
//let latest = updateByLatest[0]

console.log("Latest Update",updateByLatest)
if(updateByLatest.length === 0) {
    return res.status(404).send("No Notes found")
 }
return res.status(201).json(updateByLatest);
}

export async function sortByTitle(req:Request,res:Response,next:NextFunction){
  console.log('34')
  let searchObj = req.body.sort
  console.log(req.user.id)
  console.log(req.body.sort)
  if(req.body.sort !== undefined){
      searchObj = {
              $and: [
                  { title: { $regex: req.body.sort, $options: "i" }},
                  { createdBy: req.user.id},
              ]
          }
  }
  console.log(req.user.id)
  console.log(req.body.sort)
const searchResult = await Note.find(searchObj)
console.log(searchResult)
if(searchResult.length === 0 ) return res.status(200).json({message:"No note matches your search criteria"})
res.status(200).send(searchResult)
};

export { 
  createNote, 
  getCollaborators,
  sortByDesc,
  getAllNotes,
  // sortByTitle
};
