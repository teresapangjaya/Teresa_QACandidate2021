const timeout = 10000;

const data = require('../data');
const selector = require('../selector');

describe(
  'Verify Search Result Without Entering Any Keywords (Press Search Button)',
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto(data.baseUrl);
    }, timeout);

    it('Verify input search should be appear in the home page', async () => {
      await page.waitForSelector(selector.homeDivInputSearch, {visible: true});
      await page.click(selector.homeDivInputSearch);
    });

    it(`Search with keywords '${data.sampleKeyWords}' and press search button`, async () => {
      await page.waitForSelector(selector.homeDivInputSearch, {visible: true});
      await page.click(selector.homeDivInputSearch);
      await page.type(selector.homeDivInputSearch, data.sampleKeyWords, {delay: true});

      await page.waitForSelector(selector.homeBtnSearch, {visible: true});
      await page.click(selector.homeBtnSearch);
    });

    it(`User will redirected to search result page`, async () => {
      await page.waitFor(1500);

      const element = await page.waitForSelector(selector.searchResult);
      const searchTextResult = await element.evaluate(el => el.textContent);

      expect(await page.title()).toContain(data.sampleKeyWords);
      expect(searchTextResult).toContain(data.sampleKeyWords);
    });
  },
  timeout,
);