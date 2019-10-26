import React from 'react';
import PropTypes from 'prop-types';

import { Content } from './styles';

const Checkbox = ({ type = 'checkbox', value, name, onChange, disabled }) => (
  <Content>
    <input
      type={type}
      name={name}
      defaultChecked={value}
      disabled={Boolean(disabled) && name === 'role_administrador'}
      onChange={onChange}
    />
    <span />
  </Content>
);

Checkbox.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
