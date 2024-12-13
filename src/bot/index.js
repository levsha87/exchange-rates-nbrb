import { Telegraf } from "telegraf";
import "dotenv/config";
import setupCommands from "./commands.js";
import setupActions from "./actions.js";
import { config } from "../config/index.js";

const TELEGRAM_BOT_TOKEN = config.telegramBotToken;
const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

setupCommands(bot);
setupActions(bot);

bot.launch();
console.log("Bot is running...");
