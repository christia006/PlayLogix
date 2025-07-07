import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import successFactory from "../services/responses/successFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const consoles = await prisma.console.findMany();
      successFactory.ok(res, consoles);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createConsole(req: Request, res: Response) {
    try {
      const newConsole = await prisma.console.create({
        data: req.body,
      });

      if (!newConsole) {
        errorFactory.badRequest(res);
        return;
      }

      successFactory.ok(res, newConsole);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
