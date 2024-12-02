import { Request, Response, Router } from "express";
import {auth } from "../Model/Queries/user_queries"
import jwt from 'jsonwebtoken';

const router = Router();

router.post("/auth",  async (req, res) => {
    try {
        const token = req.cookies['access_token'];
        const decoded = jwt.verify(token, 'supersecret') as { id: string };
        const userId = decoded.id;
        const module2 = req.body.module;
        const name = await auth(userId, module2 );
        res.status(200).send(name);
    } catch (error ) {
        if((error as any).message==="unauthorized"){
            res.status(403).send("unauthorized access to this page");
        }
        else{
        res.status(500).send("error occured");}
    }
}); 

export default router;