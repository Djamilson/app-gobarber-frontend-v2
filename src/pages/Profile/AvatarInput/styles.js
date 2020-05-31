import styled from 'styled-components';
import { colors } from '~/styles';
export const Container = styled.div`
  section {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

export const Item = styled.div`
  flex: 1;
  margin: 180px;
  padding: 0 10px;
  text-align: center;
  font-size: 1.5em;
`;

export const ItemAvatar = styled.div`
  left: 110px;
  span {
    label {
      width: 160px;
      height: 160px;
      border: 3px dashed ${props => props.color};
      border-radius: 50%;

      cursor: pointer;
      transition: height 0.2s ease;
      &:hover {
        opacity: 0.7;
      }

      img {
        width: 160px;
        height: 155px;
        border-radius: 50%;
      }

      input {
        display: none;
      }
    }
  }
`;

export const ContaineIcon = styled.p`
  margin-top: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.serven};
  font-weight: bold;
`;
