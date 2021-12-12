const timeout = 10000;

const data = require('../data');
const selector = require('../selector');

describe(
  'Verify login with unregistered email',
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

    it(`Insert correct email '${data.unregisteredEmail}' and press confirm button`, async () => {
      await page.waitForSelector(selector.loginInputEmail, {visible: true});
      await page.click(selector.loginInputEmail);
      await page.type(selector.loginInputEmail, data.unregisteredEmail, {delay: true});

      await page.waitForSelector(selector.loginConfirmButton, {visible: true});
      await page.click(selector.loginConfirmButton);
    });

    it(`Error message '${data.messageUnregisteredEmail}' should be appear`, async () => {
      await page.waitFor(1500);

      const element1 = await page.waitForSelector(selector.errorMessageUnregisteredEmailHeader);
      const errorMessage1 = await element1.evaluate(el => el.textContent);
      const element2 = await page.waitForSelector(selector.errorMessageUnregisteredEmailBody);
      const errorMessage2 = await element2.evaluate(el => el.textContent);
      const element3 = await page.waitForSelector(selector.errorMessageUnregisteredEmail);
      const errorMessage3 = await element3.evaluate(el => el.textContent);

      expect(errorMessage1).toContain(data.messageUnregisteredEmail);
      expect(errorMessage2).toContain(data.messageUnregisteredEmailBody);
      expect(errorMessage3).toContain(data.unregisteredEmail);
    });
  },
  timeout,
);