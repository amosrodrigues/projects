const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('GET /tasks/:id', () => {
  describe('quando é não possível consultar uma tarefa sem o id correto', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      connectionMock
        .db('tasksmanager')
        .collection('tasks')
        .insertMany([
          {
            _id: '61e88aa7152585d9a885f0bb',
            name: 'nova_tarefa_1',
            status: 1,
            userId: '61e8649d8c3f1682e0d76081',
            date: '2022-02-10T18:12:51.536Z',
          },
          {
            _id: '61e88aa7152585d9a885f0cb',
            name: 'nova_tarefa_2',
            status: 2,
            userId: '61e8649d8c3f1682e0d76082',
            date: '2022-02-10T18:12:51.536Z',
          },
        ]);

      response = await chai.request(server).get(`/tasks/${EXAMPLE_ID}`);
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

  describe('Quando a tarefa é encontrada com sucesso', () => {
    let response;

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock
        .db('tasksmanager')
        .collection('tasks')
        .insertOne({
          name: 'nova_tarefa_3',
          status: 2,
        });

      response = await chai.request(server).get(`/tasks/${insertedId}`);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna código de status "200"', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('que tenha a propriedade _id', () => {
      expect(response.body).to.have.a.property('_id');
    });
  });
});
