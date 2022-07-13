import styled from 'styled-components';

export const StyledTables = styled.div`
  display: flex;
  color: #363f5f;

  .container {
    padding-top: 10rem;
    display: flex;
    flex-flow: column;

    position: relative;
    z-index: 100;
    top: -2.78rem;
    width: 100%;
    height: 100%;

    .nav {
      display: flex;
      font-size: 1.3rem;
      cursor: pointer;
      margin-left: -1.5rem;
      color: #e1e5eb;

      span {
        padding: 0.5rem 1rem;
        border: 1px solid #e1e5eb;
        border-radius: 1rem 1rem 0 0;
        z-index: 0;

        float: left;
        position: relative;

        background: #363f5f;
      }

      & .selected {
        background: #f0f2f5;
        color: #363f5f;
        z-index: 1;
      }
    }
  }
`;
