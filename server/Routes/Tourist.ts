import {createUser, handleRegisterErrors} from '../Model/Queries/guest_queries';
import { Request, Response,Router } from 'express';
import { touristAddValidator } from '../utils/express-validator/touristValidator';
import { matchedData,validationResult} from 'express-validator';

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
     


export default router;