import { Markup } from "telegraf";

export const currencyKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("USD", "USD"),
  Markup.button.callback("EUR", "EUR"),
  Markup.button.callback("RUB", "RUB"),
  Markup.button.callback("CNY", "CNY"),
  Markup.button.callback("PLN", "PLN"),
]);
