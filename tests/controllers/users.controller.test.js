const userController = require('../../src/controllers/users.controller');
const userService = require('../../src/services/users.service');
const HTTPError = require('../../src/errors/HTTPError');

describe('Testing User Controller', () => {
  describe('Testing createUser', () => {
    it('should return 201 when user is created', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest
        .spyOn(userService, 'createUser')
        .mockResolvedValue({ username: 'test', password: 'test' });
      await userController.createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        username: 'test',
        password: 'test',
      });
    });
    it('should return 500 when an error occurs', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new Error('Internal server error'));
      await userController.createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
    it('shoudld return 409 when user already exists', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest
        .spyOn(userService, 'createUser')
        .mockRejectedValue(new HTTPError('User already exists', 409));
      await userController.createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(409);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User already exists',
      });
    });
  });

  describe('Testing loginUser', () => {
    it('should return 200 when user is logged in', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(userService, 'loginUser').mockResolvedValue('token');
      await userController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('should return 401 when user does not exist', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest
        .spyOn(userService, 'loginUser')
        .mockRejectedValue(new HTTPError('User does not exist', 401));
      await userController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });
    it('should return 500 when an error occurs', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest
        .spyOn(userService, 'loginUser')
        .mockRejectedValue(new Error('Internal server error'));
      await userController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });
});
