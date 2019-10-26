import styled from 'styled-components';
import { darken } from 'polished';

export const Front = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  justify-content: center;
  -ms-align-items: center;

  -webkit-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  -moz-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  -o-animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
  animation: react-confirm-alert-fadeIn 0.5s 0.2s forwards;
`;

export const Modall = styled.div`
  width: 500px;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  h3 {
    border-bottom: 1px solid #ccc;
    padding: 1.5rem 1rem;
    margin: 0;
  }
`;

export const ContentModal = styled.div`
  padding: 1.5rem 1rem;
  background: #fff;

  table {
    margin-top: 50px;
    border-collapse: collapse;

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

    tbody tr {
      &:first-child {
        background: ${darken(0.03, '#B98BD9')};
      }
    }

    tbody td {
      color: #fff;
      font-size: 15px;
      border-top: 1px solid #282828;
      padding: 0 10px;
      line-height: 40px;

      &:first-child {
        text-align: left;
        width: 10%;
      }
      &:last-child {
        text-align: center;
        width: 30%;
      }
    }

    tbody tr:hover td {
      opacity: 0.6;
      background: ${darken(0.03, '#3b9eff')};
    }

    tr:nth-child(even) {
      background-color: #ab59c1;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #ccc;
  background: #eee;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: center;

  button:hover {
    opacity: 0.8;
    background: #7159c1;
    color: #fff;
    font-weight: bold;
    border: 0;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: 0;
    background: #78f89f;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    line-height: 1;
    width: 120px;
    margin-left: 10px;
  }
`;
