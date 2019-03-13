import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';


import css from './SectionInterview.css';


const SectionInterview = props => {
	const { rootClassName, className } = props;
  	const classes = classNames(rootClassName || css.root, className);
	return (
		<div className={classes}>
  			<div className ={css.title}>
  				<FormattedMessage id="SectionInterview.title" />
  			</div>
  		</div>
	);
};

SectionInterview.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionInterview.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionInterview;