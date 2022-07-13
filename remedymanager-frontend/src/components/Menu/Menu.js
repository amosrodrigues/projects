import { useLocation } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { StyledMenu } from './styles';

export default function Menu() {
  const { pathname } = useLocation();

  const renderClass = (actual) => {
    if (actual === pathname) {
      return 'selected';
    }
  };

  return (
    <StyledMenu>
      <div className="menu">
        <div className="icons">
          <Link className={`icon ${renderClass('/')} card`} to="/">
            <span>Arquivos</span>
            <span
              className={`${
                renderClass('/') === 'selected' && 'triangle-left'
              }`}></span>
          </Link>

          <Link className={`icon ${renderClass('/tables')} card`} to="/tables">
            <span>Tabelas</span>
            <span
              className={`${
                renderClass('/tables') === 'selected' && 'triangle-left'
              }`}></span>
          </Link>
        </div>
      </div>
    </StyledMenu>
  );
}
