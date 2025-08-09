
const request = require('supertest');
const sinon = require('sinon');
let expect;
const app = require('../../app');

(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();

// TESTS

describe('Transfer Controller', () => {

    describe('POST /transfer', () => {});
        it('Quando informo remetente e destinatario invalidos, retorna erro', async () => {
             const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "Guilherme",
                    to: "Bianca",
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário não encontrado');
        });
});