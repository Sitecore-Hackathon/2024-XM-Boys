import { Router, Request, Response } from 'express';
import { createItem, getParentOptions } from "../services/item";

const router = Router();

router.get('/parentOptions/:templateId', async (req: Request, res: Response) => {
    let templateId = req.params.templateId;
    const response: any = await getParentOptions();
    const filteredOptions = response.item.children.nodes.filter((node: any) => {
        return node.insertOptions.some((option: any) => option.templateId === templateId);
    });
    res.json(filteredOptions.map((node: any) => {
        return {
            id: node.itemId,
            name: node.name
        }
    }));
});

router.post('/', async (req: Request, res: Response) => {
    let requestBody = req.body;
    const response: any = await createItem(requestBody.parentId, requestBody.templateId, requestBody.name, requestBody.itemData);
    res.json(response);
});

export default router;