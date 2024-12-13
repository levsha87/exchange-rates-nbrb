import { handleCurrency } from "../services/currencyServices.js";
import { currencyKeyboard } from "../utils/keyboards.js";

export default function setupActions(bot) {
  const currencies = ["USD", "EUR", "RUB", "CNY", "PLN"];

  currencies.forEach((currency) => {
    bot.action(currency, async (ctx) => {
      await handleCurrencyAction(ctx);
    });
  });
}

async function handleCurrencyAction(ctx) {
  await handleCurrency(ctx);
  await ctx.answerCbQuery();
  ctx.reply("Choose a currency:", currencyKeyboard);
}
