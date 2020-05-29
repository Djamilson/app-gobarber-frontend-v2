import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

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
        color: #ff0000;
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

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
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
    div {
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
  }

  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: backgroud 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const ImagemDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const Avatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
  border: 3px dashed ${props => props.color};
  border-radius: 50%;

  label {
    cursor: pointer;
    transition: height 0.2s ease;
    &:hover {
      opacity: 0.7;
    }

    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }

    input {
      display: none;
    }
  }
`;

export const ContaineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.serven};
  font-weight: bold;
`;
