const timeout = 10000;

const data = require('../data');
const selector = require('../selector');

describe(
  'Verify login with incorrect password',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto(data.baseUrl);
    }, timeout);

    it('Verify login button should be appear in the home page', async () => {
      await page.waitForSelector(selector.homeBtnLogin, {visible: true});
      await page.click(selector.homeBtnLogin);
    });

    it(`Insert correct email '${data.registeredEmail}' and press confirm button`, async () => {
      await page.waitForSelector(selector.loginInputEmail, {visible: true});
      await page.click(selector.loginInputEmail);
      await page.type(selector.loginInputEmail, data.registeredEmail, {delay: true});

      await page.waitForSelector(selector.loginConfirmButton, {visible: true});
      await page.click(selector.loginConfirmButton);
    });

    it(`Insert incorrect password '${data.wrongPassword}' and press confirm button`, async () => {
      await page.waitForSelector(selector.loginInputPassword, {visible: true});
      await page.click(selector.loginInputPassword);
      await page.type(selector.loginInputPassword, data.wrongPassword, {delay: true});

      await page.keyboard.press('Enter');
    });

    it(`Error message '${data.messageWrongPassword}' should be appear`, async () => {
      await page.waitFor(1500);

      const element = await page.waitForSelector(selector.errorMessageWrongPassword);
      const errorMessage = await element.evaluate(el => el.textContent);

      expect(errorMessage).toContain(data.messageWrongPassword);
    });
  },
  timeout,
);