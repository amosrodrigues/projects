import taskLogo from '../../assets/tasks-logo.png';
import { StyledHeader } from './styles';
import imgBack from '../../assets/back.svg';

export default function Header() {
  const auth = JSON.parse(localStorage.getItem('auth'));

  return (
    <StyledHeader>
      <header className="header">
        <a href="/">
          <img src={imgBack} alt="Voltar" />
        </a>
        <div className="container-logo">
          <h2>{`Olá, ${auth.user.name.split(' ')[0]}!`}</h2>
          <img src={taskLogo} alt="Logo da aplicação" />
        </div>
      </header>
    </StyledHeader>
  );
}
