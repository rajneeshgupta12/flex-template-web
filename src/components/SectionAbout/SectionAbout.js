import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';


import css from './SectionAbout.css';


const SectionAbout = props => {
	const { rootClassName, className } = props;
  	const classes = classNames(rootClassName || css.root, className);
	return (
		<div className={classes}>
  			<div className ={css.title}>
  				<FormattedMessage id="SectionAbout.title" />
  			</div>
  		</div>
	);
};

SectionAbout.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionAbout.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionAbout;