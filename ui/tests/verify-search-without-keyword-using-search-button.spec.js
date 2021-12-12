const timeout = 10000;

const data = require('../data');
const selector = require('../selector');

let searchPlaceHolder = '';

describe(
  'Verify Search Result Displayed Should Be Relevant To Search Keyword (Press Search Button)',
  () => {
    let page;
    let placeHolderText = '';

    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto(data.baseUrl);
    }, timeout);

    it('Verify input search should be appear in the home page', async () => {
      await page.waitForSelector(selector.homeDivInputSearch, {visible: true});
      await page.click(selector.homeDivInputSearch);
    });

    it(`Press search button without key-in any keywords`, async () => {
      const element = await page.waitForSelector(selector.homeInputSearch);
      const getPlaceHolderText = await element.evaluate(el => el.getAttribute('placeholder'));
      placeHolderText = getPlaceHolderText.toString().replace('Cari ', '');

      await page.waitForSelector(selector.homeBtnSearch, {visible: true});
      await page.click(selector.homeBtnSearch);
    });

    it(`Search result should be based on the search placeholder ${placeHolderText}`, async () => {
      await page.waitFor(1500);

      const element = await page.waitForSelector(selector.searchResult);
      const searchTextResult = await element.evaluate(el => el.textContent);

      expect(await page.title()).toContain(placeHolderText);
      expect(searchTextResult).toContain(placeHolderText);
    });
  },
  timeout,
);