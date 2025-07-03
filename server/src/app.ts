import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import errorFactory from "./services/responses/errorFactory";
import usersRouter from "./routes/users";
import gamesRouter from "./routes/games";
import consolesRouter from "./routes/consoles";
import genresRouter from "./routes/genres";
import reviewsRouter from "./routes/reviews"

const app = express();

const baseUrl = '/api/v1/'

app.use(cors());
app.use("/public", express.static("src/public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${baseUrl}users`, usersRouter);
app.use(`${baseUrl}games`, gamesRouter);
app.use(`${baseUrl}consoles`, consolesRouter);
app.use(`${baseUrl}genres`, genresRouter);
app.use(`${baseUrl}reviews`, reviewsRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  errorFactory.notFound(res);
});

export default app;
