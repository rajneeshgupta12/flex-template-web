import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingCapacityForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingCapacityPanel.css';

const CAPACITY_NAME = 'capacity';

const EditListingCapacityPanel = props => {
  const {
    rootClassName,
    className,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    guestNumber,
    maxGuestNumber,
    bedsNumber,
    bedroomsNumber,
    bathroomsNumber,
    updateCapacityValues,
    history,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingCapacityPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingCapacityPanel.createListingTitle" />
    );
  const initialValues = {};
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingCapacityForm
        history={history}
        className={css.form}
        name={CAPACITY_NAME}
        initialValues={initialValues}
        onSubmit={() => {
          const updatedValues = {
            publicData: { capacity: { bedsNumber, guestNumber, maxGuestNumber,bathroomsNumber, bedroomsNumber } },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        guestNumber={(guestNumber) || 1}
        maxGuestNumber={(maxGuestNumber) || 1}
        bedsNumber={(bedsNumber) || 0}
        bedroomsNumber={(bedroomsNumber ) || 0}
        bathroomsNumber={(bathroomsNumber) || 0}
        updateCapacityValues={updateCapacityValues}
      />
    </div>
  );
}

EditListingCapacityPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingCapacityPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingCapacityPanel;
