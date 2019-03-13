import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import css from './SectionHost.css';


const SectionHost= props => {
	const { rootClassName, className } = props;
  	const classes = classNames(rootClassName || css.root, className);
	return (
		<div className={classes}>
  			<div className ={css.title}>
  				<FormattedMessage id="SectionHost.title" />
  			</div>
  		</div>
	);
};

SectionHost.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHost.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHost;