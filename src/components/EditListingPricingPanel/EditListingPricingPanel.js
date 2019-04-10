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
  const { price ,publicData} = currentListing.attributes;
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
    let cancellation_or_refund= publicData.cancellation_or_refund
  const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{ price ,cancellation_or_refund }}
      onSubmit={values => {
        const { cancellation_or_refund = '', price = '' } = values;

        const updatedValues = {
          price,
          publicData: { cancellation_or_refund },
        };
        onSubmit(updatedValues);
      }}
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
