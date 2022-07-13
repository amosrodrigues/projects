const LoginService = require('../services/loginService');
const { success } = require('../utils/dictionary/statusCode');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userLogged = await LoginService.login(email, password);
    return res.status(success).json(userLogged);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
};
