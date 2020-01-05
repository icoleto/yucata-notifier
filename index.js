require('dotenv').config()
const utils = require('./utils');
const yucata = require('./yucata-analizer')
const TelegramNotifier = require('./telegram-notifier').TelegramNotifier
require('./telegram-notifier')
async function main() {
  const notifier = new TelegramNotifier();
  while (true) {
    const getCurrentGames = await yucata.analize();
    utils.parseCurrentGames(getCurrentGames).forEach(async game => {
      if (utils.checkIfHasToBeNotified(game)) {
        const msg = `${game.id} ${game.gameName}. It's turn of: ${game.getPlayerOnTurnNickname()} -> Last move on: ${game.lastMoveOn}`;
        console.log(msg)
        await notifier.send(msg)
      }
    })

    await delay(10000);
  }
}

main();


async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}
