import React, { useCallback, useContext, useEffect, useState } from 'react';

import { RemedyContext } from '../../context/remedyContext';
import { StyledAddMaker } from './styleAddMaker';
import imgEdit from '../../assets/edit-24.svg';
import imgExclude from '../../assets/trash-24.svg';
import Swal from 'sweetalert2';
import { StyledTableMaker } from './styleTableMaker';
import {
  createMaker,
  excludeMaker,
  getMakers,
  updateMaker,
} from '../../api/makerApi';

export default function AddMaker() {
  const makerInit = {
    name: '',
  };

  const makerInitEdit = {
    name: '',
    id: '',
  };

  const [maker, setMaker] = useState(makerInit);
  const [makerEdit, setMakerEdit] = useState(makerInitEdit);

  const [error, setError] = useState('');
  const [form, setForm] = useState('add');

  const { dataMaker, setDataMaker } = useContext(RemedyContext);

  const fetchMyAPI = useCallback(async () => {
    const response = await getMakers();

    setDataMaker(response);
  }, [setDataMaker]);

  function handleChangeAddMaker({ target }) {
    setMaker({
      ...maker,
      [target.name]: target.value,
    });
  }

  function handleChangeEditMaker({ target }) {
    setMakerEdit({
      ...makerEdit,
      [target.name]: target.value,
    });
  }

  function resetModal() {
    setForm('add');
    setMaker(makerInit);
  }

  async function handleAddMaker(event) {
    event.preventDefault();

    const response = await createMaker(maker);

    if (response.name) {
      fetchMyAPI();
      setError('');
    }

    response.message && setError(response.message);
    resetModal();
  }

  function onActiveFormEdit(maker) {
    setForm('edit');
    setMakerEdit(maker);
  }

  async function handleEditMaker(event) {
    event.preventDefault();

    const makerEdited = {
      name: makerEdit.name,
    };

    const response = await updateMaker(makerEdit.id, makerEdited);

    if (response.name) {
      fetchMyAPI();
      setError('');
    }

    response.message && setError(response.message);
    resetModal();
  }

  async function handleDeleteMaker(id) {
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
        await excludeMaker(id);
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
    <StyledAddMaker>
      {form === 'add' ? (
        <form id="form" onSubmit={handleAddMaker}>
          <span className="error">{error}</span>
          <div className="input-group">
            <label className="sr-only" htmlFor="description">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={maker.name}
              onChange={handleChangeAddMaker}
              placeholder="Fabricante Exemplo LTDA"
              size="60"
            />
          </div>
          <div className="input-group actions">
            <button type="submit">Adicionar</button>
          </div>
        </form>
      ) : (
        <form id="form" onSubmit={handleEditMaker}>
          <div className="input-group">
            <label className="sr-only" htmlFor="description">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={makerEdit.name}
              onChange={handleChangeEditMaker}
              placeholder="Fabricante Exemplo LTDA"
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
            {dataMaker.map(({ name, _id }, index) => (
              <tr key={index}>
                <td className="cod">{index + 1}</td>
                <td className="name">{name}</td>
                <td>
                  <div className="actions">
                    <button
                      title="Editar Fabricante"
                      onClick={() => onActiveFormEdit({ name, id: _id })}
                      type="button">
                      <img src={imgEdit} alt="Editar Fabricante" />
                    </button>
                    <button
                      title="Excluir Fabricante"
                      onClick={() => handleDeleteMaker(_id)}
                      type="button">
                      <img src={imgExclude} alt="Excluir Fabricante" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableMaker>
    </StyledAddMaker>
  );
}
