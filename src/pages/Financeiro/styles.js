import styled, { css } from 'styled-components';
import { darken } from 'polished';

import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  fieldset {
    display: flex;
    flex-direction: column;

    cursor: pointer;
    border: 1px dashed #ddd;
    border-radius: 4px;
    height: 120px;
    width: 120px;
    color: #fff;

    transition: height 0.2s ease;

    label {
      &:hover {
        opacity: 0.7;
      }

      img {
        height: 120px;
        width: 120px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.3);
        background: #eee;
      }

      input {
        display: none;
      }
    }
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
      display: flex;
      align-self: center;
      align-items: center;
      margin-bottom: 30px;

      > button {
        border: 0;
        background: none;
      }
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
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
`;

export const ValorInput = styled.div`
  margin-bottom: 0.2rem;
  position: relative;
  width: 100%;

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
`;

export const Logo = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  label {
    cursor: pointer;
    border: 1px dashed #ddd;
    border-radius: 4px;
    height: 120px;
    width: 120px;
    color: #fff;
    transition: height 0.2s ease;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 360px;
  padding: 5px 15px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  h2 {
    color: #fff;
    align-self: flex-start;
    font-weight: bold;
    font-size: 25px;
  }

  span {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    margin-top: 10px;
  }
`;
