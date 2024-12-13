import Axios from "axios";
import { escapeMarkdown } from "../utils/markdownEscape.js";
import { formatDate } from "../utils/dateFormatter.js";
import { handleError } from "../utils/errorHandler.js";
import { config } from "../config/index.js";

export async function handleCurrency(ctx) {
  try {
    const clientCurrencyCode = ctx.message?.text || ctx.match[0];
    const currenciesResponse = await Axios.get(config.currenciesNbrbApiUrl);

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

    const response = await Axios.get(
      `${config.exratesNbrbApiUrl}/${currentCurrency.Cur_ID}`
    );
    ctx.replyWithMarkdownV2(
      `Date: *${escapeMarkdown(formatDate(response.data.Date))}*\n` +
        `Currency: *${escapeMarkdown(
          response.data.Cur_Scale + " " + response.data.Cur_Name
        )}*\n` +
        `Rate: *${escapeMarkdown(response.data.Cur_OfficialRate.toString())}*`
    );
  } catch (error) {
    handleError(ctx, error);
  }
}
