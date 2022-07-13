import React, { useContext } from 'react';
import AddTask from '../../components/Form/AddTask';
import EditTask from '../../components/Form/EditTask';
import TableTasks from '../../components/Form/TableTasks';
import Header from '../../components/Header/Header';
import { TaskContext } from '../../context/taskContext';

import imgAddTask from '../../assets/plus-24.svg';

import { StyledHome } from './styles';
export default function Home() {
  const { toggleModal } = useContext(TaskContext);

  return (
    <StyledHome>
      <Header />
      <div id="add-tasks">
        <span onClick={() => toggleModal()} className="button-new">
          <img src={imgAddTask} alt="Nova Tarefa"></img>
          Nova Tarefa
        </span>
      </div>
      <AddTask />
      <EditTask />
      <TableTasks />
    </StyledHome>
  );
}
