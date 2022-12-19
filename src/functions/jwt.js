const jwt = require('jsonwebtoken');

module.exports = {

  signAccessToken(user) {
    return jwt.sign({
      email: user.email,
      username: user.username,
      id: user.id,
    }, process.env.SECRET, {
      expiresIn: '1d',
    });
  },
  singRefleshToken(user) {
    return jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: '7d',
    });
  },

  decrypt(token) {
    return jwt.decode(token);
  },

};
