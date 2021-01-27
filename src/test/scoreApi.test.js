/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
import { gameSetup, postScores, getScores } from '../ScoreApi';

// const setup = { result: 'Game with ID: Zl4d7IVkemOTTVg2fUdz added.' };

const getScore = {
  result: [
    {
      user: 'user1',
      score: 100,
    },
  ],
};

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(getScore),
}));

test('Initialiazes game and gets an ID', async () => {
  const data = await gameSetup();
  expect(data).toHaveProperty('result');
});


test('Posts playername and scores returns a success string', async () => {
  const data = await postScores('Sam', 15);
  expect(data).toHaveProperty('result');
});

test('Get playername and scores returns an object', async () => {
  const data = await getScores();
  expect(typeof data).toBe('object');
});
