import { useCallback, useContext, useEffect, useState } from 'react';
import { excludeTask, getTasks } from '../../api';
import { TaskContext } from '../../context/taskContext';
import { StyledTable } from './styleTable';
import Swal from 'sweetalert2';
import moment from 'moment'; // Ref: https://stackoverflow.com/questions/28949911/what-does-this-format-means-t000000-000z
import imgEdit from '../../assets/edit-24.svg';
import imgExclude from '../../assets/trash-24.svg';

import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import usePersistedState from '../../hooks/usePersistedState';

export default function AddTask() {
  const [order, setOrder] = useState({ option: 'date', action: true });
  const { toggleModalEdit, setTaskEdit } = useContext(TaskContext);

  const [data, setData] = usePersistedState([]);

  const fetchMyAPI = useCallback(async () => {
    const search = {
      option: order.option || 'date',
      action: order.action ? 1 : -1,
    };

    const response = await getTasks(search);

    setData(response);
  }, [order, toggleModalEdit]);

  function renderClassName(status) {
    switch (status) {
      case 'Pronto':
        return 'status1';
      case 'Em andamento':
        return 'status2';
      case 'Pendente':
        return 'status3';
      default:
        return 'status1';
    }
  }

  function handleEditTask(task) {
    const newTask = {
      ...task,
      date: task.date.split('T')[0],
    };

    setTaskEdit(newTask);
    toggleModalEdit();
  }

  async function handleDeleteTask(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Cancelar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Excluído!', 'Exclusão efetuada com sucesso.', 'success');
        await excludeTask(id);
        fetchMyAPI();
      }
    });
  }

  async function setOrderOptionLocal(option) {
    setOrder({ option, action: !order.action });
  }

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  function renderTbody() {
    return (
      <tbody>
        {data.map(({ name, status, date, _id }) => (
          <tr key={_id}>
            <td className="description">{name}</td>
            <td className={renderClassName(status)}>{status}</td>
            <td className="date">{moment.utc(date).format('DD/MM/YYYY')}</td>
            <td>
              <div className="actions">
                <button
                  title="Editar Tarefa"
                  onClick={() => handleEditTask({ name, status, date, _id })}
                  type="button">
                  <img src={imgEdit} alt="Editar Tarefa" />
                </button>
                <button
                  title="Excluir Tarefa"
                  onClick={() => handleDeleteTask(_id)}
                  type="button">
                  <img src={imgExclude} alt="Excluir Tarefa" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <StyledTable>
      <table id="data-table">
        <thead>
          <tr>
            <th>
              <span
                className="order"
                onClick={() => setOrderOptionLocal('name')}>
                Descrição{' '}
                {!order.action && order.option === 'name' ? (
                  <BsChevronUp />
                ) : (
                  <BsChevronDown />
                )}
              </span>
            </th>
            <th>
              <span
                className="order"
                onClick={() => setOrderOptionLocal('status')}>
                Status{' '}
                {!order.action && order.option === 'status' ? (
                  <BsChevronUp />
                ) : (
                  <BsChevronDown />
                )}
              </span>
            </th>
            <th>
              <span
                className="order"
                onClick={() => setOrderOptionLocal('date')}>
                Data{' '}
                {!order.action && order.option === 'date' ? (
                  <BsChevronUp />
                ) : (
                  <BsChevronDown />
                )}
              </span>
            </th>
            <th>
              <span></span>
            </th>
          </tr>
        </thead>
        {renderTbody()}
      </table>
    </StyledTable>
  );
}
