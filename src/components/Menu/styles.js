import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  display: flex;
  padding: 4px;
  align-items: center;
  justify-content: center;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

  }
`;

export const Time = styled.li`
  display: flex;
  border-radius: 4px;
  background: #fff;
  padding: 0px;
  flex-direction: row;
  align-items: center;

  &:hover a {
      opacity: 0.4;
      transform: translateY(-5px);
      transition: all 0.2s;
    }
`;
