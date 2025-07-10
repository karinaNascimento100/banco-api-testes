const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')


const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456');
        })
        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$10', async () => {



            const resposta = await request(BASE_URL)
                .post('/transferencias')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 11,
                    token: "123456"
                });

            expect(resposta.status).to.equal(201);
            console.log(resposta.body);
        });

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$10', async () => {
            const token = await obterToken('julio.lima', '123456');

            const resposta = await request(BASE_URL)
                .post('/transferencias')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 2,
                    valor: 7,
                    token: "123456"
                });

            expect(resposta.status).to.equal(422);
            console.log(resposta.body);
        });
    });
});
