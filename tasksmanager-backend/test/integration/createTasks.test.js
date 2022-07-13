const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const { MongoClient } = require('mongodb');
const { getConnection } = require('./mongoMockConnection');

const server = require('../../src/api/app');

chai.use(chaiHttp);
const { expect } = chai;

describe('POST /tasks', () => {
  describe('quando é possível cadastrar uma tarefa após login com token válido', () => {
    let response = {};
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();

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
        .post('/tasks')
        .send({
          name: 'example',
          status: 'Pendente',
          date: '2022-02-15',
        })
        .set('authorization', token);
    });

    after(async () => {
      await connectionMock.db('tasksmanager').collection('tasks').drop();
      MongoClient.connect.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "task"', () => {
      expect(response.body).to.have.property('task');
    });

    it('a propriedade "name" retornado seja igual a "example"', () => {
      expect(response.body.task.name).to.be.equal('example');
    });
  });

  describe('quando não é possível cadastrar uma tarefa sem um token válido', () => {
    let response = {};
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await chai.request(server).post('/users').send({
        name: 'user_examplo',
        email: 'user_examplo@user.com',
        password: 'senha123',
      });

      const token = '';

      response = await chai
        .request(server)
        .post('/tasks')
        .send({
          name: 'example',
          status: 1,
        })
        .set('authorization', token);
    });

    after(async () => {
      await connectionMock.db('tasksmanager').collection('users').drop();
      MongoClient.connect.restore();
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('quando não é possível cadastrar uma tarefa sem um dos campos obrigatórios', () => {
    let response = {};
    let connectionMock;

    before(async () => {
      connectionMock = await getConnection();

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
        .post('/tasks')
        .send({
          status: 1,
        })
        .set('authorization', token);
    });

    after(async () => {
      await connectionMock.db('tasksmanager').collection('users').drop();
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
