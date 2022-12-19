const { decrypt } = require('../functions/jwt');
const { findUserByIdDB } = require('../services/user.service');

module.exports = {
  async authorization(req, res, next) {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new Error('Necessario autenticação');
      }
      const [, token] = authorization.split(' ');

      const decryptToken = decrypt(token);
      const userInDB = await findUserByIdDB(decryptToken.id);

      if (!userInDB) {
        throw new Error('Usuario não encontrado');
      }

      req.user = userInDB;
      next();
    } catch (error) {
      next(error);
    }
  },

};
