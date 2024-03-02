import express, { Request, Response } from "express";
import templateRoutes from "./routes/templates";
import itemRoutes from "./routes/items";
import aiRoutes from "./routes/ai";
import { config } from "dotenv";

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/templates", templateRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/ai", aiRoutes);

app.get("/api/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
