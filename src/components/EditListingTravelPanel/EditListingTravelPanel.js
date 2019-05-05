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
    history,
    IstravelsfieldInitialized,
    mangeIstravelsfieldInitialized
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
  const initialValues = {
    available_transportaion: publicData.travel_info && publicData.travel_info.available_transportaion,
    subway_text: publicData.travel_info && publicData.travel_info.subway_text,
    bus_text: publicData.travel_info && publicData.travel_info.bus_text,
    ride_service_text: publicData.travel_info && publicData.travel_info.ride_service_text,
    parking_available_text: publicData.travel_info && publicData.travel_info.parking_available_text,
    train_text: publicData.travel_info && publicData.travel_info.train_text,
    facilities_culture: publicData.travel_info && publicData.travel_info.facilities_culture,
    facilities_nature: publicData.travel_info && publicData.travel_info.facilities_nature,
    facilities_convenience: publicData.travel_info && publicData.travel_info.facilities_convenience,
    facilities_tour: publicData.travel_info && publicData.travel_info.facilities_tour,
  };


  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingTravelForm
        className={css.form}
        name={TRAVEL_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const {
            available_transportaion = [],
            facilities_culture = [],
            facilities_nature = [],
            facilities_convenience = [],
            facilities_tour = [],
            subway_text,bus_text,ride_service_text,parking_available_text,train_text,
          } = values;

          const updatedValues = {
            publicData: {
              travel_info: {
                subway_text,bus_text,ride_service_text,parking_available_text,train_text,
                train_text,  available_transportaion,
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
        IstravelsfieldInitialized={IstravelsfieldInitialized}
        mangeIstravelsfieldInitialized={mangeIstravelsfieldInitialized}
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
