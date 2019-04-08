import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingBasicForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingBasicPanel.css';

const BASIC_NAME = 'basic info';

const EditListingBasicPanel = props => {
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
    currentUser
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  let userName = currentUser && currentUser.attributes && currentUser.attributes.profile && currentUser.attributes.profile.displayName
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingBasicPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingBasicPanel.createListingTitle" values={{ name: userName }} />
    );

  const place = publicData && publicData.place;
  const initialValues = {place: place};
  let property_type = {};

  //Currently saves the 'selectedIndex' and the type itself into property_type
  const setpropertyType = (typeIndex, types) => {
    property_type = {id: typeIndex, type: types[typeIndex]}
  }

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingBasicForm
        className={css.form}
        name={BASIC_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { place = '' } = values;
          const updatedValues = {
            publicData: { place, property_type },
            title: Date.now().toString()
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        updatePropertyType={(i, e) => { setpropertyType(i, e) }}
      />
    </div>
  );
};

EditListingBasicPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingBasicPanel.propTypes = {
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

export default EditListingBasicPanel;
