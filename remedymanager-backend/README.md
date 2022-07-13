<div align="center">
  <h1>
    Boas vindas ao repositório do projeto ! 🚀
  </h1>
</div>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#instruções">Instruções</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contato">Contato</a>
</p>

<br>

<br>

---

<h1 id="tecnologias">Tecnologias ✅</h1>

<br>

Esse projeto foi desenvolvido com as seguintes tecnologias:

- JavaScript
- NodeJS
- Express
- MongoDB

<br>

---

<h1 id="projeto">Projeto ✅</h1>

<br>

Neste projeto é possivél que usuário possa:

- Cadastrar, editar, e remover um medicamento;

- Cadastrar fabricantes

- Cadastrar reações adversas

- Buscar medicamento por nome ou registro

- Visualizar todos os medicamentos

Sobre o desenvolvimento:

- Arquitetura seguindo os princípios SOLID, API REST e REST-FULL no formato MSC;

- Deploy na plataforma Heroku com processos do servidor geridos pelo PM2-RUNTIME.

- Banco de dados hospedado no [MongoDB Atlas](https://www.mongodb.com/) com servidor da AWS.

- Utilização do [ESLint](https://eslint.org/) para padronização de ecrita do código.

<br>

---

<h1 id="instruções">Instruções ✅</h1>

<br>

### Para instalação

1. Clone o repositório

- `git clone git@github.com:Amos-Rodrigues-Dev/remedymanager-backend.git`.
  - Entre na pasta do repositório que você acabou de clonar:
  - `cd remedymanager-backend`

2. Instale as dependências já contidas no arquivo `package.json`.

- `npm install`

3. Crie uma branch a partir da branch `main` conforme preferir.

4. Crie um arquivo `.env` para as variáveis de ambiente com a chave:

```ENV
 JWT_SECRET=senhaDeSuapreferencia
```

5. Descomente a linha **5** e comente a linha **4** do aquivo ./src/models/connection.js

```JS
- 4 const { MONGO_DB_URL } = process.env;
- 5 // const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
```

**👀 Observações importantes:**

- Para rodar o projeto é necessário possuir o [**MongoDB**](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) instalado e inicializado.
- Caso deseje pode rodar em imagem no container [**Docker**](https://docs.docker.com/engine/install/ubuntu/#os-requirements).

6. Rode os senguinte comando para iniciar a aplicação: 🎲

- Utilizando o PM2 com duas instancias:
  - `npm start`
- Com Nodemon:
  - `npm run dev`

<br>

---

<h1 id="contato">Contato ✅</h1>

<br>

<h1>
  <img alt="Foto Amós" title="Foto Amós" src="https://avatars.githubusercontent.com/u/73254602?v=4" width="200px"  />
</h1>

<div> 
  <a href = "mailto:amos.adm.rh@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/amos-rodrigues-dev" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</div>

<br>

Espero que tenha curtido! 💜
