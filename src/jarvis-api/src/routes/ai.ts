import { Router, Request, Response } from "express";
import { fetchContent } from "../services/openai";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    let prompt = req.body.prompt;
    let context = req.body.context;
    let fieldType = req.body.fieldType;
    const jarvisResponse = await fetchContent(context, prompt, fieldType);
    res.json(jarvisResponse);
});

export default router;
