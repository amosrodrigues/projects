const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6dad1ff223100cd6aa2';

describe('DELETE /tasks/:id', () => {
  describe('quando tenta deleta uma tarefa que não existe', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server).post('/users').send({
        name: 'user_examplo',
        email: 'user_examplo@user.com',
        password: 'senha123',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user_examplo@user.com',
          password: 'senha123',
        })
        .then((res) => res.body.token);

      response = await chai
        .request(server)
        .delete(`/tasks/${EXAMPLE_ID}`)
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Tarefa não encontrada!"', () => {
      expect(response.body.message).to.be.equal('Tarefa não encontrada!');
    });
  });

  describe('quando é deletado com sucesso', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server).post('/users').send({
        name: 'user_example',
        email: 'user_example@user.com',
        password: 'senha123',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user_example@user.com',
          password: 'senha123',
        })
        .then((res) => res.body.token);

      const { insertedId } = await connectionMock
        .db('tasksmanager')
        .collection('tasks')
        .insertOne({
          name: 'Nova Tarefa',
          status: 'Pendente',
          userId: EXAMPLE_ID,
          date: '2022-02-11T01:10:10.320Z',
        });

      response = await chai
        .request(server)
        .delete(`/tasks/${insertedId}`)
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 204', async () => {
      expect(response).to.have.status(204);
    });

    it('que o body seja vazio sem retorno', async () => {
      expect(response.body).to.be.empty;
    });
  });
});
