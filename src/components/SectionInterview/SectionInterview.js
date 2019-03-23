import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';


import css from './SectionInterview.css';


const SectionInterview = props => {
	const { rootClassName, className } = props;
  	const classes = classNames(rootClassName || css.root, className);
	return (
		<div className={classes}>
  			<div className ={css.title}>
  				<FormattedMessage id="SectionInterview.title" />
  			</div>
        <div className={css.container}>
          <div className={css.image} />
          <div className={css.text}>
            <div className={css.textTitle}> Host Title Name </div>
            <div className={css.quoteBox}>
              <span className={css.leftQuote}>&ldquo;</span>
              <div className={css.quote}> 
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
              </div>
              <span className={css.rightQuote}>&rdquo;</span>
            </div>
            <div className={css.buttonWrapper}>
              <NamedLink
                name="SearchPage"
                to={{
                   search:
                      's?address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
                }}
                className={css.readButton}
              >
        
              <FormattedMessage id="SectionHero.browseButton" />
              </NamedLink>
              <NamedLink
                name="SearchPage"
                to={{
                  search:
                    's?address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
                }}
                className={css.linkButton}
              >
        
          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
            </div>
        </div>
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