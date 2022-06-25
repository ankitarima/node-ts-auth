import logger from "pino";
import dayjs from "dayjs";
import config from "config";

const level = config.get<string>("logLevel");

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  
});

logger.destination(`${__dirname}/../../logs/log_${dayjs().format('DD-MM-YYYY').toString()}.log`);

export default log;