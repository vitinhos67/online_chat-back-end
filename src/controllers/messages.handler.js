const { addMessage } = require('../services/messages.service');

exports.addMessage = async (req, res, next) => {
  const { from_id, for_id, message } = req.body;

  try {
    if (!from_id || !for_id || !message) {
      return res.status(400).json({
        message: 'body is empty',
      });
    }

    await addMessage({
      from_id,
      for_id,
      message,
    });

    res.status(200).json({
      statusCode: 200,
      messgae: 'Mensagem adicionada com sucesso.',
    });
  } catch (error) {
    next(error);
  }
};
