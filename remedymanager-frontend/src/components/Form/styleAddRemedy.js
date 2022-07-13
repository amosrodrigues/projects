import styled from 'styled-components';

export const StyledAddRemedy = styled.div`
  margin-top: 3rem;
  display: flex;
  width: min(80vw, 800px);

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
    top: 14rem;
    left: 14rem;
    font-size: 1.2rem;
  }

  .sr-only {
    display: flex;
    flex-flow: column;

    padding: 0 1rem;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .one {
    display: grid;
    grid-template-columns: 4fr 2fr;
    gap: 2rem;
  }

  .two {
    display: grid;
    grid-template-columns: 2fr 1fr 2fr 3fr;
    gap: 2rem;
  }

  .three {
    display: grid;
    justify-content: space-between;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    padding: 0 0 1rem 0;
  }

  /* Form ============================== */
  #form-remedy {
    border-left: 5px solid rgba(0, 0, 0, 0.19);
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2);
  }

  #orm-remdey h2 {
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

  input {
    width: 100%;
    height: 40px;
    margin-bottom: 15px;
    padding: 0 10px;
  }

  button[type='submit'] {
    height: 40px;
    padding: 5px 20px;
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
    width: 94%;
    margin-bottom: 10px;
  }

  span.order {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
    padding: 10px;

    cursor: pointer;
    color: var(--dark-blue);
    border-radius: 0.313rem;
    border: 2px solid var(--light-green);
    transition: 0.2s;
  }

  span.order:hover {
    filter: brightness(0.9);
  }

  .options-reacts {
    display: flex;
    flex-flow: column;
    background: #fff;
    margin: 1rem;
    padding-top: 1rem;
    overflow-y: auto;
    border: 2px solid var(--light-green);

    .check-only {
      display: grid;
      grid-template-columns: 1fr 12fr;
    }

    input[type='checkbox'] {
      height: 1.5rem;
    }
  }
`;
