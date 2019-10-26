import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }

    &:hover a {
      opacity: 0.4;
      transform: translateY(-5px);
      transition: all 0.2s;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  padding-right: 20px;
  border-right: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  &:hover div {
    opacity: 0.4;
    transform: translateY(-5px);
    transition: all 0.2s;
  }

  img {
    height: 36px;
    width: 36px;
    border-radius: 50%;
  }
`;

export const Badge = styled.button`
  background: none;
  border-left: 1px solid #eee;
  margin-left: 20px;
  border: 0;
  position: relative;
  right: 0;
  top: 0;
`;
