import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font: 400 1rem 'DM Sans', sans-serif;
    color: #333;
    background-color: #F0F2F5;
    -webkit-font-smoothing: antialiased;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  input, button, textarea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  .title {
    font: 700 1.875rem 'Poppins', sans-serif;
    color: #333;
    -webkit-font-smoothing: auto;
  }

  .container {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }

  .grid {
    display: grid;
    gap: 2rem;
  }

  .section {
    height: 100vh;
    width: 100vw;
    padding: calc(5rem + 4.5rem) 0;
  }
`;
