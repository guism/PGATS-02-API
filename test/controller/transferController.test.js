
const request = require('supertest');
const sinon = require('sinon');
let expect;
const app = require('../../app');

(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();

// Mock
const transferService = require('../../services/transferService');

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

        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    from: "julio",
                    to: "priscila",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            // Reseto o Mock
            sinon.restore();
        });
});