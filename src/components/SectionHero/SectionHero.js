import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './SectionHero.css';

const SectionHero = props => {
  const { rootClassName, className, userName } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.heroContent}>
        <h1 className={css.heroMainTitle}>
          <FormattedMessage id={userName && userName.length > 0 ? "SectionHero.titleSignedIn" : "SectionHero.title"} values={{name: userName}}/>
        </h1>
        <h2 className={css.heroSubTitle}>
          <FormattedMessage id="SectionHero.subTitle" />
        </h2>

      </div>
      <div className={css.heroSearchBar} />
    </div>
  );
};

SectionHero.defaultProps = { rootClassName: null, className: null };

SectionHero.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHero;

/*
        <NamedLink
          name="SearchPage"
          to={{
            search:
              's?address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
          }}
          className={css.heroButton}
        >

          <FormattedMessage id="SectionHero.browseButton" />
        </NamedLink>
        */