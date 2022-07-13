import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import taskLogo from '../../assets/tasks-logo.png';

import { StyledLogin } from './styles';
import { useNavigate } from 'react-router-dom';
import { createUser, onLogin } from '../../api';

export default function Login() {
  const userInit = {
    name: '',
    email: '',
    password: '',
  };

  const loginInit = {
    email: '',
    password: '',
  };

  const [user, setUser] = useState(userInit);
  const [login, setLogin] = useState(loginInit);
  const [isLoading, setIsLoading] = useState({ login: false, cadastro: false });

  const navigate = useNavigate();

  function handleChangeUser({ target }) {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  }

  function handleChangeLogin({ target }) {
    setLogin({
      ...login,
      [target.name]: target.value,
    });
  }

  async function handleCreateUser(event) {
    event.preventDefault();
    setIsLoading({ ...isLoading, cadastro: true });

    const response = await createUser(user);

    if (response._id) {
      await Swal.fire({
        icon: 'success',
        title: 'Cadastrado com sucesso!',
        text: 'Faça login e organize suas tarefas...',
      });
      setUser(userInit);
    }

    response.message &&
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.message,
      });

    setIsLoading({ ...isLoading, cadastro: false });
  }

  async function handleLogin(event) {
    event.preventDefault();
    setIsLoading({ ...isLoading, login: true });

    const response = await onLogin(login);

    if (response.token) {
      localStorage.setItem('auth', JSON.stringify(response));
      await Swal.fire({
        icon: 'success',
        title: 'Login efetuado com sucesso!',
        text: 'Aproveite ao máximo e nos contemple com seus feedbacks...',
      });
      setLogin(loginInit);
      navigate('/home');
    }

    response.message &&
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.message,
      });

    setIsLoading({ ...isLoading, login: false });
  }

  return (
    <StyledLogin>
      <div className="main-content container">
        <div className="container-logo">
          <img src={taskLogo} alt="Logo da aplicação" />
        </div>
        <div className="container-login">
          <div className="login">
            <h2>QUERO ME CADASTRAR</h2>
            <form onSubmit={handleCreateUser}>
              <input
                type="text"
                placeholder="Digite seu nome"
                name="name"
                value={user.name}
                onChange={handleChangeUser}
              />
              <input
                type="text"
                placeholder="Email: exemplo@exemplo.com"
                name="email"
                value={user.email}
                onChange={handleChangeUser}
              />
              <input
                type="password"
                placeholder="Senha: Senh@123"
                autoComplete="off"
                name="password"
                value={user.password}
                onChange={handleChangeUser}
              />
              <Button
                type="submit"
                disabled={
                  !(user.name && user.email && user.password.length >= 6)
                }>
                {isLoading.cadastro ? (
                  <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </form>
          </div>

          <div className="divider" />

          <div className="login">
            <h2>JÁ TENHO CADASTRO</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Email: exemplo@exemplo.com"
                name="email"
                value={login.email}
                onChange={handleChangeLogin}
              />
              <input
                type="password"
                placeholder="Senha: Senh@123"
                name="password"
                autoComplete="off"
                value={login.password}
                onChange={handleChangeLogin}
              />
              <Button
                type="submit"
                disabled={!(login.email && login.password.length >= 6)}>
                {isLoading.login ? (
                  <div class="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </StyledLogin>
  );
}
