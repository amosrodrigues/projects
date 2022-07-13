import React, { useCallback, useContext, useEffect, useState } from 'react';

import { RemedyContext } from '../../context/remedyContext';
import { StyledAddReact } from './styleAddReact';

import imgEdit from '../../assets/edit-24.svg';
import imgExclude from '../../assets/trash-24.svg';
import Swal from 'sweetalert2';
import { StyledTableMaker } from './styleTableMaker';

import {
  createReact,
  excludeReact,
  getReacts,
  updateReact,
} from '../../api/reactApi';

export default function AddMaker() {
  const reactInit = {
    name: '',
  };

  const reactInitEdit = {
    name: '',
    id: '',
  };

  const [react, setReact] = useState(reactInit);
  const [reactEdit, setReactEdit] = useState(reactInitEdit);

  const [error, setError] = useState('');
  const [form, setForm] = useState('add');

  const { dataReact, setDataReact } = useContext(RemedyContext);

  const fetchMyAPI = useCallback(async () => {
    const response = await getReacts();

    setDataReact(response);
  }, [setDataReact]);

  function handleChangeAddReact({ target }) {
    setReact({
      ...react,
      [target.name]: target.value,
    });
  }

  function handleChangeEditReact({ target }) {
    setReactEdit({
      ...reactEdit,
      [target.name]: target.value,
    });
  }

  function resetModal() {
    setForm('add');
    setReact(reactInit);
  }

  async function handleAddReact(event) {
    event.preventDefault();

    const response = await createReact(react);

    if (response.name) {
      fetchMyAPI();
      setError('');
    }

    response.message && setError(response.message);
    resetModal();
  }

  function onActiveFormEdit(react) {
    setForm('edit');
    setReactEdit(react);
  }

  async function handleEditReact(event) {
    event.preventDefault();

    const reactEdited = {
      name: reactEdit.name,
    };

    const response = await updateReact(reactEdit.id, reactEdited);

    if (response.name) {
      fetchMyAPI();
      setError('');
    }

    response.message && setError(response.message);
    resetModal();
  }

  async function handleDeleteReact(id) {
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
        await excludeReact(id);
        fetchMyAPI();
        setError('');
      }
    });
    resetModal();
    setError('');
  }

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <StyledAddReact>
      {form === 'add' ? (
        <form id="form" onSubmit={handleAddReact}>
          <span className="error">{error}</span>
          <div className="input-group">
            <label className="sr-only" htmlFor="description">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={react.name}
              onChange={handleChangeAddReact}
              placeholder="Reação Exemplo xxxx"
              size="60"
            />
          </div>
          <div className="input-group actions">
            <button type="submit">Adicionar</button>
          </div>
        </form>
      ) : (
        <form id="form" onSubmit={handleEditReact}>
          <div className="input-group">
            <label className="sr-only" htmlFor="description">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={reactEdit.name}
              onChange={handleChangeEditReact}
              placeholder="Reação Exemplo xxxx"
              size="60"
            />
          </div>
          <div className="actions">
            <button className="outlined" type="submit">
              Editar
            </button>
            <span onClick={resetModal} className="button cancel">
              Cancelar
            </span>
          </div>
        </form>
      )}

      <StyledTableMaker>
        <table id="data-table">
          <thead>
            <tr>
              <th>
                <span className="order">Código </span>
              </th>
              <th>
                <span className="order">Nome </span>
              </th>
              <th>
                <span></span>
              </th>
            </tr>
          </thead>
          <tbody>
            {dataReact.map(({ name, _id }, index) => (
              <tr key={index}>
                <td className="cod">{index + 1}</td>
                <td className="name">{name}</td>
                <td>
                  <div className="actions">
                    <button
                      title="Editar Reação"
                      onClick={() => onActiveFormEdit({ name, id: _id })}
                      type="button">
                      <img src={imgEdit} alt="Editar Reação" />
                    </button>
                    <button
                      title="Excluir Reação"
                      onClick={() => handleDeleteReact(_id)}
                      type="button">
                      <img src={imgExclude} alt="Excluir Reação" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableMaker>
    </StyledAddReact>
  );
}
