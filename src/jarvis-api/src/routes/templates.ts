import { Router, Request, Response } from 'express';
import { Template } from '../models/templates';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    let templates: Template[] = [];
    let template = { 'id': '1', 'name': 'First Template' } as Template;
    templates.push(template);
    res.json(templates);
});

export default router;