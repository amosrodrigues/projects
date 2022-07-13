import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/form';
import { FcHome } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import FormEdit from '../components/formEdit';
import { setFetchCurrencies } from '../actions';
import Table from '../components/table';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      cambio: 'BRL',
      editId: '',
    };

    this.fetchAwesomeApi = this.fetchAwesomeApi.bind(this);
    this.amountExpenses = this.amountExpenses.bind(this);
    this.onEditForm = this.onEditForm.bind(this);
    this.onEditFormDisable = this.onEditFormDisable.bind(this);
    this.onReturnLogin = this.onReturnLogin.bind(this);
  }

  componentDidMount() {
    this.fetchAwesomeApi();
  }

  onEditForm({ target: { id } }) {
    const { expenses } = this.props;
    const expenseEdit = expenses.find((objct) => objct.id === Number(id));
    this.setState({ editId: expenseEdit });
  }

  onEditFormDisable() {
    const { editId } = this.state;
    if (editId !== '') this.setState({ editId: '' });
  }

  onReturnLogin() {
    const { history } = this.props;
    history.push('/');
  }

  amountExpenses() {
    const { expenses } = this.props;
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      acc += parseFloat(value) * parseFloat(exchangeRates[currency].ask);
      return acc;
    }, 0);
  }

  fetchAwesomeApi() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  render() {
    const { cambio, editId } = this.state;
    const { getEmail } = this.props;
    // if (getEmail === '') { Inicialmente o teste não prevê esta implementação
    //   return (
    //     <div className="wallet-page" >
    //       <div className="login-not-found">
    //         <span>Login não efetuado..!</span>
    //           <button type="button" onClick={ this.onReturnLogin } >
    //           Retornar
    //           </button>
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div className="wallet-page">
        <header className="wallet-header">
          <img
            id="trybe-img"
            src="https://static.wixstatic.com/media/4c2984_e8ba75672946447b9c0718f98d806496~mv2.png"
            alt="logo-trybe"></img>
          <div>
            <span data-testid="email-field">{`Email: ${getEmail}`}</span>
            <span data-testid="total-field">
              {`Despesa Total: R$ ${this.amountExpenses().toFixed(2)}`}
            </span>
            <span data-testid="header-currency-field">{cambio}</span>
          </div>
          <button type="button" onClick={this.onReturnLogin}>
            Sair
          </button>
          <a className="icom-home" href="https://amosrodrigues-dev.web.app/">
            <FcHome size={60} />
          </a>
          <a
            className="icom-git"
            href="https://github.com/Amos-Rodrigues-Dev/trybewallet">
            <FaGithub size={50} />
          </a>
        </header>
        <section className="wallet-filds">
          {!editId ? (
            <Form />
          ) : (
            <FormEdit
              editId={editId}
              onEditFormDisable={this.onEditFormDisable}
            />
          )}
        </section>
        <section className="wallet-table">
          <Table
            editId={editId}
            onEditForm={this.onEditForm}
            onEditFormDisable={this.onEditFormDisable}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getEmail: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(setFetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  getEmail: PropTypes.string.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
};
