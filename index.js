const puppeteer = require('puppeteer');
require('dotenv').config();

const url = 'https://twitter.com/login';
const query = "brotherhood";

const username = process.env.username;
const password = process.env.password;


(async () => {

    try {

        const browser = await puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        });
        const page = await browser.newPage();
        await page.goto(url, { delay: 1150 });

        await Promise.all([
            page.waitForNavigation(),
            await page.type('input[name="session[username_or_email]"]',username,{delay:133}),
            await page.type('input[name="session[password]"]',password,{delay:33}),
            await page.click('div[data-testid="LoginForm_Login_Button"]',{delay:33})
          ]);

          await page.goto(`https://twitter.com/search?q=${query}&src=typed_queryy&f=live`, { delay: 4000 });


        setInterval(() => {
            page.goto(`https://twitter.com/search?q=${query}&src=typed_queryy&f=live`, { delay: 4000 });
        }, 10000);

        await page.screenshot({ path: 'result.png' });

        // await browser.close();

    } catch (error) {
        console.log("Error: ", error);
    }

})();