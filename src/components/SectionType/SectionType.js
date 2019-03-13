import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';


import css from './SectionType.css';


const SectionType = props => {
	const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
	return (
		<div className={classes}>
  		<div className ={css.title}>
  			<FormattedMessage id="SectionType.title" />
  		</div>
    </div>
	);
};

SectionType.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionType.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionType;