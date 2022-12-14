const validator = require('validator');
const {
  store, findUser, findUserByIdDB, addDescriptionInProfile,
} = require('../services/user.service');
const { getUserOnCache } = require('../services/cache.service');

exports.store = async (req, res, next) => {
  const { email, password, username } = req.body;
  try {
    if (!password || !email || !username) {
      throw new Error('body are empty');
    }

    if (!validator.isEmail(email)) {
      throw new Error('Email invalid');
    }

    await store({
      username,
      password,
      email,
    });
    res.status(200).json({
      username,
      password,
      email,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!password || !email) {
      throw new Error('body are empty');
    }

    if (!validator.isEmail(email)) {
      throw new Error('Email invalid');
    }

    const user = await findUser(email);

    if (!user) {
      throw new Error('Usuario nao encontrado');
    }

    if (user[0].password !== password) {
      throw new Error('Senha invalida');
    }

    return res.status(200).json(user[0]);
  } catch (error) {
    next(error);
  }
};

exports.AllUsersConnectedInChat = async (req, res, next) => {
  try {
    const data = await getUserOnCache();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const data = await findUserByIdDB(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.addDescription = async (req, res, next) => {
  const { id, description } = req.body;
  try {
    if (!id || !description) {
      throw new Error('Have dates empty');
    }

    const result = await addDescriptionInProfile({ id, description });

    if (!result) {
      throw new Error('Um erro inesperado aconteceu.');
    }

    res.status(200).json({
      message: 'Descrição adicionada com sucesso.',
    });
  } catch (error) {
    next(error);
  }
};
