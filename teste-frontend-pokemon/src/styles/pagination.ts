import styled from 'styled-components';

export const StyledPagination = styled.div`
  .pagination-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 14rem;
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
  }
`;
