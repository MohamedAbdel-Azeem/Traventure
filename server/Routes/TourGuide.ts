import {createUser, handleRegisterErrors} from '../Model/Queries/guest_queries';
import { Request, Response,Router } from 'express';
import { guestAddValidator } from '../utils/express-validator/GuestValidator';
import { matchedData,validationResult} from 'express-validator';
import { getprofileInfo } from '../Model/Queries/user_queries';
import tourguidemodel, { ITourGuide } from '../Model/Schemas/TourGuide';
const router = Router();

router.post('/add',guestAddValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = matchedData(req);
    try {
        await createUser(newUser,'tourGuide');
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        const err = error as any;
        handleRegisterErrors(err, res);
    }
});

router.get("/profile/:username",async (req: Request, res: Response)=>{
try{
    const username = req.params.username;
    const user = await getprofileInfo(username, "tourGuide") as ITourGuide ;
    if(!user)
         res.status(404).send("user not found");
    else {
        console.log(user.isAccepted);
        res.status(200).send(user);
    

    }
}
catch(err){
   res.status(500).send("error getting user profile");
}
}
);
     


export default router;