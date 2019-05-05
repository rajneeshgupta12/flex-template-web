import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';  
import css from './SectionHost.css';
import { Link } from 'react-router-dom'


const SectionHost = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
     
     
      <Link
        to={
          '/l/new'
      }
          className={css.hostButton}
      >

          <FormattedMessage id="SectionHost.hostButton" />
        </Link>
  		</div >
	);
};

SectionHost.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHost.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHost;

/*

 <div className={css.title}>
        <FormattedMessage id="SectionHost.title" />
      </div>



 <p className={css.info}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
  */