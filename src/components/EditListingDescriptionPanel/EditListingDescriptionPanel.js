import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.css';

const EditListingDescriptionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    onImageUpload,
    descriptionImages,
    history,
    uploadDescriptionImages,
    handlePlaceTheme,
    onRemoveImage,
    placeTheme,
    images,
    IsImageUploaded,
    validateImageUploaded,
    fetchInProgress,
    newListingPublished,
    onUpdateImageOrder
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData } = currentListing.attributes;
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" values={{ name: "you" }} />
    );

  let glamping_rules = publicData && publicData.glamping_rules
  let selectedThemes = [];

  for (let key in placeTheme) {
    if (placeTheme.hasOwnProperty(key)) {
      if (placeTheme[key])
        selectedThemes.push(key)
    }
  }

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        initialValues={{ title, description, glamping_rules, images }}
        className={css.form}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, glamping_rules, addImage } = values;
          const updateValues = {
            title: title.trim(),
            description,
            publicData: { place_themes: placeTheme, place_theme: selectedThemes, glamping_rules },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={fetchInProgress}
        ready={newListingPublished}
        fetchErrors={errors}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={config.custom.categories}
        descriptionImages={descriptionImages}
        uploadDescriptionImages={uploadDescriptionImages}
        onRemoveImage={onRemoveImage}
        history={history}
        handlePlaceTheme={handlePlaceTheme}
        placeTheme={placeTheme}
        images={images}
        onImageUpload={onImageUpload}
        IsImageUploaded={IsImageUploaded}
        validateImageUploaded={validateImageUploaded}
        onUpdateImageOrder={onUpdateImageOrder}
        saveActionMsg={submitButtonText}
      />
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
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

export default EditListingDescriptionPanel;
