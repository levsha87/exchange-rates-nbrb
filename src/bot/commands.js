import { handleCurrency } from "../services/currencyServices.js";
import { currencyKeyboard } from "../utils/keyboards.js";

export default function setupCommands(bot) {
  bot.start((ctx) => {
    ctx.reply("Welcome! Choose a currency:", currencyKeyboard);
  });
  bot.help((ctx) => ctx.reply("Send me a sticker"));
  bot.on("sticker", (ctx) => ctx.reply("👍"));
  bot.hears("Hi", (ctx) => ctx.reply("Hey there"));
  bot.hears(/^[A-ZА-Я ]+$/i, handleCurrency);
}
