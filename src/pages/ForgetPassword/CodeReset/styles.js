import styled from 'styled-components';
import { darken } from 'polished';

export const ContentButtons = styled.div`
  margin-top: 20px;
  > span {
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    flex-direction: row;
    display: flex;
    justify-content: space-around;

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  button {
    margin: 5px 0 0;
    width: 100%;
    height: 44px;
    background: #49326b;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backgroud 0.2s;

    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }
`;
