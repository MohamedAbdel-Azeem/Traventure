import { Request, Response, Router } from "express";
import {addCategory,getCategories,deleteCategory} from "../Model/Queries/CategoryQueries";
import {validationResult , matchedData} from "express-validator"
import { categoryValidator } from "../utils/express-validator/categoryValidator";
const router = Router();

router.post("/add",categoryValidator,async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if (! errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const categroyData = matchedData(req);

    try{
        const newCategory = await addCategory(categroyData);
        res.status(201).send("Category added successfully");
    }
    catch(err){
        res.status(500).send("error creating category");
    }
})
router.get("/",async(req: Request, res: Response)=>{
    try{
       const categories = await getCategories();
        res.status(200).send(categories);
    }
    catch(err){
        res.status(500).send("error found getting categories");
    }
})

router.delete("/delete/:id",async (req: Request, res: Response)=>{
const id = req.params.id;

try{
   await deleteCategory(id);
   res.status(200).send("deleted successfully");
}
catch(err){
res.status(200).send("error deleting ");
}
})
export default router;

