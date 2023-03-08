const validationMiddleware = require('../../src/middlewares/validatorMiddleware');
const schemas = require('../../src/schemas/schemas');

describe('Testing Validation Middleware', () => {
  describe('Testing bodyValidator', () => {
    it('should validate the body', async () => {
      const mockreq = {
        body: {
          username: 'test',
          password: 'testingg',
        },
      };
      const next = jest.fn();
      await validationMiddleware.bodyValidator(mockreq, {}, next);
      expect(next).toHaveBeenCalled();
    });
    it('should return 400 when body is not valid', async () => {
      const mockreq = {
        body: {
          username: 'test',
          password: 4545,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      jest
        .spyOn(schemas.userSchema, 'validate')
        .mockReturnValue({ error: { message: '"password" must be a string' } });
      await validationMiddleware.bodyValidator(mockreq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: '"password" must be a string',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
  describe('Testing authValidator', () => {
    it('should validate the auth header', () => {
      const mockReq = {
        headers: {
          authorization: 'Bearer 123456789',
        },
      };
      const next = jest.fn();
      validationMiddleware.authValidator(mockReq, {}, next);
      expect(next).toHaveBeenCalled();
    });
    it('should return 401 when auth header is not valid', () => {
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
      jest
        .spyOn(schemas.authSchema, 'validate')
        .mockReturnValue({ error: { message: 'Token not found' } });
      validationMiddleware.authValidator(mockReq, mockRes, next);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Token not found',
      });
    });
  });
});
