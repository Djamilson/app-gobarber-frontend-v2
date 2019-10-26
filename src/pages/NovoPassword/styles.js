import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  padding: 35px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: solid 1px #fff;
`;

export const Content = styled.head`
  display: flex;
  flex-direction: column;

  span {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    padding: 10px;
    margin-top: 30px;
  }
`;
