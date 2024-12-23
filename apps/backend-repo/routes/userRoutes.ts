import express, { Request, Response } from "express";

const router = express.Router();

router.get("/update-user-data", (req: Request, res: Response) => {
  res.send("Update User Data");
});

router.get("/fetch-user-data", (req: Request, res: Response) => {
  res.send("Fetch User Data");
});

export default router;
