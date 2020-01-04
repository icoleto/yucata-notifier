const puppeteer = require('puppeteer');

const url = 'https://yucata.de/en';
const user = process.env.USER;
const password = process.env.PASSWORD;
(async () => {
  try {

    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.evaluate((user, password) => {
      document.querySelector('input[title="Login"]').value = user
      document.querySelector('input[title="Password"]').value = password;
      document.querySelector('input[value="Login"]').click();
    }, user, password);
    await page.waitForNavigation();
    await page.goto('https://yucata.de/en/CurrentGames', { waitUntil: 'networkidle0' });
    let getCurrentGames = await page.evaluate(() => fetch('https://yucata.de/Services/YucataService.svc/GetCurrentGames',
      { method: 'POST' })
      .then((response) => response.json()))

    parseCurrentGames(getCurrentGames).forEach(game => {
      console.log(`${game.id} ${game.gameName}. It's turn of: ${game.getPlayerOnTurnNickname()} - (Last move on : ${game.lastMoveOn})`)
    })

    await browser.close();

  } catch (error) {
    console.log(error)
    await browser.close();
  }
})()


function parseCurrentGames(getCurrentGamesResponse) {
  const games = [];
  getCurrentGamesResponse.d.Games.forEach(value => {
    const game = new Game(value.ID, value.GameName, value.Players, value.PlayerOnTurn, value.LastMoveOn);
    games.push(game)
  });

  return games;
}

class Game {
  constructor(
    id,
    gameName,
    players = [],
    playerOnTurn,
    lastMoveOn,
  ) {
    this.id = id,
    this.gameName = gameName;
    this.players = players;
    this.playerOnTurn = playerOnTurn;
    this.lastMoveOn = lastMoveOn;
  }

  getPlayerOnTurnNickname() {
    return this.players.find((player) => player.PlayerID === this.playerOnTurn).Login
  }

}
