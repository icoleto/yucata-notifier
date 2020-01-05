const puppeteer = require('puppeteer');
const url = 'https://yucata.de/en';
const user = process.env.USER;
const password = process.env.PASSWORD;

exports.analize =  async () => {
  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
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

    return getCurrentGames;
  } catch (error) {
    console.log(error)
  }
  finally {
    await browser.close();
  }
}
