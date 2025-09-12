
const request = require('supertest');
const { PassThrough } = require('supertest/lib/test');

(async () => {
    const chai = await import('chai');
    expect = chai.expect;
})();


// TESTS

describe('Transfer Controller', () => {

    describe('POST /transfer', () => {});
        it('Quando informo remetente e destinatario invalidos, retorna erro', async () => {
            // ESSE TESTE NECESSTA TER O USUSAIO CADASTRADO ANTES PELO SWAGGER
            // Capturar o TOKEN
            const login = await request('http://localhost:3000')
                .post('/users/login')
                .send({
                    username: "Guilherme",
                    password: "12345" 
            });
            const token = login.body.token;
            
            // REALIZAR A TRANSFERENCIA

             const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    from: "Guilherme",
                    to: "Maya",
                    amount: 100
                });
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Usuário não encontrado');
        });
});