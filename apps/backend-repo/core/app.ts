import express, { Request, Response, type Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express backend with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
