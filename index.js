require('dotenv').config()
const utils = require('./utils');
const yucata = require('./yucata-analizer')
const DiscordNotifier = require('./discord-notifier').DiscordNotifier
async function main() {
  const notifier = new DiscordNotifier();
  while (true) {
    const getCurrentGames = await yucata.analize();
    utils.parseCurrentGames(getCurrentGames).forEach(async game => {
      console.log(`${game.id} ${game.gameName}. It's turn of: ${game.getPlayerOnTurnNickname()} - (Last move on : ${game.lastMoveOn})`)
      // await notifier.send(`${game.id} ${game.gameName}. It's turn of: ${game.getPlayerOnTurnNickname()} - (Last move on : ${game.lastMoveOn})`)
    })

    await delay(10000);
  }
}

main();


async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}
