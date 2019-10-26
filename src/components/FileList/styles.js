import styled from 'styled-components';

export const ContainerList = styled.ul`
  margin-top: 20px;

  width: 100%;
  max-width: 600px;
  margin-top: 30px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #444;
    border-bottom: 1px solid #c3c3c3;

    & + li {
      margin-top: 15px;
    }

    div {
      padding: 2px;
      button {
        border: 0;
        background: transparent;

        margin-left: 5px;
        cursor: pointer;
      }
      button:hover {
        opacity: 0.8;

        background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
        border-radius: 3px;

        color: white;
        box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
        border-radius: 4px;
      }
    }
  }
`;

export const FileHeader = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  background: #c3c3c3;
  border-radius: 4px;
`;

export const HeaderFileInfoPreview = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 1px;

  font-size: 14px;
  color: #fff;
  text-align: center;

  font-weight: bold;
  min-width: 10px;
`;

export const HeaderFileInDataPg = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  padding: 1px;

  font-size: 14px;
  color: #fff;
  text-align: center;

  font-weight: bold;
  min-width: 100px;
`;

export const HeaderFileInfoMesRef = styled.div`
  display: flex;
  align-items: center;

  margin-right: 10px;
  padding: 1px;

  font-size: 14px;
  color: #fff;
  text-align: center;

  font-weight: bold;
  min-width: 20px;
`;

export const HeaderFileInfoValor = styled.div`
  display: flex;
  align-items: center;

  margin-right: 10px;
  padding: 1px;

  font-size: 14px;
  color: #fff;
  text-align: center;

  font-weight: bold;
  min-width: 20px;
`;

export const HeaderFileInfoMesAcao = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  padding: 1px;

  font-size: 14px;
  color: #fff;
  text-align: center;
  font-weight: bold;
  min-width: 20px;
`;

export const FileInfoPg = styled.div`
  display: flex;
  align-items: center;
  margin-left: -10px;
  min-width: 160px;
  padding: 1px;
  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
`;

export const FileInfoMesRef = styled.div`
  display: flex;
  align-items: center;
  min-width: 70px;
  margin-left: -5px;
  margin-right: 80px;

  div {
    display: flex;
    flex-direction: column;

    strong {
      font-size: 14px;
      color: #000;
      margin-top: 5px;
    }
  }
`;

export const FileInfoValor = styled.div`
  display: flex;
  align-items: center;
  margin-left: -50px;
  min-width: 100px;

  padding: 1px;

  div {
    display: flex;
    flex-direction: column;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
  }
`;

export const FileInfoAcao = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    span {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
      button:hover {
        opacity: 0.8;

        height: 24px;
        background: #7159c1;
        border-radius: 4px;
        font-size: 13px;
        padding: 0 10px;
        margin-top: 5px;
        color: #fff;
        font-weight: bold;
        border: 0;
        cursor: pointer;
      }
    }
  }
`;

export const Preview = styled.div`
  width: 36px;
  height: 36px;

  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;
