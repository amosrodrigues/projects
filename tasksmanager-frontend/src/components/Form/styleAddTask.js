import styled from 'styled-components';

export const StyledAddTask = styled.div`
  form {
    --dark-blue: #363f5f; /*atribuição de variáveis */
    --green: #49aa26;
    --white: #fff;
    --light-green: #3dd705;
    --red: #e92929;
  }

  /* Links & Buttons ============================== */
  a {
    color: var(--green);
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    color: var(--light-green);
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

  button {
    width: 100%;
    height: 50px;
    border: none;
    color: var(--white);
    background: var(--green);
    padding: 0;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-top: 0.8rem;
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
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    top: 2rem;
    right: 2.5rem;
    font-size: 1.2rem;
  }

  /* Modal ============================== */
  .modal-overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    z-index: 999;
  }

  .modal-overlay.active {
    opacity: 1;
    visibility: visible;
  }

  .modal {
    background: #f0f2f5;
    padding: 2.4rem;
    position: relative;
    z-index: 1;
    /* width: min( 90vw, 600px ); equivale a: width: 90%; max-width: 500px; (moble) */
  }

  /* Form ============================== */
  #form {
    max-width: 500px;
  }

  #form h2 {
    margin-top: 0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
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

  .group {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 5rem;
  }

  .input-group {
    margin-top: 0.8rem;
  }

  .input-group .help {
    opacity: 0.4;
  }

  .input-group.actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-content: center;
  }

  .input-group.actions .button,
  .input-group.actions button {
    width: 48%;
  }
`;
