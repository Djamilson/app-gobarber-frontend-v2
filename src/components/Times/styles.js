import styled from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;
  }

  button {
    border: 0;
    background: none;
  }

  strong {
    color: #fff;
    font-size: 24px;
    margin: 0 15px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
    margin-top: 15px;
    width: 100%;
  }
`;

export const Badge = styled.header`
  max-width: 600px;
  margin: 0px auto;
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  border-radius: 4px;
  background: #ff8999;

  strong {
    color: #fff;
    font-size: 18px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    margin-top: auto 0px;
    padding: 4px;
  }
`;

export const Timediv = styled.li`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  justify-content: center;
  align-items: center;
  border: solid 4px #fff;

  width: 100%;
  height: 85px;
  font-size: 28px;
  line-height: 65px;
  background-color: #1385e5;
  text-align: center;

  span {
    width: 150px;
    margin-right: 100px;
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
      background: ${lighten(0.08, '#f64c75')};
      border-radius: 50%;
    }
  }
`;

export const Time = styled.li`
  padding: 6px;
  border-radius: 4px;
  background: #fff;

  strong {
    display: block;
    color: '#7159c1';
    font-size: 20px;
    font-weight: normal;
  }
  span {
    display: block;
    margin-top: 3px;
    color: '#999';
  }
`;

export const TimeE = styled.li`
  display: flex;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  justify-content: center;
  align-items: center;

  width: 100%;
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
      background: ${lighten(0.08, '#f64c75')};
      border-radius: 50%;
    }
  }
`;
