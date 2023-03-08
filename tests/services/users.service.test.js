const bcrypt = require('bcryptjs');
const userService = require('../../src/services/users.service');
const HTTPError = require('../../src/errors/HTTPError');
const { Users } = require('../../src/models');
const tokenUtils = require('../../src/utils/jwtUtils');
const redisUtils = require('../../src/utils/redisUtil');

describe('Testing User Service', () => {
  describe('Testing createUser', () => {
    it('should throw 409 error when user already exits', async () => {
      const mockUser = {
        username: 'test',
        password: 'test',
      };
      jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
      await expect(userService.createUser('test', 'test')).rejects.toThrow(
        new HTTPError('User already exists', 409)
      );
    });
    it('should return user when user is created for first time', async () => {
      const mockUser = {
        username: 'test',
        password: 'test',
      };
      jest.spyOn(Users, 'findOne').mockResolvedValue(null);
      jest.spyOn(Users, 'create').mockResolvedValue(mockUser);
      const user = await userService.createUser('test', 'test');
      expect(user).toEqual(mockUser);
    });
  });
  describe('Testing getUser', () => {
    const mockUser = {
      username: 'test',
      password: 'test',
    };
    it('should throw error when user is not found', async () => {
      jest.spyOn(Users, 'findOne').mockResolvedValue(null);
      await expect(userService.loginUser('test', 'test')).rejects.toThrow(
        new HTTPError('User not found', 401)
      );
    });
    it('should throw error when password is incorrect', async () => {
      jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
      await expect(userService.loginUser('test', 'test1')).rejects.toThrow(
        new HTTPError('Invalid password', 401)
      );
    });
    it('should return the token when user is found', async () => {
      jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(tokenUtils, 'generateToken').mockReturnValue('mockToken');
      jest.spyOn(redisUtils, 'storeToken').mockResolvedValue(null);
      const token = await userService.loginUser('test', 'test');
      expect(token).toEqual('mockToken');
    });
  });
});
