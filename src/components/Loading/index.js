import React from 'react';

import LoadingOverlay from 'react-loading-overlay';
import LoadingIcon from '~/assets/loading.svg';
import { Spinner } from './styles';

const Loading = (isActive, msg) => {
  return (
    <LoadingOverlay active={isActive} spinner text="Loading ...">
      <p>{msg}</p>
    </LoadingOverlay>
  );
};
export default Loading;
