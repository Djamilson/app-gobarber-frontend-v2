import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #fff;
      align-self: flex-start;
      margin: 0 0 0px;
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

export const Content = styled.div`
  max-width: 600px;
  margin: 50px auto;

  display: flex;
  flex-direction: column;
  header {
    display: flex;
    align-self: center;
    align-items: center;
  }

  strong {
    color: #fff;
    font-size: 18px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  justify-content: center;
  align-items: center;

  width: 85px;
  height: 85px;
  font-size: 48px;
  line-height: 65px;
  background-color: #1385e5;
  text-align: center;

  strong {
    display: block;
    color: #999;
    font-size: 19px;
    font-weight: normal;
  }

  button {
    background: none;
    border-left: 1px solid #eee;
    margin-left: 6px;
    border: 0;
    position: relative;
    right: 0;
    top: 0;

    transition: backgroud 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
      border-radius: 50%;
    }
  }
`;
