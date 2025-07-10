const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const postLogin = require('../fixtures/postlogin.json')
// Usar BASE_URL definida no .env ou padrão http://localhost:3000
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
            const bodyLogin = { ...postLogin }

            const resposta = await request(BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });
    });
});
