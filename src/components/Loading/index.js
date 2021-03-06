import React from 'react';
import PropTypes from 'prop-types';

import { StyledLoader, Text } from './styles';

export default function Loader({ isActive, children }) {
  return (
    <StyledLoader
      active={isActive}
      classNamePrefix="MyLoader_"
      spinner
      text="Loading ..."
    >
      <Text>{children}</Text>
    </StyledLoader>
  );
}

Loader.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.string,
};
