import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import createError from "http-errors";
import logger from "morgan";
import connectDB from "./Model/DB";
import activityRouter from "./Routes/Activity";
import adminRouter from "./Routes/Admin";
import advertiserRouter from "./Routes/Advertiser";
import categoryRouter from "./Routes/Category";
import governerRouter from "./Routes/Governer";
import itineraryRouter from "./Routes/Itinerary";
import placeRouter from "./Routes/Places";
import productRouter from "./Routes/Product";
import sellerRouter from "./Routes/Seller";
import tourGuideRouter from "./Routes/TourGuide";
import touristRouter from "./Routes/Tourist";
import LoginRouter from "./Routes/Login";
import preferenceTagsRouter from "./Routes/preferenceTags";
import historicalTagsRouter from "./Routes/historicalTags";
import changePasswordRouter from "./Routes/ChangePassword";
import BookingRouter from "./Routes/booking";
import purchaseRouter from "./Routes/purchase";
import complaintRouter from "./Routes/Complaint";
import feedbackRouter from "./Routes/Feedback";
import reviewdocsRouter from "./Routes/ReviewDoc";
import amadeusRouter from "./amadeus/amadeus-router";
import currentuserRouter from "./Routes/Current_user";
import requestdeleteRouter from "./Routes/RequestDelete";
import authRouter from "./Routes/Auth";
import promocodeRouter from "./Routes/PromoCodes";
import recoveryRouter from "./Routes/Code";
import Stripe from "stripe";
import StripeRouter from "./Routes/Stripe";
const scheduleTask = require("./utils/functions/node_scheduler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

scheduleTask();

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
app.use("/api/governer", governerRouter);
app.use("/api/itinerary", itineraryRouter);
app.use("/api/login", LoginRouter);
app.use("/api/historicalTags", historicalTagsRouter);
app.use("/api/user/", changePasswordRouter);
app.use("/api/bookings", BookingRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/complaint", complaintRouter);
app.use("/api/feedBack", feedbackRouter);
app.use("/api/admin/", reviewdocsRouter);
app.use("/api/promocode", promocodeRouter);
app.use("/api/recovery", recoveryRouter);

app.use("/amadeus", amadeusRouter);
app.use("/api/requestdelete", requestdeleteRouter);
app.use("/api/user/", currentuserRouter);
app.use("/api/user/", authRouter);
app.use("/api/stripe", StripeRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Traventure API");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  connectDB();
});
