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
      if (utils.checkIfHasToBeNotified(game))
      console.log(`${game.id} ${game.gameName}. It's turn of: ${game.getPlayerOnTurnNickname()} -> https://yucata.de/en/Game/MachiKoro/${game.id})`)
      await notifier.send(`${game.id} ${game.gameName}. It's turn of: ${game.getPlayerOnTurnNickname()} -> https://yucata.de/en/Game/MachiKoro/${game.id})`)
    })

    await delay(10000);
  }
}

main();


async function delay(ms) {
  // return await for better async stack trace support in case of errors.
  return await new Promise(resolve => setTimeout(resolve, ms));
}
