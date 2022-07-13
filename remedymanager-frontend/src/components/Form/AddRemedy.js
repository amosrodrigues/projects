import React, { useCallback, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import MaskedInput from '../Selectors/maskedInput';

import { StyledAddRemedy } from './styleAddRemedy';
import { RemedyContext } from '../../context/remedyContext';

import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { createRemedy } from '../../api/remedyApi';
import EditRemedy from './EditRemedy';

export default function AddRemedy() {
  const remedyInit = {
    nroAnvisa: '',
    name: '',
    price: '',
    dateValid: '',
    phone: '',
    pills: '',
    maker: '',
    reacts: '',
  };

  const [remedy, setRemedy] = useState(remedyInit);
  const [error, setError] = useState('');
  const [options, setOptions] = useState(false);

  const { dataMaker, dataReact, toggleShow } = useContext(RemedyContext);

  function handleChangeAddRemedy({ target }) {
    setRemedy({
      ...remedy,
      [target.name]: target.value,
    });
    setError('');
  }

  const handleChangeInputPrice = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
    setRemedy({
      ...remedy,
      price: value,
    });
    setError('');
  };

  function resetForm() {
    setRemedy(remedyInit);
    setOptions(!options);
  }

  async function handleAddRemedy(event) {
    event.preventDefault();

    const response = await createRemedy(remedy);

    if (response.name) {
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Medicamento salvo com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });
      return resetForm();
    }
    response.message && setError(response.message);
  }

  const handleInsertReacChecked = useCallback(() => {
    let checkboxes = document.querySelectorAll(
      'input[type="checkbox"]:checked',
    );
    let values = [];
    checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
    });
    setRemedy((s) => ({
      ...s,
      reacts: values,
    }));
  }, []);

  return toggleShow === 'editar' ? (
    <EditRemedy />
  ) : (
    <StyledAddRemedy>
      <form id="form-remedy" onSubmit={handleAddRemedy}>
        <span className="error">{error}</span>
        <div className="input-group">
          <div className="one">
            <label className="sr-only" htmlFor="name">
              Nome
              <input
                type="text"
                id="name"
                name="name"
                value={remedy.name}
                onChange={handleChangeAddRemedy}
                size="60"
              />
            </label>
            <label className="sr-only" htmlFor="nroAnvisa">
              Nº Anvisa
              <MaskedInput
                id="nroAnvisa"
                name="nroAnvisa"
                value={remedy.nroAnvisa}
                mask="9.9999.9999.999-9"
                onChange={handleChangeAddRemedy}
              />
            </label>
          </div>
          <div className="two">
            <label className="sr-only" htmlFor="price">
              Preço R$
              <input
                id="price"
                name="price"
                placeholder="0,00"
                value={remedy.price}
                onChange={handleChangeInputPrice}
              />
            </label>
            <label className="sr-only" htmlFor="pills">
              Comp.
              <input
                type="number"
                id="pills"
                name="pills"
                value={remedy.pills}
                onChange={handleChangeAddRemedy}
              />
            </label>
            <label className="sr-only" htmlFor="phone">
              Telefone Sac
              <MaskedInput
                id="phone"
                name="phone"
                value={remedy.phone}
                mask="(99)9999-9999"
                onChange={handleChangeAddRemedy}
              />
            </label>
            <label className="sr-only" htmlFor="dateValid">
              Data de Validade
              <input
                type="date"
                id="dateValid"
                name="dateValid"
                value={remedy.dateValid}
                onChange={handleChangeAddRemedy}
              />
            </label>
          </div>
          <div className="three">
            <label className="sr-only" htmlFor="maker">
              Fabricante
              <select
                id="maker"
                name="maker"
                value={remedy.maker}
                onChange={handleChangeAddRemedy}>
                <option></option>
                {dataMaker?.map(({ name, _id }) => (
                  <option key={_id}>{name}</option>
                ))}
              </select>
            </label>
            <label className="sr-only" htmlFor="react">
              Reações Adversas
              <span
                id="react"
                className="order"
                onClick={() => setOptions(!options)}>
                {options ? 'Ocultar' : 'Exibir'}{' '}
                {options ? <BsChevronUp /> : <BsChevronDown />}
              </span>
            </label>
            <div className="input-group actions">
              <button type="submit">Adicionar</button>
            </div>
          </div>
        </div>

        {options ? (
          <div className="options-reacts">
            {dataReact.map(({ name, _id }) => (
              <label className="check-only" key={_id} htmlFor={_id}>
                <input
                  onChange={handleInsertReacChecked}
                  type="checkbox"
                  id={_id}
                  name={name}
                  value={name}
                />
                <span>{name}</span>
              </label>
            ))}
          </div>
        ) : (
          ''
        )}
      </form>
    </StyledAddRemedy>
  );
}
