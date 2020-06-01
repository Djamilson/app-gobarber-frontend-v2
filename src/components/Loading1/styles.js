import styled from 'styled-components';
import LoadingOverlay from 'react-loading-overlay';

export const StyledLoader = styled(LoadingOverlay)`
  width: 100%;
  height: 160px;
  border-radius: 10px;
  text-align: center;

  .MyLoader_overlay {
    background: rgba(0, 0, 0, 0.1);
  }

  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`;
