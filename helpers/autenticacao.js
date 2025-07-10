const request = require('supertest');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const obterToken = async (usuario, senha) => {
    const respostaLogin = await request(BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
            username: usuario,
            senha: senha
        });

    return respostaLogin.body.token;
};

module.exports = {
    obterToken
};
