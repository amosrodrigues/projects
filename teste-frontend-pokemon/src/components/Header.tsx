import { StyledHeader } from '../styles/header';

export default function Header() {
  const logoimg =
    'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png';
  return (
    <StyledHeader>
      <nav>
        <div>
          <img src={logoimg} alt="pokeapi-logo" className="header-image" />
        </div>
      </nav>
    </StyledHeader>
  );
}
