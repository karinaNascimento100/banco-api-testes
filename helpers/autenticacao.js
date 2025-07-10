const request = require('supertest');
const postLogin = require('../fixtures/postlogin.json')
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const obterToken = async (usuario, senha) => {
    const bodyLogin = { ...postLogin }

    const respostaLogin = await request(BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin);

    return respostaLogin.body.token;
};

module.exports = {
    obterToken
};
