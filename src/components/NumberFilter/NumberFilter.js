import React from 'react';
import { bool } from 'prop-types';
import NumberFilterPlain from './NumberFilterPlain';
import NumberFilterPopup from './NumberFilterPopup';

const NumberFilter = props => {
  const { showAsPopup, ...rest } = props;
  return showAsPopup ? <NumberFilterPopup {...rest} /> : <NumberFilterPlain {...rest} />;
};

NumberFilter.defaultProps = {
  showAsPopup: false,
};

NumberFilter.propTypes = {
  showAsPopup: bool,
};

export default NumberFilter;
