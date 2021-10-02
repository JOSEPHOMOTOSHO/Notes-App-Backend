import noteusers from "../model/signupModel";
import { Request, Response } from "express";
const cloudinary = require('cloudinary').v2;
export async function updateUser(req: Request, res: Response): Promise<void> {
  let id = req.params._id;
  let img_Url;
  if(Object.keys(req.body).length === 0){
    res.status(404).json({message: "Please Input all fields"})
  }else{
  if (req.file) {
    const { url } = await cloudinary.uploader.upload(req.file?.path);
    img_Url = url;
  } else {
    const user = await noteusers.findById(id) as unknown as { [key: string]: string | boolean; };
    img_Url = user.avatar;
  }
  noteusers.findByIdAndUpdate(id, {
    firstName: req.body.firstName,
    lastName: req.body.lastName, 
    email: req.body.email,
    gender: req.body.gender,
    role: req.body.role, 
    about: req.body.about, 
    location: req.body.location,
    avatar: img_Url
  }, (err:any) => {
    if (err) {
      res.status(404).json({
          message: err.message,
        type: "fail"
      });
    } else {
      res.status(201).json({
        message: "Profile updated successfully!"
      });
    }
  });
 }
}

