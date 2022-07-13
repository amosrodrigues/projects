import { useContext } from 'react';
import AddRemedy from '../../components/Form/AddRemedy';
import ShowRemdey from '../../components/Form/showRemedys';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import { RemedyContext } from '../../context/remedyContext';

import { StyledMain } from './styles';

export default function Main() {
  const { toggleShow, setToggleShow } = useContext(RemedyContext);

  return (
    <StyledMain>
      <Header />
      <Menu />
      <div className="container">
        <div className="nav">
          <span
            className={toggleShow === 'medicamentos' ? 'selected' : ''}
            onClick={() => setToggleShow('medicamentos')}>
            Medicamentos
          </span>
          <span
            className={
              toggleShow === 'cadastro' || toggleShow === 'editar'
                ? 'selected'
                : ''
            }
            onClick={() => setToggleShow('cadastro')}>
            Cadastro
          </span>
        </div>
        {toggleShow === 'medicamentos' ? <ShowRemdey /> : <AddRemedy />}
      </div>
    </StyledMain>
  );
}
