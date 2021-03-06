import styled from 'styled-components';
import LoadingOverlay from 'react-loading-overlay';

export const StyledLoader = styled(LoadingOverlay)`
  position: absolute;
  width: 90%;
  height: 100%;
  margin: 0 40px;
  border-radius: 10px;

  overflow: scroll;

  .MyLoader_overlay {
    background: rgba(0, 0, 0, 0.1);
  }

  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`;

export const Text = styled.p`
  position: relative;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  text-align: center;

  margin-top: 20px;
  margin-right: 150px;
  margin: 20px;
`;
