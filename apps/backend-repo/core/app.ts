import express, { type Express } from "express";
import dotenv from "dotenv";
import userRoutes from "../routes/userRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 6000;

app.use(express.json());

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
