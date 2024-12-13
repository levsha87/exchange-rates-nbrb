export function handleError(ctx, error) {
  console.log(error);

  if (error.response) {
    console.error("Error status:", error.response.status);
    console.error("Error data:", error.response.data);
    console.error("Error headers:", error.response.headers);
  } else if (error.request) {
    console.error("Error request:", error.request);
  } else {
    console.error("Error message:", error.message);
  }

  ctx.reply("Sorry, an error occurred while processing your request.");
}
