import {createUser, handleRegisterErrors} from '../Model/Queries/guest_queries';
import { Request, Response,Router } from 'express';
import { touristAddValidator, touristUpdateValidator } from '../utils/express-validator/touristValidator';
import { matchedData,validationResult} from 'express-validator';
import { getprofileInfo , updateProfileInfo} from '../Model/Queries/user_queries';

const router = Router();

router.post('/add',touristAddValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newTourist = matchedData(req);
    try {
        await createUser(newTourist,'tourist');
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        const err = error as any;
        handleRegisterErrors(err, res);
    }
});

router.get('/:username', async (req: Request, res: Response) => {

    try {
        const username = req.params.username;
        const user =  await getprofileInfo(username, "tourist");
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

    router.patch('/update/:username',touristUpdateValidator, async (req: Request, res: Response) => {

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

    });



     


export default router;