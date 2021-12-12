const timeout = 10000;
const apiHelper = require('../user-api.request');

describe(
  'Verify Get User List',
  () => {
    let resultResponse;
    beforeAll(async () => {
      resultResponse = await apiHelper.getUser();
    }, timeout);

    it('Validate response code should be 200', async () => {
      expect(resultResponse.status).toEqual(200);
    });

    it('Content-Type is present', async () => {
      expect(resultResponse.headers).toHaveProperty('content-type')
    });

    it('Validate page should be 1', async () => {
      expect(resultResponse.data.page).toEqual(1);
    });

    it('Validate per-page should be 6', async () => {
      expect(resultResponse.data.per_page).toEqual(6);
    });

    it('Validate data length should be the same with the per-page value', async () => {
      expect(resultResponse.data.data.length).toEqual(resultResponse.data.per_page);
    });

    it('Validate total attribute = per_page * total_pages', async () => {
      expect(resultResponse.data.total).toEqual(resultResponse.data.per_page * resultResponse.data.total_pages);
    });

    it('Validate user object should have property id, name, first_name, last_name, and avatar', async () => {
      for(let index in resultResponse.data.data){
        const user = resultResponse.data.data[index];

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('first_name');
        expect(user).toHaveProperty('last_name');
        expect(user).toHaveProperty('avatar');
      }
    });
  },
  timeout,
);