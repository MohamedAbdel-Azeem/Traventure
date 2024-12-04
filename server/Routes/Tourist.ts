import {
  createUser,
  handleRegisterErrors,
} from "../Model/Queries/guest_queries";

import { Request, Response, Router } from "express";
import {
  touristAddValidator,
  touristUpdateValidator,
} from "../utils/express-validator/touristValidator";
import { matchedData, validationResult } from "express-validator";
import {
  getprofileInfo,
  updateProfileInfo,
} from "../Model/Queries/user_queries";
import { getActivities } from "../Model/Queries/activity_queries";
import {
  bookmarkActivity,
  bookmarkItinerary,
  getAll,
  getTouristBookings,
  getTouristBookmarks,
  gettouristComplaints,
  getTouristUpcoming,
  toggleWishlistProduct,
  skipWebsiteTutorial,
  getSkipTutorialStatus,
  getPromoCodeUsed,
  setPromoCodeUsed,
  addAddress,
  editAddress,
  deleteAddress,
  updateUserWallet,
} from "../Model/Queries/tourist_queries";
const router = Router();

router.post(
  "/add",
  touristAddValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newTourist = matchedData(req);
    try {
      await createUser(newTourist, "tourist");
      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      const err = error as any;
      handleRegisterErrors(err, res);
    }
  }
);

router.get("/upcoming", async (req: Request, res: Response) => {
  try {
    const all = await getAll();
    res.status(200).send(all);
  } catch (error) {
    res.status(500).send("error getting upcoming activities");
  }
});

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = await getprofileInfo(username, "tourist");
    if (!user) res.status(404).send("user not found");
    else {
      return res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).send("error getting user profile");
  }
});

router.patch(
  "/update/:username",
  touristUpdateValidator,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const username = req.params.username;
      const updatedInfo = matchedData(req);
      const user = await updateProfileInfo(username, "tourist", updatedInfo);
      if (!user) return res.status(404).send("user not found");
      const updateduser = await updateProfileInfo(
        username,
        "tourist",
        updatedInfo
      );
      res.status(200).json(updateduser);
    } catch (err) {
      res.status(500).send("error updating user profile");
    }
  }
);

router.get("/bookings/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const bookings = await getTouristBookings(username);

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send("error getting bookings");
  }
});

router.get("/upcoming/:username", async (req: Request, res: Response) => {
  try {
    const upcoming = await getTouristUpcoming(req.params.username);
    res.status(200).send(upcoming);
  } catch (error) {
    res.status(500).send("error getting upcoming");
  }
});

router.get("/complains/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const complaints = await gettouristComplaints(username);
    res.status(200).send(complaints);
  } catch (error) {
    res.status(500).send("error getting complaints");
  }
});

router.get("/bookmarks/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const bookmarks = await getTouristBookmarks(username);
    res.status(200).send(bookmarks);
  } catch (error) {
    res.status(500).send("error getting bookmarks");
  }
});

router.patch("/updateWallet/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const amount = req.body.amount;
    const user = await updateUserWallet(username, amount);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch(
  "/bookmark_activity/:username",
  async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const activity_id = req.body.activity_id;

      await bookmarkActivity(username, activity_id);
      res.status(200).send("Activity bookmarked");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

router.patch(
  "/bookmark_itinerary/:username",
  async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const itinerary_id = req.body.itinerary_id;

      await bookmarkItinerary(username, itinerary_id);
      res.status(200).send("Itinerary bookmarked");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

router.post("/wishlist/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const productId = req.body.productId;

    // Assuming you have a function to add a product to the wishlist
    const { action } = await toggleWishlistProduct(username, productId);

    const isAdded = action === "added";

    res.status(200).send({
      isAdded,
      message: `Product ${isAdded ? "added to" : "removed from"} wishlist`,
    });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.get("/promo_code/get/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const promoCode = await getPromoCodeUsed(username);
    res.status(200).send(promoCode);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch(
  "/promo_code/use/:username",
  async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      await setPromoCodeUsed(username);
      res.status(200).send("Promo code used");
    } catch (error: any) {
      res.status(500).send(error.message);
    }
  }
);

router.get("/skipTutorial/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const skipStatus = await getSkipTutorialStatus(username);
    res.status(200).send(skipStatus);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch("/add/address/:username", async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const address = req.body.address;
    addAddress(username, address);
    res.status(200).send("Address added");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch("/edit/address/:username", async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const address = req.body.address;
    const index = req.body.index;
    editAddress(username, address, index);
    res.status(200).send("Address edited");
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch("/delete/address/:username", async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const index = req.body.index;
    deleteAddress(username, index);
    res.status(200).send("Address deleted"); 
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

router.patch("/skipTutorial/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    await skipWebsiteTutorial(username);
    res.status(200).send("Tutorial skipped");
    } catch (error: any) {
    res.status(500).send(error.message);
  }
});
  

export default router;
