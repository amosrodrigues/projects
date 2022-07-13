import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFetchExpenses, setNewExpenses } from '../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.onSubmitExpenses = this.onSubmitExpenses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderFilds = this.renderFilds.bind(this);
  }

  onSubmitExpenses(e) {
    e.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { setExpenses, expenses } = this.props;
    const newExpenses = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };
    if (value === '' || description === '') {
      alert('Existem campos incompletos!');
    } else {
      setExpenses(newExpenses);
    }
    this.setState(INITIAL_STATE);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  renderFilds() {
    const { value, currency } = this.state;
    const { currencies } = this.props;

    return (
      <>
        <label htmlFor="field-valor">
          Valor
          <input
            id="field-valor"
            name="value"
            type="number"
            min="0"
            max="99999.99"
            step="0.01"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="select-moeda">
          Moeda
          <select
            id="select-moeda"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            {
              currencies.map((item) => (
                <option key={ item } value={ item }>{ item }</option>
              ))
            }
          </select>
        </label>
      </>
    );
  }

  render() {
    const { method, tag, description } = this.state;
    return (
      <form onSubmit={ this.onSubmitExpenses } >

        { this.renderFilds() }

        <label htmlFor="select-payment">
          Método de pagamento
          <select
            id="select-payment"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="select-tag">
          Tag
          <select
            id="select-tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>

          <label htmlFor="field-desc">
          Descrição
          <input
            id="field-desc"
            name="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenses: (expenses) => dispatch(setFetchExpenses(expenses)),
  setNewExpensesEdit: (expenses) => dispatch(setNewExpenses(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

Form.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
  setExpenses: PropTypes.func.isRequired,
  setNewExpensesEdit: PropTypes.func.isRequired,
};
