const puppeteer = require('puppeteer');

const url = 'https://yucata.de/en';
const user = process.env.USER;
const password = process.env.PASSWORD;
(async () => {
  try {

    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    await page.evaluate((user, password) => {
      document.querySelector('input[title="Login"]').value = user
      document.querySelector('input[title="Password"]').value = password;
      document.querySelector('input[value="Login"]').click();
    }, user, password);
    await page.waitForNavigation();

    await page.goto('https://yucata.de/en/CurrentGames', { waitUntil: 'networkidle0' });
    const gameId = await page.evaluate(() => document.querySelector('#CurrentGames table tbody tr:nth-child(2) td:nth-child(2)').textContent.trim());
    await page.goto(`https://yucata.de/en/Game/MachiKoro/${gameId}`, { waitUntil: 'networkidle0' })
    //await page.screenshot({ path: 'gameId-screen.png' });

    let playerOnTurn = await page.evaluate(() => document.querySelector('#infoLabel').textContent.replace(/(^.*:)/g, '').replace(' +++', '').trim())
    console.log(`Player on turn: ${playerOnTurn}`)
    await browser.close();
  } catch (error) {
    console.log(error)
    await browser.close();
  }
})()
