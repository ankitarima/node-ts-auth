import mongoose from "mongoose";
import config from "config";
import log from "../src/utils/logger.util";

async function dbConnect() {

  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri);
    log.info(`Connected to DB - ${dbUri.split("?")[0]} `);
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
  
}

export default dbConnect;
