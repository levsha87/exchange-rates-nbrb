import { Telegraf } from "telegraf";
import Axios from "axios";
import "dotenv/config";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome!"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("Hi", (ctx) => ctx.reply("Hey there"));
bot.hears(/^[A-ZА-Я ]+$/i, async (ctx) => {
  try {
    const clientCurrencyCode = ctx.message.text;
    console.log(ctx.message);
    const currenciesResponse = await Axios.get(
      "https://api.nbrb.by/exrates/currencies"
    );

    const currentCurrencyArray = currenciesResponse.data.filter(
      (currency) =>
        currency.Cur_Abbreviation === clientCurrencyCode ||
        currency.Cur_Name.toLowerCase().includes(
          clientCurrencyCode.toLowerCase()
        ) ||
        currency.Cur_Name_Eng.toLowerCase().includes(
          clientCurrencyCode.toLowerCase()
        )
    );

    const currentCurrency =
      currentCurrencyArray[currentCurrencyArray.length - 1];

    if (!currentCurrency) {
      return ctx.reply("Currency not found");
    }
    console.log(currentCurrency.Cur_Name);

    console.log(currentCurrency.Cur_Code);

    const response = await Axios.get(
      `https://api.nbrb.by/exrates/rates/${currentCurrency.Cur_ID}`
    );
    return ctx.replyWithMarkdownV2(
      `Date: *${escapeMarkdown(
        formatDate(response.data.Date)
      )}* \n Currency: *${response.data.Cur_Scale} ${escapeMarkdown(
        response.data.Cur_Name
      )}* \nRate: *${escapeMarkdown(
        response.data.Cur_OfficialRate.toString()
      )}*`
    );
  } catch (error) {
    return ctx.reply("Error: " + error);
  }
});

bot.launch();

console.log("Bot is running...");
function escapeMarkdown(text) {
  console.log(text.replace(/([_*[\]()~`>#+-=|{}.!])/g, "\\$1"));
  return text.replace(/([_*[\]()~`>#+-=|{}.!])/g, "\\$1");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
