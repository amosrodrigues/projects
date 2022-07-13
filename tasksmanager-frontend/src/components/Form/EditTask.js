import React, { useCallback, useContext, useEffect, useState } from 'react';
import { updateTask } from '../../api';
import { TaskContext } from '../../context/taskContext';

import { StyledAddTask } from './styleAddTask';

export default function EditTask() {
  const taskInit = {
    name: '',
    status: '',
    date: '',
  };

  const { taskEdit, toggleModalEdit, modalActiveEdit } =
    useContext(TaskContext);

  const [task, setTask] = useState(taskInit || taskEdit);

  const [error, setError] = useState('');

  function handleChangeTask({ target }) {
    setTask({
      ...task,
      [target.name]: target.value,
    });
  }

  function resetModal() {
    toggleModalEdit();
    setTask(taskInit);
    setError('');
  }

  async function handleUpdateTask(event) {
    event.preventDefault();

    const taskEdited = {
      name: task.name,
      status: task.status,
      date: task.date,
    };

    const response = await updateTask(task._id, taskEdited);

    if (response.date) {
      toggleModalEdit();
      setTask(taskInit);
      setError('');
    }

    response.message && setError(response.message);
  }

  const getNewTask = useCallback(async () => {
    setTask(taskEdit);
  }, [taskEdit]);

  useEffect(() => {
    getNewTask();
  }, [getNewTask]);

  return (
    <StyledAddTask>
      <div
        className={`modal-overlay ${modalActiveEdit && taskInit && 'active'}`}>
        <div className="modal">
          <div id="form">
            <h2>Editar Tarefa</h2>
            <form onSubmit={handleUpdateTask}>
              <span className="error">{`${error}`}</span>
              <div className="input-group">
                <label className="sr-only" htmlFor="description">
                  Descrição
                </label>
                <input
                  type="text"
                  id="description"
                  name="name"
                  value={task.name}
                  onChange={handleChangeTask}
                  placeholder="Descrição"
                  size="60"
                />
              </div>

              <div className="group">
                <div className="input-group">
                  <label className="sr-only" htmlFor="date">
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={task.date}
                    onChange={handleChangeTask}
                  />
                </div>

                <div className="input-group">
                  <label className="sr-only" htmlFor="select-Status">
                    Status
                    <select
                      id="select-Status"
                      name="status"
                      value={task.status}
                      onChange={handleChangeTask}>
                      <option></option>
                      <option value="Pendente">Pendente</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Pronto">Pronto</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="input-group actions">
                <span onClick={resetModal} className="button cancel">
                  Cancelar
                </span>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StyledAddTask>
  );
}
