import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';

interface RequestInterface extends Request{
  user?: string | JwtPayload;
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
  googleId:string;
  avatar:string
  facebookId:string;
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
