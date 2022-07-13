import { useState } from 'react';
import AddMaker from '../../components/Form/AddMaker';
import AddReact from '../../components/Form/AddReact';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import { StyledTables } from './styles';

export default function Tables() {
  const [option, setOption] = useState('medicamentos');
  return (
    <StyledTables>
      <Header />
      <Menu />
      <div className="container">
        <div className="nav">
          <span
            className={option === 'medicamentos' ? 'selected' : ''}
            onClick={() => setOption('medicamentos')}>
            Fabricante
          </span>
          <span
            className={option === 'cadastro' ? 'selected' : ''}
            onClick={() => setOption('cadastro')}>
            Reações
          </span>
        </div>
        {option === 'medicamentos' ? <AddMaker /> : <AddReact />}
      </div>
    </StyledTables>
  );
}
