const timeout = 10000;

const data = require('../data');
const selector = require('../selector');

describe(
  'Verify login without entering any password',
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

    it(`Press submit button without key-in any password`, async () => {
      await page.waitFor(1000);
      await page.keyboard.press('Enter');
    });

    it(`Error message '${data.messageEmptyPassword}' should be appear`, async () => {
      await page.waitFor(1000);
      const element = await page.waitForSelector(selector.errorMessageWrongPassword);
      const errorMessage = await element.evaluate(el => el.textContent);

      expect(errorMessage).toContain(data.messageEmptyPassword);
    });
  },
  timeout,
);