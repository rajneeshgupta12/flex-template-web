import React from 'react';
import { bool, object, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import config from '../../config';
import { Button, FieldCheckboxGroup, ExternalLink, FieldRadioButton, FieldSelect, Form } from '../../components';
import { isStripeInvalidPostalCode } from '../../util/errors';
import * as validators from '../../util/validators';

import PayoutDetailsFormCompany from './PayoutDetailsFormCompany';
import PayoutDetailsFormIndividual from './PayoutDetailsFormIndividual';
import css from './PayoutDetailsForm.css';
import { Link } from 'react-router-dom';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

const PayoutDetailsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      ...arrayMutators,
    }}
    render={fieldRenderProps => {
      const {
        className,
        createStripeAccountError,
        disabled,
        handleSubmit,
        inProgress,
        intl,
        invalid,
        pristine,
        ready,
        submitButtonText,
        values,
      } = fieldRenderProps;

      const { country } = values;

      const usesOldAPI = config.stripe.useDeprecatedLegalEntityWithStripe;

      const accountType = usesOldAPI ? values.accountType : 'individual';

      const individualAccountLabel = intl.formatMessage({
        id: 'PayoutDetailsForm.individualAccount',
      });

      const companyAccountLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyAccount' });

      const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
      const countryPlaceholder = intl.formatMessage({
        id: 'PayoutDetailsForm.countryPlaceholder',
      });
      const countryRequired = validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.countryRequired',
        })
      );

      const classes = classNames(css.root, className, {
        [css.disabled]: disabled,
      });

      const submitInProgress = inProgress;
      const submitDisabled = pristine || invalid || disabled || submitInProgress;
      const showAsRequired = pristine;

      const showIndividual = country && accountType && accountType === 'individual';
      const showCompany = country && accountType && accountType === 'company';

      let error = null;

      if (isStripeInvalidPostalCode(createStripeAccountError)) {
        error = (
          <div className={css.error}>
            <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailedInvalidPostalCode" />
          </div>
        );
      } else if (createStripeAccountError) {
        error = (
          <div className={css.error}>
            <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailed" />
          </div>
        );
      }

      const stripeConnectedAccountTermsLink = (
        <ExternalLink href="https://stripe.com/connect-account/legal" className={css.termsLink}>
          <FormattedMessage id="PayoutDetailsForm.stripeConnectedAccountTermsLink" />
        </ExternalLink>
      );

      const options = [{ key: "accept_terms", label: 'I accept all the Terms and conditions' }]
      const stripeOption = [{ key: "accept_stripe_terms", label: "" }]
      return config.stripe.publishableKey ? (
        <Form className={classes} onSubmit={handleSubmit}>
          {usesOldAPI ? (
            <div className={css.sectionContainer}>
              <h3 className={css.subTitle}>
                <FormattedMessage id="PayoutDetailsForm.accountTypeTitle" />
              </h3>
              <div className={css.radioButtonRow}>
                <FieldRadioButton
                  id="individual"
                  name="accountType"
                  label={individualAccountLabel}
                  value="individual"
                  showAsRequired={showAsRequired}
                />
                <FieldRadioButton
                  id="company"
                  name="accountType"
                  label={companyAccountLabel}
                  value="company"
                  showAsRequired={showAsRequired}
                />
              </div>
            </div>
          ) : null}

          {accountType ? (
            <React.Fragment>
              <div className={css.sectionContainer}>
                <div>
                  <p>Account type</p>
                  <div>
                    <FieldRadioButton
                      name="account_type"
                      id="individual"
                      value="individual"
                      label="I’m an individual"
                      validate={validators.composeValidators(validators.required(validators.requiredSelectBox('required')))}
                    />
                    <FieldRadioButton
                      name="account_type"
                      id="company"
                      value="company"
                      label="I represent a company"
                      validate={validators.composeValidators(validators.required(validators.requiredSelectBox('required')))}
                    />
                  </div>
                </div>

                <h3 className={css.subTitle}>Country</h3>
                <FieldSelect
                  id="country"
                  name="country"
                  disabled={disabled}
                  className={css.selectCountry}
                  autoComplete="country"
                  label={countryLabel}
                  validate={countryRequired}
                >
                  <option disabled value="">
                    {countryPlaceholder}
                  </option>
                  {supportedCountries.map(c => (
                    <option key={c} value={c}>
                      {intl.formatMessage({ id: `PayoutDetailsForm.countryNames.${c}` })}
                    </option>
                  ))}
                </FieldSelect>
              </div>

              {showIndividual ? (
                <PayoutDetailsFormIndividual
                  fieldRenderProps={fieldRenderProps}
                  country={country}
                />
              ) : showCompany ? (
                <PayoutDetailsFormCompany fieldRenderProps={fieldRenderProps} country={country} />
              ) : null}

              {error}

              <div className={css.termsText}>
                <FieldCheckboxGroup
                  className={css.features}
                  id={'accept_stripe_terms'}
                  name={'accept_stripe_terms'}
                  options={stripeOption}
                  validate={validators.composeValidators(validators.requiredFieldArrayCheckbox('Please agree to the Stripe Account Agreement'))}
                />
                <FormattedMessage
                  id="PayoutDetailsForm.stripeToSText"
                  values={{ stripeConnectedAccountTermsLink }}
                />
              </div>
              <FieldCheckboxGroup
                className={css.features}
                id={'accept_terms'}
                name={'accept_terms'}
                options={options}
                validate={validators.composeValidators(validators.requiredFieldArrayCheckbox('Please accept all the Terms and conditions'))}
              />
              <Link to="/terms-of-service" target={'black'} >Terms and conditions</Link>
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={ready}
              >
                {submitButtonText ? (
                  submitButtonText
                ) : (
                    <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
                  )}
              </Button>
            </React.Fragment>
          ) : null}
        </Form>
      ) : (
          <div className={css.missingStripeKey}>
            <FormattedMessage id="PayoutDetailsForm.missingStripeKey" />
          </div>
        );
    }}
  />
);

PayoutDetailsFormComponent.defaultProps = {
  className: null,
  country: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
};

PayoutDetailsFormComponent.propTypes = {
  className: string,
  createStripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  submitButtonText: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsForm = compose(injectIntl)(PayoutDetailsFormComponent);

export default PayoutDetailsForm;
