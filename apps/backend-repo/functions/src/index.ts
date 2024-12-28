import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import path from "path";

// Import the built Express app
const app = require(path.join(__dirname, "../../dist/app.cjs")).default;

export const api = onRequest(app);

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
