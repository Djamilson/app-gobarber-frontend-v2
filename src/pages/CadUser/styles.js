import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;

  table {
    margin-top: 50px;
    border-collapse: collapse;
    background: rgba(255, 255, 255, 0.4);

    thead th {
      font-weight: normal;
      white-space: nowrap;
      color: #fff;
      background: #7955ad;
      padding: 0.75rem;
      font-size: 18px;
      letter-spacing: 1.11px;

      &:first-child {
        text-align: center;
      }
      &:last-child {
        text-align: center;
      }
    }

    tbody td {
      color: #fff;
      font-size: 15px;
      border-top: 1px solid #282828;
      padding: 0 10px;
      line-height: 40px;

      &:first-child {
        text-align: center;
        width: 10%;
      }
      &:last-child {
        text-align: center;
        width: 30%;
      }
    }
   /* tbody tr:hover td {
      opacity: 0.6;
      background: ${darken(0.03, '#3b9eff')};
    }*/

    tr:nth-child(even) {
      background-color: #ab59c1;
    }

    button {
      margin: 5px;
      background: #7159c1;
      font-weight: normal;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      transition: backgroud 0.2s;
      padding: 10px;

      &:hover {
        opacity: 0.6;
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }

  button:disabled {
    &:hover {
      background: ${darken(0.08, '#f64c75')};
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
  display: flex;
  flex-direction: column;

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
