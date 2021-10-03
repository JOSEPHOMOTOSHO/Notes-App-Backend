import express, { Request, Response, NextFunction } from 'express';
import folders from '../model/folderModel'
import notesUsers from '../model/signupModel'
// create folders
export const createFolder = async (req: Request, res: Response) => { 
    //created by related to the user id from the usermodel/ schema
    const { _id: createdBy} = req.user as { [key: string]: string; };
    //title as folder name from the folder schema
    const { title } = req.body;
    try {
        // create a folder in the folder schema =====> database=====>having the createdby and title
      const folder = await folders.create({ createdBy, title });
      return res.status(201).json(folder);
     //unforseen errors...
    } catch (err: any) {
      const message = err.message || err;
      res.status(404).json({ error: message });
    }
  };