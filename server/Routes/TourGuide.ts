import {
  createUser,
  handleRegisterErrors,
} from "../Model/Queries/guest_queries";
import { Request, Response, Router } from "express";
import { guestAddValidator } from "../utils/express-validator/GuestValidator";
import { matchedData, validationResult } from "express-validator";

import { getprofileInfo,updateProfileInfo } from "../Model/Queries/user_queries";
import tourguidemodel from "../Model/Schemas/TourGuide";

import { ITourGuide } from "../Interfaces/Users/ITourGuide";
import {tourGuideUpdateValidator} from "../utils/express-validator/TourguideValidator";
const router = Router();

router.post("/add", guestAddValidator, async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newUser = matchedData(req);
  try {
    await createUser(newUser, "tourGuide");
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    const err = error as any;
    handleRegisterErrors(err, res);
  }
});

router.get("/:username", async (req: Request, res: Response) => {
  try {
    const username = req.params.username;
    const user = (await getprofileInfo(username, "tourGuide")) as ITourGuide;
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


router.patch("/update/:username",tourGuideUpdateValidator, async (req: Request, res: Response) => {

    try {
        const errors = validationResult(req);
         if (!errors.isEmpty()) {
          console.log(errors.array());
        return res.status(400).json({ errors: errors.array() });
  }
        const username = req.params.username;
        const updatedInfo = req.body;
        const user = (await getprofileInfo(username, "tourGuide")) as ITourGuide;
        if (!user) return res.status(404).send("user not found");
        if(!user.isAccepted){
            return res.status(403).send("user is not accepted yet");
        }
        const updatedUser = await updateProfileInfo(username, "tourGuide", updatedInfo);

        return res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).send("error updating user profile");
    }

});
export default router;
