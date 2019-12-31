import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);
  border-radius: 8px;
  border: solid 1px #fff;

  padding: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;

  span {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    padding: 10px;
    margin-top: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      margin-bottom: 0.2rem;
      position: relative;
      color: #fff;
      font-weight: bold;
      padding-bottom: 2px;
    }

    div {
      margin-bottom: 0.2rem;
      position: relative;

      span {
        font-size: 15px;
        color: #fff;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        border: none;
        outline: 0;
        padding-left: 45px;

        background: rgba(0, 0, 0, 0.1);

        border-radius: 4px;
        height: 44px;
        color: #fff;
        margin: 0 0 10px;

        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
      }

      input + label {
        position: absolute;
        top: 0;
        bottom: 0;
        line-height: 3.8;

        left: 15px;
      }

      label {
        position: absolute;
        top: 0;
        bottom: 0;
        line-height: 3.8;

        left: 15px;
      }
    }

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
      height: 44px;
      background: #3b9eff;
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
  }
`;
