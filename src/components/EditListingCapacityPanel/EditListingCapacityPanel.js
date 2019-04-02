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
  const capacity = publicData && publicData.capacity;
  const initialValues = { bathroomsNumber: capacity && capacity.bathroomsNumber, bedroomsNumber: capacity && capacity.bedroomsNumber, bedsNumber: capacity && capacity.bedsNumber, guestNumber: capacity && capacity.guestNumber };

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
            publicData: { capacity: { bedsNumber, guestNumber, bathroomsNumber, bedroomsNumber } },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        guestNumber={(guestNumber || capacity && capacity.guestNumber) || 2}
        bedsNumber={(bedsNumber || capacity && capacity.bedsNumber) || 1}
        bedroomsNumber={(bedroomsNumber || capacity && capacity.bedroomsNumber) || 1}
        bathroomsNumber={(bathroomsNumber || capacity && capacity.bathroomsNumber) || 1}
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
