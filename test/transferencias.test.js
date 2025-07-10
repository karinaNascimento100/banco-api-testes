const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const { obterToken } = require('../helpers/autenticacao');
const postTransferencias = require('../fixtures/postTransferencias');


describe('Transferencias', () => {
    describe('POST /transferencias', () => {
        let token;

        beforeEach(async () => {
            // Obtém token válido antes de cada teste
            token = await obterToken('julio.lima', '123456');
        });

        it('Deve retornar sucesso com 201 quando o valor da transferencia for igual ou acima de R$10', async () => {
            // Clonando o objeto original
            const bodyTransferencias = {
                ...postTransferencias
            };
            bodyTransferencias.valor = 11;

            const resposta = await request(BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(201);
            console.log(resposta.body);
        });

        it('Deve retornar falha com 422 quando o valor da transferencia for abaixo de R$10', async () => {
            const bodyTransferencias = {
                ...postTransferencias
            };
            bodyTransferencias.valor = 7;

            const resposta = await request(BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token
                    }`)
                .send(bodyTransferencias);

            expect(resposta.status).to.equal(422);
            console.log(resposta.body);
        });
    });
});
