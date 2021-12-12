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

    it(`When the input email is empty, the submit button should be disabled`, async () => {
      await page.waitForSelector(selector.loginConfirmButton, {visible: true});
      const isDisabled = await page.$eval(selector.loginConfirmButton, (button) => {
        return button.disabled;
      });
      expect(isDisabled).toBe(true);
    });
  },
  timeout,
);