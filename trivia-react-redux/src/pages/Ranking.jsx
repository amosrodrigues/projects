import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <div className="main-ranking">
        <div className="header-ranking">
          <h1 data-testid="ranking-title">Ranking</h1>
        </div>

        <div className="ranking-box">
          {
            ranking.map((player, index) => (
              <div className="podium" key={ index }>
                <span>{ `${ index + 1 }º`}</span>
                <img
                  src={ player.picture }
                  alt={ player.name }
                />
                <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                <p data-testid={ `player-score-${index}` }>{ `${Number(player.score)} pts` }</p>
              </div>
            ))
          }
        </div>

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
        <img id="trybe-img" src="https://static.wixstatic.com/media/4c2984_e8ba75672946447b9c0718f98d806496~mv2.png" alt="logo-trybe"></img>
      </div>
    );
  }
}

export default Ranking;
