import React, { useContext, useState } from 'react';
import { createTask } from '../../api';
import { TaskContext } from '../../context/taskContext';
import { StyledAddTask } from './styleAddTask';

export default function AddTask() {
  const taskInit = {
    name: '',
    status: '',
    date: '',
  };

  const { toggleModal, modalActive } = useContext(TaskContext);

  const [task, setTask] = useState(taskInit);
  const [error, setError] = useState('');

  function handleChangeTask({ target }) {
    setTask({
      ...task,
      [target.name]: target.value,
    });
  }

  function resetModal() {
    toggleModal();
    setTask(taskInit);
    setError('');
  }

  async function handleAddTask(event) {
    event.preventDefault();

    const auth = JSON.parse(localStorage.getItem('auth'));

    const response = await createTask(task, auth.token);

    if (response.date) {
      toggleModal();
      setTask(taskInit);
      setError('');
    }

    response.message && setError(response.message);
  }

  return (
    <StyledAddTask>
      <div className={`modal-overlay ${modalActive && 'active'}`}>
        <div className="modal">
          <div id="form">
            <h2>Nova Tarefa</h2>
            <form onSubmit={handleAddTask}>
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
