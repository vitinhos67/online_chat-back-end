const validator = require('validator');
const { store, findUser } = require('../services/user.service');

exports.store = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    if (!password || !email || !username) {
      throw new Error('body are empty');
    }

    if (!validator.isEmail(email)) {
      throw new Error('Email invalid');
    }

    const result = await store({
      username,
      password,
      email,
    });
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!password || !email) {
      console.log('cheguei aqui');
      throw new Error('body are empty');
    }

    if (!validator.isEmail(email)) {
      console.log(email);
      throw new Error('Email invalid');
    }

    const user = await findUser(email);

    if (user[0].password !== password) {
      throw new Error('Senha invalida');
    }

    return res.status(200).json(
      user[0],
    );
  } catch (error) {
    next(error);
  }
};
