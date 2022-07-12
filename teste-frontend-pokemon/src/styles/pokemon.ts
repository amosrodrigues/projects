import styled from 'styled-components';

export const StyledPokemon = styled.div`
  .pokemon-card {
    display: flex;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    transition: 0.5s;
    background: #f5f5f5;
    height: 6.8rem;

    :hover {
      filter: brightness(1.2);
      transform: scale(1.03);
      cursor: pointer;
    }

    .pokemon-image-container {
      padding: 0px 5px;

      .pokemon-image {
        height: 100%;
        width: 100%;
        margin-right: 0.625rem;
        object-fit: cover;
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 10px 10px 0px;
      flex: 1;
      color: #263238;
    }

    .card-body .card-top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      h3 {
        text-transform: capitalize;
      }

      span {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        border: 2px solid #f5f5f5;
        border-radius: 50%;
        padding: 1.2rem;

        font-weight: 500;
        box-shadow: 2px 0px 2px 2px rgba(0, 0, 0, 0.25);
      }
    }

    .card-body .card-bottom {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      .pokemon-type {
        display: flex;
      }

      .pokemon-type .pokemon-type-text {
        margin-right: 10px;
        text-transform: capitalize;
      }
    }
  }
`;
