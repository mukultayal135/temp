const tokenValidationService = require('../../src/services/tokenValidation.service');
const HTTPError = require('../../src/errors/HTTPError');
const jwtUtils = require('../../src/utils/jwtUtils');
const { Users } = require('../../src/models');

describe('Testing Token Validation Service', () => {
  it('should return user when token is valid', async () => {
    const mockToken = 'mockToken';
    const mockUser = {
      username: 'test',
      password: 'test',
    };
    jest.spyOn(jwtUtils, 'verifyToken').mockResolvedValue(mockUser);
    jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
    const user = await tokenValidationService.verifyToken(mockToken);
    expect(user).toEqual(mockUser);
  });
  it('should throw error when token is invalid', async () => {
    jest.spyOn(jwtUtils, 'verifyToken').mockResolvedValue(false);
    await expect(tokenValidationService.verifyToken()).rejects.toThrow(
      new HTTPError('Invalid token', 401)
    );
  });
  it('should throw error when user does not exist', async () => {
    jest.spyOn(jwtUtils, 'verifyToken').mockResolvedValue(true);
    jest.spyOn(Users, 'findOne').mockResolvedValue(null);
    await expect(tokenValidationService.verifyToken()).rejects.toThrow(
      new HTTPError('User not found', 401)
    );
  });
});
