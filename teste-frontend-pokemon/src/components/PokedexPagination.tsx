import { useEffect, useState } from 'react';
import { getPokemons, getPokemonInfo } from '../api/api';
import { StyledPokedex } from '../styles/pokedex';
import Loading from './loading';
import Pagination from './Pagination';
import Pokemon from './Pokemon';

type InfoPokemon = {
  name: string;
  url: string;
};

type PokemonType = {
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

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const itensPerPage = 10;

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon: InfoPokemon) => {
        return await getPokemonInfo(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleClickLeft = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleClickRight = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  return (
    <StyledPokedex>
      <div className="pokedex-header">
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          handleClickLeft={handleClickLeft}
          handleClickRight={handleClickRight}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="pokedex-grid">
          {pokemons.map((pokemon) => {
            return <Pokemon key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      )}
    </StyledPokedex>
  );
}
