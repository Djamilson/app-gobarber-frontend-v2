import styled from 'styled-components';

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
  background: white;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  h3 {
    border-bottom: 1px solid #ccc;
    padding: 1rem;
    margin: 0;
  }
`;

export const ContentModal = styled.div`
  padding: 1.5rem 1rem;
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
    font-size: 1.5rem;
    line-height: 1;
    font-weight: bold;

    height: 40px;
    width: 120px;
    margin-left: 10px;
  }
`;
