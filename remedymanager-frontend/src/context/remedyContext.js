import { createContext, useState } from 'react';
import usePersistedStateMakers from '../hooks/usePersistedStateMakers';
import usePersistedStateReacts from '../hooks/usePersistedStateReacts';
import usePersistedStateRemedys from '../hooks/usePersistedStateRemedys';

export const RemedyContext = createContext({});

export function RemedyContextProvider({ children }) {
  const [dataMaker, setDataMaker] = usePersistedStateMakers([]);

  const [dataReact, setDataReact] = usePersistedStateReacts([]);

  const [dataRemedy, setDataRemedy] = usePersistedStateRemedys([]);

  const [toggleShow, setToggleShow] = useState('medicamentos');

  const [remedyEdit, setRemedyEdit] = useState({});

  const contextValue = {
    dataMaker,
    setDataMaker,
    dataReact,
    setDataReact,
    dataRemedy,
    setDataRemedy,
    toggleShow,
    setToggleShow,
    remedyEdit,
    setRemedyEdit,
  };

  return (
    <RemedyContext.Provider value={contextValue}>
      {children}
    </RemedyContext.Provider>
  );
}
