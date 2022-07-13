import { useCallback, useContext, useEffect, useState } from 'react';

import { StyledShowRemedy } from './styleShowRemedys';
import { RemedyContext } from '../../context/remedyContext';
import {
  excludeRemedy,
  getRemedyByNameOrId,
  getRemedys,
} from '../../api/remedyApi';

import Swal from 'sweetalert2';

import imgEdit from '../../assets/edit-24.svg';
import imgExclude from '../../assets/trash-24.svg';

import moment from 'moment';

export default function ShowRemdey() {
  const filter = {
    option: '',
    term: '',
  };

  const [search, setSearch] = useState(filter);

  const { dataRemedy, setDataRemedy, setToggleShow, setRemedyEdit } =
    useContext(RemedyContext);

  const fetchMyAPI = useCallback(async (search) => {
    const response = await getRemedys();

    setDataRemedy(response);
  }, []);

  const handleChangeSearch = ({ target }) => {
    setSearch({
      ...search,
      [target.name]: target.value,
    });
  };

  async function handleDeleteRemedy(id) {
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
        await excludeRemedy(id);
        fetchMyAPI();
      }
    });
  }

  function handleEditRemedy(remedy) {
    setToggleShow('editar');
    setRemedyEdit(remedy);
  }

  async function searchRemedyByNameOrId(event) {
    event.preventDefault();
    const remedy = await getRemedyByNameOrId(search);

    if (remedy.length >= 0) {
      setDataRemedy(remedy);
      return;
    }
    fetchMyAPI();
  }

  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

  return (
    <StyledShowRemedy>
      <form onSubmit={searchRemedyByNameOrId} id="form-search">
        <span className="error"></span>
        <div className="input-group">
          <label className="sr-only" htmlFor="option">
            Pesquisar por
            <select id="option" name="option" onChange={handleChangeSearch}>
              <option></option>
              <option value="name">Nome</option>
              <option value="_id">Registro</option>
            </select>
          </label>
          <label className="sr-only" htmlFor="term">
            Termo
            <input
              type="text"
              id="term"
              name="term"
              value={search.term}
              onChange={handleChangeSearch}
              placeholder="Digitar busca..."
              size="60"
            />
          </label>
          <div className="input-group actions">
            <button type="submit">Buscar</button>
          </div>
        </div>
      </form>
      <form id="form-card">
        {dataRemedy ? (
          dataRemedy.map((remdey) => (
            <div className="info-group" key={remdey._id}>
              <div className="one">
                <h2>{remdey.name}</h2>
                <fieldset>
                  <legend>&nbsp; Registro &nbsp;</legend>
                  <span>{remdey._id}</span>
                </fieldset>
              </div>
              <div className="two">
                <fieldset>
                  <legend>R$</legend>
                  <span>{remdey.price}</span>
                </fieldset>
                <fieldset>
                  <legend>Comp.</legend>
                  <span>{remdey.pills}</span>
                </fieldset>
                <fieldset>
                  <legend>Telefone</legend>
                  <span>{remdey.phone}</span>
                </fieldset>
                <fieldset>
                  <legend>Validade</legend>
                  <span>
                    {moment.utc(remdey.dateValid).format('DD/MM/YYYY')}
                  </span>
                </fieldset>
                <fieldset>
                  <legend>Nº Anvisa</legend>
                  <span>{remdey.nroAnvisa}</span>
                </fieldset>
              </div>
              <div className="three">
                <fieldset>
                  <button
                    title="Editar Medicamento"
                    onClick={() => handleEditRemedy(remdey)}
                    type="button">
                    <img src={imgEdit} alt="Editar Medicamento" />
                  </button>
                  <button
                    title="Excluir Medicamento"
                    onClick={() => handleDeleteRemedy(remdey._id)}
                    type="button">
                    <img src={imgExclude} alt="Excluir Medicamento" />
                  </button>
                </fieldset>
                <fieldset>
                  <legend>Fabricante</legend>
                  <span>{remdey.maker}</span>
                </fieldset>
                <fieldset>
                  <legend>&nbsp; Reações &nbsp;</legend>
                  <ul className="show-reacts">
                    {remdey.reacts.map((react, index) => (
                      <li key={index}>{react}</li>
                    ))}
                  </ul>
                </fieldset>
              </div>
            </div>
          ))
        ) : (
          <div class="loading">
            <div class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </form>
    </StyledShowRemedy>
  );
}
