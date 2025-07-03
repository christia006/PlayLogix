import { Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import successFactory from "../services/responses/successFactory";
import errorFactory from "../services/responses/errorFactory";

export default {
  async getAll(req: Request, res: Response) {
    try {
      const all = await prisma.genre.findMany();
      if (!all) {
        errorFactory.badRequest(res);
        return;
      }
      successFactory.ok(res, all);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createGenre(req: Request, res: Response) {
    try {
      const newGenre = await prisma.genre.create({
        data: req.body,
      });
      if (!newGenre) {
        errorFactory.badRequest(res);
        return;
      }
      successFactory.created(res, newGenre);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
