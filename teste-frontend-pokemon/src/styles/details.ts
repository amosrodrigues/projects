import styled from 'styled-components';

export const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  font-size: 20px;
  font-weight: 500;
  color: #263238;

  button {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 2px solid #f5f5f5;
    border-radius: 50%;
    background: transparent;
    margin: 1rem 0;

    text-decoration: none;
    box-shadow: 0 0 3px gray;
    font-size: 20px;
    font-weight: bold;
    transition: 0.5s;

    :hover {
      background: #555777;
      transform: scale(1.03);
    }
  }

  fieldset {
    border: none;
    border-top: 1px #263238 solid;
    text-align: center;
    margin: 2rem;
    padding: 1rem 2rem;

    legend {
      padding: 0 0.8rem;
    }
  }

  .pokemon-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    transition: 0.5s;
    background: #f5f5f5;
    height: 61.8vh;
    width: min(89vw, 500px);
    margin-top: 4rem;

    @media (max-width: 400px) {
      margin-top: 3rem;
      padding-top: 1.5rem;
      height: 74vh;
    }

    :hover {
      filter: brightness(1.2);
      transform: scale(1.03);
      cursor: pointer;
    }

    > span {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: flex-end;

      border: 2px solid #f5f5f5;
      border-radius: 50%;
      padding: 1.2rem;
      margin: 1rem;

      font-weight: 500;
      box-shadow: 2px 0px 2px 2px rgba(0, 0, 0, 0.25);
    }

    .pokemon-image-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-top: -7rem;

      .pokemon-image {
        object-fit: cover;
        padding: 5px;
        background-color: #e1e5eb;
        clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 10px 10px 0px;
      flex: 1;
      color: #263238;

      .card-top {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        h3 {
          text-transform: capitalize;
        }
      }

      .card-bottom .pokemon-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      .card-bottom .pokemon-info.ability {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }
    }
  }
`;
