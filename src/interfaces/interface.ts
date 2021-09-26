import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';

interface RequestInterface extends Request{
  user?: string | JwtPayload;
}

export default RequestInterface
