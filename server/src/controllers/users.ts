import { NextFunction, Request, Response } from "express";
import helpers from "../utils/helpers";
import successFactory from "../services/responses/successFactory";
import errorFactory from "../services/responses/errorFactory";
import prisma from "../../prisma/prismaClient";
import jwt from "jsonwebtoken";
import config from "../config";

const limit = 10;

export default {
  async getUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      req.id = id;
      next();
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUserFromToken(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        errorFactory.notAuthorized(res);
        return;
      }

      const token = authHeader.split(" ")[1];

      try {
        const decoded = jwt.verify(token, config.secrets.jwt) as { id: string };

        if (!decoded?.id) {
          errorFactory.forbidden(res);
          return;
        }
        const user = await prisma.user.findUnique({
          where: { id: Number(decoded.id) },
          select: {
            id: true,
            createdDate: true,
            email: true,
            fullName: true,
            image: true,
            role: true,
          },
        });
        if (!user) {
          errorFactory.notFound(res);
          return;
        }
        successFactory.ok(res, user);
      } catch (err) {
        errorFactory.notAuthorized(res);
        return;
      }
    } catch (error) {
      errorFactory.internalError(res);
      return;
    }
  },
  async getUsers(req: Request, res: Response) {
    try {
      const { sort, page, search } = req.query;
      const pageNumber = Number(page);
      const skip = (pageNumber - 1) * limit;

      const where: any = {};

      if (typeof search === "string" && search.trim() !== "") {
        where.fullName = {
          contains: search.trim(),
          mode: "insensitive",
        };
      }
      const orderBy: any = {};

      if (sort === "A-Z") orderBy.fullName = "asc";
      if (sort === "Z-A") orderBy.fullName = "desc";
      if (sort === "Newest") orderBy.createdDate = "desc";
      if (sort === "Oldest") orderBy.createdDate = "asc";

      const [allUsers, count] = await prisma.$transaction([
        prisma.user.findMany({
          where,
          orderBy,
          take: limit,
          skip,
          select: {
            createdDate: true,
            email: true,
            fullName: true,
            id: true,
            image: true,
            role: true,
            active: true,
          },
        }),
        prisma.user.count(),
      ]);

      if (!allUsers) {
        errorFactory.badRequest(res);
        return;
      }
      const response = {
        allUsers,
        count,
      };

      successFactory.ok(res, response);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async getUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.id },
        select: {
          id: true,
          role: true,
          email: true,
          fullName: true,
          image: true,
        },
      });

      if (!user) {
        errorFactory.notFound(res, "User not found");
        return;
      }

      successFactory.ok(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async getUserReviews(req: Request, res: Response) {
    try {
      const userWithReviews = await prisma.user.findUnique({
        where: { id: req.id },
        select: {
          reviews: {
            include: {
              game: {
                select: {
                  name: true,
                  thumbnail: true,
                },
              },
            },
          },
        },
      });

      if (!userWithReviews) {
        errorFactory.notFound(res, "User not found");
        return;
      }

      const reviewsWithAvgRating = await Promise.all(
        userWithReviews.reviews.map(async (review) => {
          const avgRating = await helpers.getAverageRating(review.gameId);
          return {
            ...review,
            game: {
              ...review.game,
              averageRating: avgRating,
            },
          };
        })
      );

      successFactory.ok(res, reviewsWithAvgRating);
    } catch (error) {
      console.error(error);
      errorFactory.internalError(res);
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.id },
      });
      if (!user) {
        errorFactory.notFound(res, "User has not been found");
        return;
      }
      await prisma.user.delete({
        where: { id: req.id },
      });

      successFactory.noContent(res);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async editUserNameAndEmail(req: Request, res: Response) {
    try {

      const { fullName, email } = req.body;

      if (!fullName || !email) {
        errorFactory.badRequest(res);
        return;
      }

      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (userExists?.id) {
        errorFactory.badRequest(res, "User with this email already exists");
        return;
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.id },
        data: {
          fullName,
          email,
        },
        select: {
          createdDate: true,
          email: true,
          fullName: true,
          id: true,
          image: true,
          role: true,
        },
      });
      successFactory.ok(res, updatedUser);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },

  async editUserProfileFromDashboard(req: Request, res: Response) {
    try {
      const { active, email, fullName, role } = req.body;

      if (!email || !fullName || !role) {
        errorFactory.badRequest(res);
        return;
      }

      const editedUser = await prisma.user.update({
        where: { id: req.id },
        data: {
          email,
          fullName,
          active,
          role,
        },
        select: {
          active: true,
          createdDate: true,
          email: true,
          fullName: true,
          id: true,
          image: true,
          role: true,
        },
      });

      successFactory.ok(res, editedUser);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async disableAccount(req: Request, res: Response) {
    try {
      const disabledAccount = await prisma.user.update({
        where: { id: req.id },
        data: {
          active: false,
        },
      });
      if (disabledAccount.id) {
        successFactory.ok(res, "disabled");
      }
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async updateUserImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        errorFactory.badRequest(res, "No image file provided");
        return;
      }
      const imagePath = `images/users/${req.file.filename}`;

      const updatedUser = await prisma.user.update({
        where: { id: req.id },
        data: {
          image: imagePath,
        },
        select: {
          id: true,
          fullName: true,
          image: true,
          active: true,
          createdDate: true,
          role: true,
          email: true,
        },
      });

      successFactory.ok(res, updatedUser);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
