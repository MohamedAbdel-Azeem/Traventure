import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";
import connectDB from "./Model/DB";
import adminRouter from "./Routes/Admin";
import sellerRouter from "./Routes/Seller";
import productRouter from "./Routes/Product";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

// Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript!");
});

app.listen(3000, () => {
  connectDB();
  console.log(`Server started on http://localhost:3000`);
});
