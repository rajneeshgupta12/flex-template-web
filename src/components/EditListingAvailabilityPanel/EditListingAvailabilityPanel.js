import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingAvailabilityForm } from '../../forms';

import css from './EditListingAvailabilityPanel.css';

const EditListingAvailabilityPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    availability,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    history
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const { check_in_time, check_out_time, availability_period } = currentListing.attributes.publicData;
  const defaultAvailabilityPlan = {
    type: 'availability-plan/day',
    entries: [
      { dayOfWeek: 'mon', seats: 1 },
      { dayOfWeek: 'tue', seats: 1 },
      { dayOfWeek: 'wed', seats: 1 },
      { dayOfWeek: 'thu', seats: 1 },
      { dayOfWeek: 'fri', seats: 1 },
      { dayOfWeek: 'sat', seats: 1 },
      { dayOfWeek: 'sun', seats: 1 },
    ],
  };

  const availabilityPlan = currentListing.attributes.availabilityPlan || defaultAvailabilityPlan;

  return (
    <div className={classes}>
      <h1 className={css.title}>
        {isPublished ? (
          <FormattedMessage
            id="EditListingAvailabilityPanel.title"
            values={{ listingTitle: <ListingLink listing={listing} /> }}
          />
        ) : (
            <FormattedMessage id="EditListingAvailabilityPanel.createListingTitle" />
          )}
      </h1>
      <EditListingAvailabilityForm
        className={css.form}
        initialValues={{ check_in_time, check_out_time, availability_period }}
        listingId={currentListing.id}
        // initialValues={{ availabilityPlan }}
        availability={availability}
        availabilityPlan={availabilityPlan}
        onSubmit={(values) => {
          let { check_in_time = 'Flexible', check_out_time = "Flexible", availability_period = 'indefinite', isInstaBookingAllow = [] } = values
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          isInstaBookingAllow = isInstaBookingAllow && isInstaBookingAllow.length > 0 ? true : false
          onSubmit({
            availabilityPlan, publicData: {
              check_in_time, check_out_time, availability_period, insta_book: isInstaBookingAllow
            }
          });
        }}
        onChange={(values) => {
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          onChange({ availabilityPlan });
        }}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        history={history}
      />
    </div>
  );
};

EditListingAvailabilityPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingAvailabilityPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  availability: shape({
    calendar: object.isRequired,
    onFetchAvailabilityExceptions: func.isRequired,
    onCreateAvailabilityException: func.isRequired,
    onDeleteAvailabilityException: func.isRequired,
  }).isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingAvailabilityPanel;
