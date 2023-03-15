const bcrypt = require('bcrypt');
const passwordUtil = require('../../src/utility/password.util');

describe('Password Util', () => { 
  describe('Hash Password', () => {
    it('should return a hashed password', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');
      const result = await passwordUtil.hashPassword('password', 10);
      expect(result).toEqual('hashedpassword');
    });
  });

  describe('Compare Password', () => { 
    it('should return true if password matches', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const result = await passwordUtil.comparePassword('password', 'hashpassword');
      expect(result).toEqual(true);
    });
    it('should return false if password doesnot matches', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const result = await passwordUtil.comparePassword('password', 'hashpassword');
      expect(result).toEqual(false);
    });
  });
});