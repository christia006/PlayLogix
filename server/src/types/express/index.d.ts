// server/src/types/express.d.ts
import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      id: number;
    }
  }
}
