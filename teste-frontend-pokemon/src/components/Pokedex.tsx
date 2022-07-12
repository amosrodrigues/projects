import { useEffect, useRef, useState } from 'react';
import { getPokemons, getPokemonInfo } from '../api/api';
import { StyledPokedex } from '../styles/pokedex';
import Loading from './loading';
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
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);

  // const myRef = useRef<HTMLDivElement>(null);

  const itensPerPage = 20;

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    }),
  );

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(itensPerPage, itensPerPage * pageNum);

      const promises = data.results.map(async (pokemon: InfoPokemon) => {
        return await getPokemonInfo(pokemon.url);
      });

      const results = await Promise.all(promises);

      const all = Array.from(new Set([...pokemons, ...results]));

      setPokemons([...all]);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    if (pageNum <= totalPages) {
      fetchPokemons();
    }
  }, [pageNum]);

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(lastElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(lastElement);
      }
    };
  }, [lastElement]);

  return (
    <StyledPokedex>
      <div className="pokedex-grid">
        {pokemons.length > 0 &&
          pokemons.map((pokemon, index) => {
            return index === pokemons.length - 1 &&
              !loading &&
              pageNum <= totalPages ? (
              <div key={pokemon.id} ref={setLastElement}>
                <Pokemon pokemon={pokemon} />
              </div>
            ) : (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            );
          })}
      </div>

      {loading && <Loading />}
      {pageNum - 1 === totalPages && <p className="text-center">♥</p>}
    </StyledPokedex>
  );
}
