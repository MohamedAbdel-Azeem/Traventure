import {
  createUser,
  handleRegisterErrors,
} from "../Model/Queries/guest_queries";
import { Request, Response, Router } from "express";
import { guestAddValidator } from "../utils/express-validator/GuestValidator";
import { matchedData, validationResult } from "express-validator";
import { IAdvertiser } from "../Interfaces/Users/IAdvertiser";
import {
  getprofileInfo,
  updateProfileInfo,
} from "../Model/Queries/user_queries";
import { advertiserPatchValidator } from "../utils/express-validator/advertiserValidator";
import { advertiserRevenue } from "../Model/Queries/activity_queries";
const router = Router();

router.post("/add", guestAddValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newUser = matchedData(req);
  try {
    await createUser(newUser, "advertiser");
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    const err = error as any;
    handleRegisterErrors(err, res);
  }
});

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = (await getprofileInfo(username, "advertiser")) as IAdvertiser;
    if (!user) res.status(404).send("user not found");
    else {
      if (user.isAccepted) {
        return res.status(200).json(user);
      }
      res.status(403).json(user);
    }
  } catch (err) {
    res.status(500).send("error getting user profile");
  }
});

router.patch(
  "/update/:username",
  advertiserPatchValidator,
  async (req: Request, res: Response) => {
    try {
      const username = req.params.username;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const updatedUserData = matchedData(req);
      const user = (await getprofileInfo(
        username,
        "advertiser"
      )) as IAdvertiser;
      if (!user) return res.status(404).send("user not found");
      const updatedUser = await updateProfileInfo(
        username,
        "advertiser",
        updatedUserData
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).send("error updating user profile");
    }
  }
);
router.get("/revenue/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const { month, activityName } = req.query;
    const revenue = await advertiserRevenue(
      username,
      parseInt(month as string),
      activityName as string
    );
    if (!revenue) {
      return res.status(404).send("advertiser not found");
    }
    res.status(200).send(revenue);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
