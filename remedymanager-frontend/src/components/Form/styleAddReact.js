import styled from 'styled-components';

export const StyledAddReact = styled.div`
  margin-top: -1.5rem;

  form {
    --dark-blue: #363f5f; /*atribuição de variáveis */
    --green: #49aa26;
    --white: #fff;
    --light-green: #3dd705;
    --red: #e92929;
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

  .button.new {
    display: inline-block;
    margin-bottom: 0.8rem;
  }

  .button.cancel {
    color: var(--red);
    border: 2px solid var(--red);
    border-radius: 0.25rem;
    width: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 0.6rem 0;
    opacity: 0.6;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .button.cancel:hover {
    opacity: 1;
  }

  .error {
    color: var(--red);
    position: absolute;
    top: 14.5rem;
    left: 14rem;
    font-size: 1.2rem;
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

  /* Form ============================== */
  #form {
    max-width: 800px;
    margin-top: 3rem;
    padding: 1rem;

    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    align-content: center;
    gap: 1rem;
    border-left: 5px solid rgba(237, 86, 86, 0.3);

    box-shadow: 0 4px 8px 0px rgba(237, 86, 86, 0.4);
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input {
    border: none;
    border-radius: 0.2rem;
    padding: 0.8rem;
    width: 100%;
    flex-grow: 1;
    font-size: 1rem;
  }

  .input-group {
    display: flex;
    flex-flow: column;
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
`;
