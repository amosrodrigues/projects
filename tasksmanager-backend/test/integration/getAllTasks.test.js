const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient, ObjectId } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa6';

describe('GET /tasks', () => {
  describe('quando é possível consultar uma lista de tarefas', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db('tasksmanager').collection('users').insertOne({
        _id: EXAMPLE_ID,
        name: 'admin',
        email: 'user_example033@user.com',
        password: 'senha12354',
        role: 'admin',
      });

      const token = await chai.request(server).post('/login').send({
        email: 'user_example033@user.com',
        password: 'senha12354',
      }).then((res) => res.body.token);

      await connectionMock
        .db('tasksmanager')
        .collection('tasks')
        .insertMany([
          {
            name: 'nova_tarefa_1',
            status: "1",
            userId: EXAMPLE_ID,
            date: "2022-02-11T18:12:51.536Z"
          },
          {
            name: 'nova_tarefa_2',
            status: "2",
            userId:  EXAMPLE_ID,
            date: "2022-02-10T18:12:51.536Z"
          },
        ]);

      response = await chai.request(server).post('/tasks/all').set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array', () => {
      expect(response.body).to.be.an('array');
    });

    it('tais itens possuem os atributos "_id", "name", "status", "userId" e "date".', async () => {
      const [item] = response.body;

      expect(item).to.include.all.keys(['_id', 'name', 'status', 'userId', "date"]);
    });
  });
});