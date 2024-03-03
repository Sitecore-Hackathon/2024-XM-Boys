import { Router, Request, Response } from "express";
import { Template } from "../models/templates";
import { getTemplates, getTemplate } from "../services/template";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const response: any = await getTemplates();
    const templates = response.customDatasourceTemplates.results.map((template: any) => {
        return {
            id: template.templateId,
            name: template.name,
        } as Template;
    });
    res.json(templates);
});

router.get("/:id", async (req: Request, res: Response) => {
    let templateId = req.params.id;

    let template = await getTemplate(templateId);
    res.json(template);
});

export default router;
