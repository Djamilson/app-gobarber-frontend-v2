import styled from 'styled-components';
import { colors } from '~/styles';

export const Item = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ItemAvatar = styled.div`
  width: 160px;
  height: 160px;
  border: 3px dashed ${props => props.color};
  border-radius: 50%;
  top: 10px;
  label {
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
`;

export const ContaineIcon = styled.section`
  margin-top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.serven};
  font-weight: bold;
`;

export const Avatar = styled.div`
  height: 180px;

  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
