import styled from 'styled-components';

export const StyledTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  table {
    --dark-blue: #363f5f; /*atribuição de variáveis */
    --dark-green: #2d4a22;
    --green: #49aa26;
    --white: #fff;
    --light-green: #3dd705;
    --red: #e92929;
  }

  #data-table {
    width: 60%;
    border-spacing: 0 0.5rem; /* eixos X e Y */
    color: #969cb3;
    font-size: 1.025rem;
    margin-bottom: 4rem;
  }

  .table-row-selected {
    background: var(--dark-blue);
  }

  table thead tr th:first-child,
  table tbody tr td:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
    width: 40%;
  }

  table thead tr th:not(:first-child),
  table tbody tr td:not(:first-child) {
    width: 10%;
    padding: 1rem 1rem;
  }

  table thead tr th:last-child,
  table tbody tr td:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }

  table thead th {
    background: var(--white);
    font-weight: normal;
    padding: 1rem 2rem;
    text-align: left;
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
    display: flex;
    justify-content: space-around;

    button {
      border-radius: 0.313rem;
      background: #fff;
      padding: 0.25rem;

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
