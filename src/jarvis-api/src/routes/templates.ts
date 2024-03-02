import { Router, Request, Response } from "express";
import { Template } from "../models/templates";
import { getTemplates } from "../services/template";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const templates = await getTemplates();
    console.log(templates);
    res.json(templates);
});

router.get("/:id", (req: Request, res: Response) => {
    let templateId = req.params.id;
    let template = { id: templateId, name: "First Template" };
    res.json(template);
});

export default router;
