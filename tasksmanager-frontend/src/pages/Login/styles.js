import styled from 'styled-components';

export const StyledLogin = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #f5f5f5;

  .main-content {
    display: grid;
    justify-content: center;
    text-align: center;
    gap: 1rem;

    padding: 1.5rem;
    border-radius: 0.25rem;
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);

    .container-logo {
      margin-top: -8rem;

      > img {
        align-self: center;
        bottom: -10rem;
        border-radius: 0.4rem;
        max-height: 200px;
        margin-top: 0.5rem;
      }
    }

    .divider {
      background-color: #363f5f;
      height: 90%;
      width: 2px;
      align-self: center;
    }

    .container-login {
      display: flex;
      gap: 2rem;

      .login {
        z-index: 961;
        padding: 1.5rem;
        display: flex;
        flex-flow: column;
        text-align: center;
        color: #363f5f;

        align-items: center;
        max-width: 380px;
      }

      h2 {
        font-size: 1.3rem;
        margin: 0px 0 24px;
        font-family: 'Poppins', sans-serif;
      }

      form {
        input {
          height: 50px;
          border-radius: 8px;
          padding: 0 16px;
          margin-top: 16px;
          background: #fff;
          border: 1px solid #a8a8b3;
        }

        button {
          margin-top: 32px;
        }

        button,
        input {
          width: 100%;
        }
      }
    }
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }

  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;
