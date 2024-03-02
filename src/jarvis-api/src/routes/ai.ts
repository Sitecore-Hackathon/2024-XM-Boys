import { Router, Request, Response } from 'express';

const router = Router();

router.post('/', (req: Request, res: Response) => {
    let message = req.body.message;
    res.json({ message: message });
});

export default router;