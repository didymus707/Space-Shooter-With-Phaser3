/* eslint-disable no-unused-vars */
import Model from '../Model';

jest.mock('../Model');

beforeEach(() => {
  Model.mockClear();
});

it('expects Model constructor to have been called', () => {
  const model = new Model();
  expect(Model).toHaveBeenCalledTimes(1);
});

it('expects Model constructor not to have been called', () => {
  expect(Model).not.toHaveBeenCalled();
});

it('expects gets musicOn to be true', () => {
  const model = new Model();
  model.soundOn = true;
  expect(model.soundOn).toBe(true);
});

it('expects gets musicOn to be true', () => {
  const model = new Model();
  model.soundOn = false;
  expect(model.soundOn).not.toBe(true);
});