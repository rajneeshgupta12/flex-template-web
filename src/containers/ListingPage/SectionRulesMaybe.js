import React from 'react';
import { shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import css from './SectionRulesMaybe.css';

const SectionRulesMaybe = props => {
  const getCancellationPolicy = (cancellationPolicy) => {
    switch (cancellationPolicy) {
      case 'free':
        return <p> <strong> Free Policy </strong> If cancel anytime before the check in day and time, the guest will receive a full refund (minus service fee).</p>
      case 'flexible':
        return <p> <strong> Flexible Policy </strong>  If cancel at least 7 days before the check in day and time, the guest will receive a full refund (minus service fee).</p>
      case 'moderate':
        return <p>  <strong> Moderate Policy </strong> If cancel at least 15 days before the check in day and time, the guest will receive a full refund (minus service fee). Cancelation between 7 to 15 days before the check in day and time, the guest will receive a 50% refund (minus service fee).</p>
      case 'strict':
        return <p> <strong> Strict Policy  </strong> There will be no refund after the booking is confirmed.</p>
      default:
        return <p></p>
    }
  }
  const { className, rootClassName, publicData } = props;
  const classes = classNames(rootClassName || css.root, className);
  return publicData.glamping_rules ? (
    <div className={classes}>
      <h2 className={css.title}>
        <FormattedMessage id="ListingPage.rulesTitle" />
      </h2>
      <p className={css.rules}>{publicData.glamping_rules}</p>
      <br />
      <div>
        <h2 className={css.title}>
          <FormattedMessage id="ListingPage.cancellationPolicy" />
        </h2>
        {getCancellationPolicy(publicData.cancellation_or_refund)}
      </div>
    </div>
  ) : null;
};

SectionRulesMaybe.defaultProps = { className: null, rootClassName: null };

SectionRulesMaybe.propTypes = {
  className: string,
  rootClassName: string,
  publicData: shape({
    rules: string,
  }).isRequired,
};

export default SectionRulesMaybe;
