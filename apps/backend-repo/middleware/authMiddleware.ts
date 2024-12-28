import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebaseConfig";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    console.log("ERROR", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default authMiddleware;
