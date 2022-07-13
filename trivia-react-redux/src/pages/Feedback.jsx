import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  feedBackTable(score, assertions) {
    return (
      <table>
        <caption>Placar Atual</caption>
        <thead>
          <tr>
            <th>Pontuação</th>
            <th>Assertos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-testid="feedback-total-score">{ score }</td>
            <td data-testid="feedback-total-question">{ assertions }</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>=============</td>
            <td>=============</td>
          </tr>
        </tfoot>
      </table>
    );
  }

  render() {
    const { player: { score, assertions } } = JSON.parse(localStorage.getItem('state'));
    const result = 3;
    return (
      <div className="main-content">
        <div>
          <Header score={ score } />
        </div>

        <div className="container-result">
          <p data-testid="feedback-text">
            { assertions >= result ? 'Mandou bem!' : 'Podia ser melhor...'}
          </p>
          { this.feedBackTable(score, assertions) }
        </div>

        <div className="box-buttons-feed">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
        </div>
        <img id="trybe-img" src="https://static.wixstatic.com/media/4c2984_e8ba75672946447b9c0718f98d806496~mv2.png" alt="logo-trybe"></img>
      </div>
    );
  }
}

export default Feedback;
