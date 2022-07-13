import styled from 'styled-components';

export const StyledTableMaker = styled.div`
  overflow-y: scroll;
  height: 60vh;
  padding-bottom: 2rem;

  table {
    --dark-blue: #363f5f; /*atribuição de variáveis */
    --dark-green: #2d4a22;
    --green: #49aa26;
    --white: #fff;
    --light-green: #3dd705;
    --red: #e92929;
  }

  #data-table {
    width: min(90vw, 800px);
    border-spacing: 0 0.5rem; /* eixos X e Y */
    color: var(--dark-blue);
    font-size: 1.025rem;
    margin-bottom: 2rem;
    border-left: 5px solid rgba(0, 0, 0, 0.19);
    box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2);
  }

  table thead tr th:first-child,
  table tbody tr td:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
    text-align: center;
  }

  table thead tr th:not(:first-child),
  table tbody tr td:not(:first-child) {
    width: 82%;
    padding: 0.2rem;
  }

  table thead tr th:last-child,
  table tbody tr td:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
    max-width: 0.5rem;
    padding: 0 0.5rem;
  }

  table thead th {
    background: var(--white);
    font-weight: normal;
    padding: 0.5rem;
    text-align: center;
  }

  table tbody tr {
    opacity: 1;
  }

  table tbody tr:hover {
    opacity: 0.7;
  }

  table tbody td {
    background: var(--white);
    padding: 1rem 2rem;
  }

  td .actions {
    margin: 0 1rem 0.5rem 1rem;

    button {
      border-radius: 0.313rem;
      background: #fff;
      padding: 0.5rem;

      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.313rem;
      transition: 0.2s;

      &:not(:disabled):hover {
        filter: brightness(0.9);
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  td.description {
    color: var(--dark-blue);
  }

  td.status1 {
    color: #12a454;
  }

  td.status2 {
    color: #000fbf;
  }

  td.status3 {
    color: #bf0000;
  }

  td.date {
    color: var(--dark-green);
  }

  th span.order {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    cursor: pointer;
    background: #fff;
    border-radius: 0.313rem;
    transition: 0.2s;
  }

  th span.order:hover {
    filter: brightness(0.9);
  }
`;
