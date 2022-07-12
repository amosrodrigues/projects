import styled from 'styled-components';

export const StyledHeader = styled.div`
  width: min(90vw, 1000px);
  height: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: #263238;
  border-radius: 1.5rem 1.5rem 0 0;
  margin-top: 1rem;

  .header-image {
    width: 13rem;
  }
`;
