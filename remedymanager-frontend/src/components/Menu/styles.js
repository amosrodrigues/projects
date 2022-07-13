import styled from 'styled-components';

export const StyledMenu = styled.div`
  .menu {
    width: 15rem;
    height: 100vh;
    background: #363f5f;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .icons {
      width: 90%;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      font-size: 1.5rem;
      font-weight: 600;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0;
        text-align: center;
        width: 100%;
        border-radius: 0.313rem 0 0 0.313rem;
        border: 1px solid #e1e5eb;
        color: #e1e5eb;

        position: relative;
        transition: all 0.2s;

        &.selected {
          background: #f0f2f5;
          color: #363f5f;
        }

        .triangle-left {
          width: 0;
          height: 0;
          border-top: 40px solid transparent;
          border-right: 40px solid #f0f2f5;
          border-bottom: 40px solid transparent;

          left: 14.3rem;
          position: fixed;
        }
      }

      .card::before {
        content: ' ';

        width: 0.25rem;
        height: 0%;
        background-color: #e1e5eb;

        border-radius: 0.313rem 0 0 0.313rem;

        position: absolute;
        top: 0;
        left: -1px;

        transition: all 0.2s;
      }

      .card:hover::before {
        height: 100%;
      }
    }
  }
`;
