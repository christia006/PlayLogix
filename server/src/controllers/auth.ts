import { Request, Response } from "express";
import errorFactory from "../services/responses/errorFactory";
import sucessFactory from "../services/responses/successFactory";
import prisma from "../../prisma/prismaClient";
import validator from "validator";
import jwt from "jsonwebtoken";
import config from "../config";

const signToken = (id: number) => jwt.sign({ id }, config.secrets.jwt);

export default {
  async signUp(req: Request, res: Response) {
    try {
      const { fullName, email, password, passwordConfirm, role, image } =
        req.body;

      if (validator.isEmpty(fullName)) {
        errorFactory.badRequest(res, "Full name cannot be empty");
        return;
      }

      if (!validator.isEmail(email) || !validator.isLowercase(email)) {
        errorFactory.badRequest(res, "Please provide a valid email address");
        return;
      }

      if (!validator.isLength(password, { min: 6 })) {
        errorFactory.badRequest(
          res,
          "Password must be at least 6 characters long"
        );
        return;
      }
      if (password !== passwordConfirm) {
        errorFactory.badRequest(res, "Passwords are not the same");
        return;
      }

      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });
      if (existingEmail) {
        errorFactory.badRequest(res, "User with this email already exists");
        return;
      }

      const user = await prisma.user.create({
        data: {
          role,
          fullName,
          email,
          password,
          image,
        },
        omit: { password, passwordConfirm },
      });

      sucessFactory.created(res, user);
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userInfo = await prisma.user.findUnique({
        where: { email },
        select: {
          password: true,
        },
      });

      if (!userInfo) {
        errorFactory.notAuthorized(res, "Invalid login credentials");
        return;
      }

      const checkPassword = await prisma.user.checkPassword(
        password,
        userInfo.password
      );

      if (!checkPassword) {
        errorFactory.notAuthorized(res, "Invalid login credentials");
        return;
      }

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          fullName: true,
          email: true,
          active: true,
        },
      });

      if (user && !user.active) {
        await prisma.user.update({
          where: { email },
          data: {
            active: true,
          },
        });
      }

      if (user && user.id) {
        const token = signToken(user.id);
        sucessFactory.ok(res, token);
      } else {
        errorFactory.badRequest(res);
      }
    } catch (error) {
      errorFactory.internalError(res);
    }
  },
};
