import styled from 'styled-components';

export const StyledHome = styled.div`
  display: flex;
  flex-flow: column;

  #add-tasks {
    display: flex;
    justify-content: flex-end;
    align-self: center;
    width: 60%;
    margin: -5.2rem 0 0;

    .button-new {
      height: 2rem;
      width: 11rem;
      border-radius: 0.25rem;
      font-weight: 500;
      background: #49aa26;
      color: #fff;
      font-size: 1.2rem;
      margin-bottom: 1rem;

      display: flex;
      justify-content: space-around;
      align-items: center;

      cursor: pointer;
      border: 0;
      transition: 0.2s;

      &:not(:disabled):hover {
        filter: brightness(0.9);
      }

      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.313rem;
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
