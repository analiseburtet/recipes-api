const express = require('express')
const config = require('config')
const consign = require('consign')

require("dotenv-safe").config()
const jwt = require('jsonwebtoken')

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({
      auth: false,
      message: 'No token provided.'
    });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return res.status(500).json({
        auth: false,
        message: 'Failed to authenticate token.'
      });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
  }

  consign({
      cwd: 'api'
    })
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app)

  return app;
};