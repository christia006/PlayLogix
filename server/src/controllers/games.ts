import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/prismaClient";
import successFactory from "../services/responses/successFactory";
import errorFactory from "../services/responses/errorFactory";
import helpers from "../utils/helpers";

export default {
  async getGameId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      req.id = id;
      next();
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const games = await prisma.game.findMany({
        include: {
          consoles: {
            select: {
              console: {
                select: {
                  image: true,
                  id: true,
                },
              },
            },
          },
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
          reviews: {
            select: {
              rating: true,
            },
          },
        },
      });

      if (!games) {
        errorFactory.badRequest(res);
        return;
      }

      const gamesWithAvgRating = await Promise.all(
        games.map(async (game) => {
          const avgRating = await helpers.getAverageRating(game.id);

          return {
            ...game,
            rating: avgRating,
          };
        })
      );

      successFactory.ok(res, gamesWithAvgRating);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getSingleGame(req: Request, res: Response) {
    try {
      const singleGame = await prisma.game.findUnique({
        where: { id: req.id },
        include: {
          reviews: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              rating: true,
              gameId: true,
              user: {
                select: {
                  createdDate: true,
                  id: true,
                  fullName: true,
                  image: true,
                },
              },
            },
          },
          consoles: {
            select: {
              console: {
                select: {
                  image: true,
                },
              },
            },
          },
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      if (!singleGame) {
        errorFactory.notFound(res);
        return;
      }

      const avgRating = await helpers.getAverageRating(singleGame.id);

      const updatedGame = {
        ...singleGame,
        rating: avgRating,
      };

      successFactory.ok(res, updatedGame);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async createGame(req: Request, res: Response) {
    try {
      const {
        name,
        releaseYear,
        description,
        writers,
        stars,
        price,
        gameplayHours,
        trailer,
        thumbnail,
        consoles,
        genres,
      } = req.body;

      const newGame = await prisma.game.create({
        data: {
          name,
          releaseYear,
          description,
          writers,
          stars,
          price,
          gameplayHours,
          trailer,
          thumbnail,
          consoles: {
            create: consoles.map((consoleId: number) => ({
              console: { connect: { id: consoleId } },
            })),
          },
          genres: {
            create: genres.map((genreId: number) => ({
              genre: { connect: { id: genreId } },
            })),
          },
        },
      });

      if (!newGame) {
        errorFactory.badRequest(res);
        return;
      }

      successFactory.created(res, newGame);
    } catch (error) {
      console.error(error);
      errorFactory.internalError(res);
    }
  },
  async deleteGame(req: Request, res: Response) {
    try {
      const deleted = await prisma.game.delete({
        where: { id: req.id },
      });
      if (!deleted) {
        errorFactory.notFound(res);
        return;
      }
      successFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async editGame(req: Request, res: Response) {
    try {
      const { photo } = req.body;
      console.log(photo);
      const game = await prisma.game.findUnique({
        where: { id: req.id },
        select: { photos: true },
      });

      if (!game) {
        errorFactory.notFound(res, "Game not found");
        return;
      }

      const updatedPhotos = [...game.photos, photo];

      const updatedGame = await prisma.game.update({
        where: { id: req.id },
        data: {
          photos: updatedPhotos,
        },
      });

      successFactory.ok(res, updatedGame);
    } catch (error) {
      console.error(error);
      errorFactory.internalError(res);
    }
  },
};
