import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingTravelForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingTravelPanel.css';

const TRAVEL_NAME = 'travel info';

const EditListingTravelPanel = props => {
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
    currentUser,
    showTravelSubfield,
    travelSubFields,
    history
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;
  let userName = currentUser && currentUser.attributes && currentUser.attributes.profile && currentUser.attributes.profile.firstName

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingTravelPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingTravelPanel.createListingTitle" values={{ name: userName }} />
    );

  const amenities = publicData && publicData.amenities;
  const initialValues = { publicData };
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingTravelForm
        className={css.form}
        name={TRAVEL_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const {
            traval_subway = '', traval_bus = '', traval_train = '',
            available_transportaion = [],
            facilities_culture = [],
            facilities_nature = [],
            facilities_convenience = [],
            facilities_tour = []
          } = values;

          const updatedValues = {
            publicData: {
              travel_info: {
                traval_subway, traval_bus,
                traval_train, available_transportaion,
                facilities_culture, facilities_nature,
                facilities_convenience, facilities_tour
              }
            },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        showTravelSubfield={showTravelSubfield}
        travelSubFields={travelSubFields}
        history={history}

      />
    </div>
  );
};

EditListingTravelPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingTravelPanel.propTypes = {
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

export default EditListingTravelPanel;
