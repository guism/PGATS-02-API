
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

    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatario invalidos, retorna erro', async () => {
            const login = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: "Guilherme",
                    password: "12345"
            });
            const token = login.body.token;

             const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "Guilherme",
                    to: "Bianca",
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário não encontrado');
        });

        it('Usando Mocks: Quando informo remetente e destinatario inexistentes recebo 400', async () => {
            
            const login = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: "Guilherme",
                    password: "12345" 
            });
            const token = login.body.token;    
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.throws(new Error('Usuário não encontrado'));

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "Guilherme",
                    to: "priscila",
                    amount: 100
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Usuário não encontrado')

            // Reseto o Mock
            sinon.restore();
        });

        it('Usando Mocks: Quando informo dados validos recebo 201', async () => {

         // Mocar apenas a função transfer do Service
        const transferServiceMock = sinon.stub(transferService, 'transfer');
        transferServiceMock.returns({
            from: "Guilherme",
            to: "Bianca",
            amount: 100,
            date: new Date().toISOString()
        });

        // First, perform the login to receive the token
        const login = await request('http://localhost:3000')
            .post('/users/login')
            .send({
                username: "Guilherme",
                password: "12345" 
            });
        
        // Retrieve the token from the response
        const token = login.body.token;

        // Now make the transfer request using the retrieved token
        const resposta = await request(app)
            .post('/transfer')
            .set('Authorization', `Bearer ${token}`) // Now `token` is initialized
            .send({
                from: "Guilherme",
                to: "Bianca",
                amount: 100
            });

        // Validações comuns
        expect(resposta.status).to.equal(201);
        expect(resposta.body).to.have.property('from', 'Guilherme');
        expect(resposta.body).to.have.property('to', 'Bianca');
        expect(resposta.body).to.have.property('amount', 100);

        // Validações com fixtures
        const valoresValidos = require('../fixture/respostas/valoresValidosAPI.json');

        // Validando deep equal (tudo igual)
        delete valoresValidos.date; // removo a data do objeto para não dar erro na comparação porque o date é dinâmico
        delete resposta.body.date; // removo a data do objeto para não dar erro na comparação porque o date é dinâmico
        console.log(resposta.body);
        console.log(valoresValidos);
        expect(resposta.body).to.deep.equal(valoresValidos);
        expect(resposta.status).to.equal(201);    
        sinon.restore();
        });
    });

});