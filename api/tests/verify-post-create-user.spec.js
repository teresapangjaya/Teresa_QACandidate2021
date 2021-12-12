const timeout = 10000;
const apiHelper = require('../user-api.request');
const apiTestData = require('../user.data');

describe(
  'Verify POST Create User',
  () => {
    let resultResponse;
    beforeAll(async () => {
      resultResponse = await apiHelper.postUser(apiTestData.name, apiTestData.job);
    }, timeout);

    it('Validate response code should be 201', async () => {
      expect(resultResponse.status).toEqual(201);
    });

    it('Content-Type is present', async () => {
      expect(resultResponse.headers).toHaveProperty('content-type')
    });

    it('Validate user object should have property id, name, job, createdAt', async () => {
      expect(resultResponse.data).toHaveProperty('id');
      expect(resultResponse.data).toHaveProperty('name');
      expect(resultResponse.data).toHaveProperty('job');
      expect(resultResponse.data).toHaveProperty('createdAt');
    });

    it('Validate value name should be the same as the parameter', async () => {
      expect(resultResponse.data.name).toEqual(apiTestData.name);
    });

    it('Validate value job should be the same as the parameter', async () => {
      expect(resultResponse.data.job).toEqual(apiTestData.job);
    });
  },
  timeout,
);