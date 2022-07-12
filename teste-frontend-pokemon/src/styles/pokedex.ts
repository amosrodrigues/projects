import styled from 'styled-components';

export const StyledPokedex = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;

  .text-center {
    margin: 4rem 0;
    font-size: 4rem;
    color: #263238;
  }

  .pokedex-header {
    display: flex;
    padding: 0.625rem;
    justify-content: space-between;
    align-items: center;
  }

  .pokedex-grid {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: repeat(2, 1fr);
    width: min(90vw, 1000px);

    @media (max-width: 724px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
