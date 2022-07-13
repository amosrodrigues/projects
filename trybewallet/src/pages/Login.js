import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail as setEmailValid } from '../actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const { history, setEmail } = this.props;
    const { email } = this.state;

    setEmail(email);
    history.push('/carteira');
  }

  handleChange({ target: { name, value } }) {
    const emailChar = /\S+@\S+\.\S+/; // extraído de: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    switch (name) {
    case 'email':
      this.setState({
        [name]: value,
        emailValid: emailChar.test(value),
      });
      break;
    case 'password':
      this.setState({
        [name]: value,
        passwordValid: value.length >= '6',
      });
      break;
    default:
      break;
    }
  }

  render() {
    const { email, password, emailValid, passwordValid } = this.state;
    return (
      <div className="Login-page">
        <form onSubmit={ this.onSubmitLogin }>
          <img id="trybe-img" src="https://static.wixstatic.com/media/4c2984_e8ba75672946447b9c0718f98d806496~mv2.png" alt="logo-trybe"></img>
          <h2>WALLET</h2>
        <div className="Login-filds">
          <label htmlFor="email">
            <input 
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
              placeholder="Email..."
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
              placeholder="Senha..."
            />
          </label>
          <button
            type="submit"
            disabled={ !(emailValid && passwordValid) }
            className={ (emailValid && passwordValid) && "btn-enable"}
          >
            Entrar
          </button>
        </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (payload) => dispatch(setEmailValid(payload)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.objectOf(String),
  setEmail: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: undefined,
};
