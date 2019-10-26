import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 50px;

  hr {
    border: 0;
    height: 1px;
    background: #fff;
    width: 100%;
  }

  strong {
    color: #fff;
    font-size: 24px;
    margin: 0 15px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const Time = styled.li`
  display: flex;
  border-radius: 4px;
  background: #fff;
  padding: 15px;
  flex-direction: row;
  align-items: center;

  strong {
    display: block;
    color: ${props => (props.available ? '#999' : '#7159c1')};
    font-size: 18px;
    font-weight: normal;
  }

  button {
    display: block;
    border: 0;
    background: none;
  }

  &:hover button {
    opacity: 0.4;
    transform: translateY(-5px);
    transition: all 0.2s;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  h2 {
    color: #fff;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
    font-size: 18px;
  }
`;
