import { createContext, useState } from 'react';

export const TaskContext = createContext({});

export function TaskContextProvider({ children }) {
  const [userContext, setUserContext] = useState({});

  const [modalActive, setModalActive] = useState(false);

  const [modalActiveEdit, setModalActiveEdit] = useState(false);

  const [taskEdit, setTaskEdit] = useState({
    name: '',
    status: '',
    date: '',
  });

  function toggleModal() {
    setModalActive(!modalActive);
  }

  function toggleModalEdit() {
    setModalActiveEdit(!modalActiveEdit);
  }

  const contextValue = {
    userContext,
    setUserContext,
    modalActive,
    toggleModal,
    modalActiveEdit,
    setModalActiveEdit,
    toggleModalEdit,
    taskEdit,
    setTaskEdit,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
}
