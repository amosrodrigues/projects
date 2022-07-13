import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNewExpenses } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.onClear = this.onClear.bind(this);
  }

  onClear({ target }) {
    const { expenses, setExpenses, onEditFormDisable } = this.props;
    setExpenses(expenses.filter(({ id }) => id !== Number(target.id)));
    onEditFormDisable();
  }

  renderTbody() {
    const { expenses, onEditForm, editId } = this.props;
    return (
      <tbody>
        {
          expenses.map(({ id, description, tag, method, value, currency, exchangeRates,
          }) => (
            <tr key={ id } className={ (editId.id === id) && "table-row"}>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ value }</td>
              <td>{ exchangeRates[currency].name.split('/')[0] }</td>
              <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                {
                  (parseFloat(value) * parseFloat(exchangeRates[currency].ask))
                    .toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  id={ id }
                  onClick={ onEditForm }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  id={ id }
                  onClick={ (e) => this.onClear(e) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    );
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { this.renderTbody() }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenses: (expenses) => dispatch(setNewExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

Table.propTypes = {
  expenses: PropTypes.arrayOf(String).isRequired,
  setExpenses: PropTypes.func.isRequired,
  onEditForm: PropTypes.func.isRequired,
  onEditFormDisable: PropTypes.func.isRequired,
  editId: PropTypes.string,
};

Table.defaultProps = {
  editId: undefined,
};
