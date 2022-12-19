const { addMessage, backupMessages } = require('../services/messages.service');

exports.addMessage = async (req, res, next) => {
  const {
    from_id, for_id, message, for_username, from_username,
  } = req.body;
  try {
    if (!from_id || !for_id || !message || !for_username || !from_username) {
      return res.status(400).json({
        message: 'body is empty',
      });
    }

    await addMessage({
      from_id,
      for_id,
      message,
      for_username,
      from_username,
    });

    res.status(201).json({
      statusCode: 201,
      message: 'Mensagem adicionada com sucesso.',
    });
  } catch (error) {
    next(error);
  }
};

exports.backupMessages = async (req, res, next) => {
  try {
    const { from_id, for_id } = req.body;
    const messages = await backupMessages({ from_id, for_id });
    if (!messages) {
      res.status(204).json({
        statusCode: 204,
        message: 'not_message_found',
      });
    }

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
