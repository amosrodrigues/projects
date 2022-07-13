import styled from 'styled-components';

export const StyledHeader = styled.div`
  .header {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    justify-content: center;

    background: #363f5f;
    padding: 4rem 0 10rem;
    width: 100%;
    height: 4.5rem;

    > a {
      position: absolute;
      left: 5rem;
    }

    .container-logo {
      display: flex;
      justify-content: space-between;
      gap: 6.5rem;
      position: relative;
      left: 5rem;
      bottom: -10rem;
    }

    .container-logo img {
      max-height: 200px;
      margin-top: 0.5rem;
      order: 0;
      border-radius: 0.4rem;
      box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .container-logo h2 {
      color: #f5f5f5;
      margin-top: 0.5rem;
      order: 1;
    }
  }
`;
