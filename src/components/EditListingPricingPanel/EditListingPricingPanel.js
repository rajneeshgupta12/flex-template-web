import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.css';

const { Money } = sdkTypes;

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    currentUser,
    errors,
    history
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { price, publicData } = currentListing.attributes;
  let userName = currentUser && currentUser.attributes && currentUser.attributes.profile && currentUser.attributes.profile.firstName
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingPricingPanel.createListingTitle"
        values={{ name: userName }}
      />
    );
  let cancellation_or_refund = publicData.cancellation_or_refund,
    // cleaning_fee = publicData.other_charges && publicData.other_charges.cleaning_fee,
    // weekend_price = publicData.other_charges && publicData.other_charges.weekend_price,
    // extra_guest_fee = publicData.other_charges && publicData.other_charges.extra_guest_fee,
    // seasonal_price = publicData.other_charges && publicData.other_charges.seasonal_price,
    tax = publicData.other_charges && publicData.other_charges.tax
  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  let calenders = {};
  const updateCal = (cals) => {
    calenders = {
      startDateSpecial: cals.startDateSpecial,
      endDateSpecial: cals.endDateSpecial,
      endDateSeasonal: cals.endDateSeasonal,
      startDateSeasonal: cals.startDateSeasonal
    }
  }
  console.log('publicData', publicData)
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{
        price,
        cancellation_or_refund,
        // cleaning_fee:JSON.parse(cleaning_fee),
        // weekend_price:JSON.parse(weekend_price),
        // extra_guest_fee:JSON.parse(extra_guest_fee),
        // seasonal_price:JSON.parse(seasonal_price),
        tax
      }}
      onSubmit={values => {
        const { cancellation_or_refund = '', price = '', cleaning_fee = '', weekend_price, extra_guest_fee, seasonal_price, tax } = values;
        const updatedValues = {
          price,
          publicData: {
            cancellation_or_refund, other_charges: {
              cleaning_fee: JSON.stringify(cleaning_fee),
              weekend_price: JSON.stringify(weekend_price),
              extra_guest_fee: JSON.stringify(extra_guest_fee),
              seasonal_price: JSON.stringify(seasonal_price),
              tax: tax,
              calenders
            }
          },
        };
        onSubmit(updatedValues);
      }}
      updateCal={updateCal}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
      history={history}
    />
  ) : (
      <div className={css.priceCurrencyInvalid}>
        <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
      </div>
    );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;
