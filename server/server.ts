import  express , { Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import createError from "http-errors";
import connectDB from "./Model/DB";
import adminRouter from "./Routes/Admin";
import categoryRouter from "./Routes/Category";
import activityRouter from "./Routes/Activity";
import preferenceTagsRouter from "./Routes/preferenceTags";
import sellerRouter from "./Routes/Seller";
import productRouter from "./Routes/Product";
import  advertiserRouter  from "./Routes/Advertiser";
import  tourGuideRouter  from "./Routes/TourGuide";
import  touristRouter  from "./Routes/Tourist";
import placeRouter from "./Routes/Places";
import governerRouter from "./Routes/Governer";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

// Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/activity", activityRouter);
app.use("/api/preferenceTags", preferenceTagsRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/place", placeRouter);
app.use("/api/advertiser", advertiserRouter);
app.use("/api/tourGuide", tourGuideRouter);
app.use("/api/tourist", touristRouter);
app.use("/api/governer",governerRouter);


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Traventure API");
});

app.listen(3000, () => {
  connectDB();
  console.log(`Server started on http://localhost:3000`);
});




