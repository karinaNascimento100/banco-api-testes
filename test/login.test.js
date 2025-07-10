const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

// Usar BASE_URL definida no .env ou padrão http://localhost:3000
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('Login', () => {
    describe('POST /login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais válidas', async () => {
            // Apenas para depuração — pode remover depois
            console.log('BASE_URL carregada:', BASE_URL);

            const resposta = await request(BASE_URL)
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio.lima',
                    senha: '123456',
                });

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });
    });
});
