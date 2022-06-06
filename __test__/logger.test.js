'use strict';
const logger = require('../src/middleware/logger');

describe('Logger Test', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });
  it('should log the request', () => {
    req.method = 'GET';
    req.path = '/person';
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });
});