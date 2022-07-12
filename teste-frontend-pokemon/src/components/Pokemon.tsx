import { useNavigate } from 'react-router-dom';
import { StyledPokemon } from '../styles/pokemon';

export interface PokemonData {
  pokemon: {
    id: number;
    name: string;
    types: {
      type: {
        name: string;
        url: string;
      };
    }[];
    sprites: {
      front_default: string;
    };
  };
}

export default function Pokemon({ pokemon }: PokemonData) {
  const navigate = useNavigate();

  const handleClick = (pokemon: string) => {
    localStorage.setItem('poke', JSON.stringify(pokemon));
    navigate(`/details/${pokemon}`);
  };

  return (
    <StyledPokemon>
      <div className="pokemon-card" onClick={() => handleClick(pokemon.name)}>
        <div className="pokemon-image-container">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-image"
          />
        </div>
        <div className="card-body">
          <div className="card-top">
            <h3>{pokemon.name}</h3>
            <span>{pokemon.id}</span>
          </div>
          <div className="card-bottom">
            <div className="pokemon-type">
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
          </div>
        </div>
      </div>
    </StyledPokemon>
  );
}
