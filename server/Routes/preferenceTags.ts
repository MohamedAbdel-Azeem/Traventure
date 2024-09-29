import e, { Request, Response, Router } from "express";
import { validationResult, matchedData } from "express-validator";
import {preferenceTagsAddValidator,preferenceTagsUpdateValidator} from "../utils/express-validator/preferenceTagsValidator";
import {addPreferenceTag, getPreferenceTag,deletePreferenceTag,updatePreferenceTag} from "../Model/Queries/preferenceTag_queries";
import preferenceTagsModel from "../Model/Schemas/preferenceTags";
const router = Router();

router.post("/add",preferenceTagsAddValidator, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const preferenceTagData = matchedData(req);

    try {
        const newPreferenceTag = await addPreferenceTag(preferenceTagData);
        res.status(201).send("Preference Tag added successfully");
    }
    catch (err) {
        res.status(500).send("error creating preference tag");
    }
});

router.get("/", async (req: Request, res: Response) => {

    try {
        const preferenceTags = await getPreferenceTag();
        res.status(200).send(preferenceTags);
    }
    catch (err) {
        res.status(500).send("error getting preference tags");
    }
}
);

router.delete("/delete/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        await deletePreferenceTag(id);
        res.status(200).send("Preference Tag deleted successfully");
    }
    catch (err) {
        res.status(500).send("error deleting preference tag");
    }
});

router.put("/update/:id",preferenceTagsUpdateValidator, async (req: Request, res: Response) => {

    const preferenceTagData = matchedData(req);
    const id = req.params.id;
    try {
        const nameExists = await preferenceTagsModel.findOne({name: preferenceTagData.preferenceTagName});
        console.log(nameExists);
        if (!nameExists)  
            {
                return res.status(400).send("Preference Tag already exists");
            }
        await updatePreferenceTag(id, preferenceTagData);
        res.status(200).send("Preference Tag updated successfully");
    }
    catch (err) {
        res.status(500).send("error updating preference tag");
    }
}
);
export default router;

