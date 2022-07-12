import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPokemon } from '../api/api';
import Loading from '../components/loading';
import { StyledDetails } from '../styles/details';

type InfoPokemon = {
  name: string;
  weight: string;
  height: string;
  sprites: { front_default: string };
  types: [];
  id: string;
  abilities: [];
};

export default function Details() {
  const [pokemon, setPokemon] = useState<InfoPokemon>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getPokemonLocal = async () => {
    try {
      setLoading(true);
      const pokeName = JSON.parse(localStorage.getItem('poke') || '');
      const infoPokemon = await searchPokemon(pokeName);
      infoPokemon && setPokemon(infoPokemon);
      setLoading(false);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getPokemonLocal();
  }, []);

  return (
    <StyledDetails>
      {loading || !pokemon ? (
        <Loading />
      ) : (
        <div className="pokemon-card" onClick={() => navigate('/')}>
          <span>{pokemon.id}</span>
          <div className="pokemon-image-container">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>
          <div className="card-body">
            <div className="card-top">
              <h2>{pokemon.name}</h2>
            </div>

            <div className="card-bottom">
              <fieldset>
                <legend> Tipos </legend>
                <div className="pokemon-info">
                  {pokemon.types.map(
                    (type: { type: { name: string } }, index: number) => {
                      return (
                        <div key={index} className="pokemon-type-text">
                          {type.type.name}
                        </div>
                      );
                    },
                  )}
                </div>
              </fieldset>

              <fieldset>
                <legend> Peso / Altura</legend>
                <div className="pokemon-info">
                  <span> {pokemon.weight}kg</span>
                  <span> {pokemon.height}m</span>
                </div>
              </fieldset>

              <fieldset>
                <legend> Habilidades </legend>

                <div className="pokemon-info ability">
                  {pokemon.abilities.map(
                    ({ ability: { name } }, index: number) => {
                      return (
                        <div key={index} className="pokemon-ability-text">
                          {name}
                        </div>
                      );
                    },
                  )}
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      )}
    </StyledDetails>
  );
}
