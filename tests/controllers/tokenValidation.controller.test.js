const tokenValidationService = require('../../src/services/tokenValidation.service');
const taskController = require('../../src/controllers/tokenValidation.controller');

describe('Testing Task Controller', () => {
  it('should return username when token is valid', async () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer 123456789',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest
      .spyOn(tokenValidationService, 'verifyToken')
      .mockResolvedValue({ id: 1 });
    await taskController.verifyToken(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ user: 1 });
  });
  it('shoudld return 401 when token is invalid', async () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer 123456789',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.spyOn(tokenValidationService, 'verifyToken').mockResolvedValue(false);
    await taskController.verifyToken(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid token' });
  });
  it('should return 500 when an error occurs', async () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer 123456789',
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest
      .spyOn(tokenValidationService, 'verifyToken')
      .mockRejectedValue(new Error('Internal server error'));
    await taskController.verifyToken(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Internal server error',
    });
  });
});
