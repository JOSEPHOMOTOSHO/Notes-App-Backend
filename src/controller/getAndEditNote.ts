import express, { Request, Response, NextFunction } from 'express';
import Notes from '../model/noteModel';

const getAllNotes = async (req: Request, res: Response) => {
        
    const { email } = req.user as { [key: string]: string; };
    const { folderId } = req.params;
    try {
      let notes;
      
        notes = await Notes.find({ folderId, softDelete:false });
        console.log(notes)
      
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
 const updateByLatest = await Notes.find().sort(result)
 //const updateByLatest = await Notes.find({updatedAt:"1"})
 //let latest = updateByLatest[0]
 
 console.log("Latest Update",updateByLatest)
 if(updateByLatest.length === 0) {
      return res.status(404).send("No Notes found")
   }
  return res.status(201).json(updateByLatest);
}
  

export { 
    sortByDesc,
    getAllNotes,
}