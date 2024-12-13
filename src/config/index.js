import dotenv from "dotenv";

dotenv.config();

export const config = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  exratesNbrbApiUrl: "https://api.nbrb.by/exrates/rates",
  currenciesNbrbApiUrl: "https://api.nbrb.by/exrates/currencies",
  environment: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info", // Default to 'info' if not specified
};

if (config.environment === "development") {
  config.debugMode = true;
} else {
  config.debugMode = false;
}
