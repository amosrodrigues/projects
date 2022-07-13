const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

const EXAMPLE_ID = '605de6ded1ff223100cd6aa1';

describe('PUT /tasks/:id', () => {
  describe('quando é atualizado com sucesso', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server).post('/users').send({
        name: 'user_example032',
        email: 'user_example032@user.com',
        password: 'senha12359',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user_example032@user.com',
          password: 'senha12359',
        })
        .then((res) => res.body.token);

      const { insertedId } = await connectionMock
        .db('tasksmanager')
        .collection('tasks')
        .insertOne({
          name: 'example_task',
          status: 'Pendente',
          date: '2022-02-13T00:00:00.000Z',
        });

      response = await chai
        .request(server)
        .put(`/tasks/${insertedId}`)
        .send({
          name: 'xablau',
          status: 'Concluido',
          date: '2022-02-14T00:00:00.000Z',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('a propriedade "name" retornado seja igual a "name', () => {
      expect(response.body.name).to.be.equal('xablau');
    });
  });

  describe('quando não há uma das informações da tarefa', () => {
    let response = {};

    before(async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server).post('/users').send({
        name: 'user_example02',
        email: 'user_example02@user.com',
        password: 'senha1235',
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'user_example02@user.com',
          password: 'senha1235',
        })
        .then((res) => res.body.token);

      connectionMock.db('tasksmanager').collection('tasks').insertOne({
        _id: EXAMPLE_ID,
        name: 'Nova Tarefa',
        status: 'Pronto',
        userId: '6205b4f7cb0bbfefe448131b',
        date: '2022-02-11T02:14:06.053Z',
      });

      response = await chai
        .request(server)
        .put(`/tasks/${EXAMPLE_ID}`)
        .send({
          status: 'Pendente',
        })
        .set('authorization', token);
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Dados inválidos, tente novamente!"', () => {
      expect(response.body.message).to.be.equal(
        'Dados inválidos, tente novamente!',
      );
    });
  });
});
