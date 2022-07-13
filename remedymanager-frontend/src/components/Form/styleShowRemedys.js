import styled from 'styled-components';

export const StyledShowRemedy = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  height: 85vh;
  overflow-y: auto;

  form {
    --dark-blue: #363f5f; /*atribuição de variáveis */
    --green: #49aa26;
    --white: #fff;
    --light-green: #3dd705;
    --red: #e92929;
    --gray: #b3b5bb;
  }

  button {
    width: 7rem;
    border: none;
    color: var(--white);
    background: var(--green);
    padding: 0.7rem 0;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 1rem;
    align-self: center;

    &.outlined {
      background: #fff;
      border: 1px solid #835afd;
      color: #835afd;
    }

    &.outlined:hover {
      color: var(--white);
    }
  }

  button:hover {
    background: var(--light-green);
  }

  .sr-only {
    display: flex;
    flex-flow: column;

    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Form Search ============================== */
  #form-search {
    max-width: 700px;
    margin-top: 2rem;
    padding: 1rem;

    display: grid;
    grid-auto-flow: row;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    gap: 1rem;
    border-left: 5px solid rgba(0, 0, 0, 0.19);

    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input,
  select {
    border: none;
    border-radius: 0.2rem;
    padding: 0.8rem;
    width: 100%;
    flex-grow: 1;
    font-size: 1rem;
  }

  .input-group {
    display: grid;
    grid-template-columns: 2fr 5fr 1fr;
    gap: 2rem;
  }

  .input-group .help {
    opacity: 0.4;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    align-content: center;
  }

  /* Form Card ============================== */
  #form-card {
    margin: 1rem 0 2rem 0;
    overflow: auto;
    display: flex;
    flex-flow: row wrap;
    gap: 2rem;
    padding: 1rem 2rem 2rem 0rem;

    .info-group {
      border-left: 5px solid rgba(0, 0, 0, 0.19);

      box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2);
      padding: 1rem;
      width: 700px;
    }

    .one {
      display: grid;
      grid-template-columns: 4fr 2fr;
      gap: 2rem;
      align-items: center;

      fieldset {
        border-radius: 0.313rem;
        border: 2px solid var(--gray);
        text-align: center;

        padding: 0.33rem 0.8rem;

        span {
          color: black;
        }

        legend {
          display: flex;
        }
      }
    }

    .two {
      display: grid;
      grid-template-columns: 1.5fr 0.5fr 4fr 1fr 5fr;
      gap: 1rem;
      align-items: center;

      fieldset {
        border: none;
        text-align: center;

        padding: 0.33rem 0.8rem;
        margin-top: 1rem;

        span {
          color: black;
        }
      }
    }

    .three {
      display: grid;
      grid-template-columns: 1fr 3fr 5fr;
      gap: 1rem;

      fieldset {
        display: flex;
        flex-flow: column;
        border: none;

        padding: 0.33rem 0.8rem;
        margin-top: 1rem;

        span {
          color: black;
        }
      }

      fieldset:last-child {
        height: 7rem;
        border: 2px solid var(--gray);
        border-left: none;
        border-right: none;
        overflow: auto;
        background: #e8e8f3;

        display: flex;
        flex-flow: column wrap;
        align-self: flex-start;

        .show-reacts {
          list-style: circle;
          margin-left: 1rem;
          color: black;
        }
      }

      fieldset:first-child {
        button {
          width: 3rem;
          border: 2px solid var(--gray);
          background: #e8e8f3;
          padding: 0.2rem 0;
          border-radius: 0.25rem;
          cursor: pointer;
          margin-top: 1rem;
          align-self: flex-start;
        }

        button:hover {
          filter: brightness(0.9);
        }
      }

      fieldset:nth-child(2n) {
        text-align: center;
      }
    }

    .loading {
      width: 700px;
      margin-top: 2rem;
      padding: 1rem;

      display: flex;
      justify-content: center;
    }

    .lds-facebook {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }

    .lds-facebook div {
      display: inline-block;
      position: absolute;
      left: 8px;
      width: 16px;
      background: var(--gray);
      animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }

    .lds-facebook div:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }

    .lds-facebook div:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }

    .lds-facebook div:nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }

    @keyframes lds-facebook {
      0% {
        top: 8px;
        height: 64px;
      }
      50%,
      100% {
        top: 24px;
        height: 32px;
      }
    }
  }
`;
