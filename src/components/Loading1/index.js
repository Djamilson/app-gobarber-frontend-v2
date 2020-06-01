import React from 'react';
import PropTypes from 'prop-types';

import { StyledLoader } from './styles';

export default function Loader1({ isActive }) {
  return (
    <StyledLoader
      active={isActive}
      classNamePrefix="MyLoader_"
      spinner
      text="Carregando ..."
    />
  );
}

Loader1.propTypes = {
  isActive: PropTypes.bool.isRequired,
  children: PropTypes.string,
};
