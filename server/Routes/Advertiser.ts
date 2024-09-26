import userModel from '../Model/Schemas/Advertiser';
import { Request, Response,Router } from 'express';

const router = Router();

router.post('/add', async (req: Request, res: Response) => {

        const newUser = {
           username: req.body.username,
           email: req.body.email,
           password: req.body.password
        };
        
       try {
           await userModel.create(newUser);
           res.status(201).send({ message: 'User created successfully' });
       } catch (error) {
        const err = error as any;
        if (err.code === 11000) {
            // Duplicate key error
            if (err.keyPattern && err.keyPattern.email) {
                res.status(400).send({ message: 'Email already exists' });
            } else if (err.keyPattern && err.keyPattern.username) {
                res.status(400).send({ message: 'Username already exists' });
            } else {
                res.status(400).send({ message: 'Duplicate key error' });
            }
        } else {
            res.status(500).send({ message: 'Error creating user', error: err.message });
        }
       }
     
     


})

export default router;
 