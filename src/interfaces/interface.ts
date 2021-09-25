import { JwtPayload } from "jsonwebtoken";

interface RequestInterface extends Request{
  user?: string | JwtPayload;
}

export default RequestInterface
