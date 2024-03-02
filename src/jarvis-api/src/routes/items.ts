import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    let item = req.body;
    res.json(item);
});

export default router;