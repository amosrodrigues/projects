import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Settings.css';

class Settings extends Component {
  render() {
    return (
      <div className="settings">
        <div className="container-config">
          <h1 data-testid="settings-title">Configurações</h1>
          <h3>Conheça mais sobre esta API</h3>
          <a href='https://opentdb.com/api_config.php'>
            Aqui...
          </a>
          <div className="box-buttons">
            <Link to="/">
              <button
                type="button"
                data-testid="btn-go-home"
              >
                Tela de Inicial
              </button>
            </Link>
          </div>
        </div>
        <div className="question-cred">
          <hr style={ { width: '50%' } }/>
          <h3>Projeto Desenvolvido em Grupo:</h3>
            <p>Amós Rodrigues</p>
            <p>Fabio Juvenal</p>
            <p>Lucas Cardim</p>
            <p>Raphael Rodrigues</p>
          <hr style={ { width: '50%' } }/>

        </div>
      </div>
    );
  }
}

export default Settings;
