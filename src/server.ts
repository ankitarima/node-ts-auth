require("dotenv").config();
import express from "express";
import config from "config";
import log from "./utils/logger.util";
import dbConnect from "../config/dbConnect";
import router from "./routes/index.routes";
import errorHandler from "./middleware/error.middleware";

const app = express();

app.use(express.json());

// Registering Index router
app.use('/api/v1/',router)

// errorHandler middleware
app.use(errorHandler);

const port = config.get("port");
app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  dbConnect();
});