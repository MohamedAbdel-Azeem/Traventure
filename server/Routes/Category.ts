import { Request, Response, Router } from "express";
import {addCategory,getCategories,deleteCategory,updateCategory} from "../Model/Queries/category_queries";
import {validationResult , matchedData} from "express-validator"
import { categoryValidator,categoryUpdateValidator } from "../utils/express-validator/categoryValidator";
import Category from "../Model/Schemas/Category";
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

    router.put("/update/:id",categoryUpdateValidator,async (req: Request, res: Response)=>{
        const errors = validationResult(req);
        if (! errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        const categroyData = matchedData(req);
        const id = req.params.id;
        try{
            const categroyExists = await Category.findOne({name: categroyData.name});
            
            if (categroyExists){
                return res.status(409).send("Category already exists");
            }
            await updateCategory(id,categroyData);
            res.status(200).send("updated successfully");
        }
        catch(err){
            
            res.status(500).send("error updating category");
        }
    })
export default router;

