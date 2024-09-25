import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript!");
});

app.listen(3000, () => {
  console.log(`Server started on http://localhost:3000`);
});
