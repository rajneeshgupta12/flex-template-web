import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingBasicForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingBasicPanel.css';

import tentImage from '../../assets/Bell.png';
import safariImage from '../../assets/Safari.png';
import tipiImage from '../../assets/Tipi.png';
import yurtImage from '../../assets/Yurt.png';
import iglooImage from '../../assets/Igloo.png';
import rvImage from '../../assets/RV.png';
import treeImage from '../../assets/Tree.png';
import tinyImage from '../../assets/Tiny.png';
import cabinImage from '../../assets/Cabin.png';
import hutImage from '../../assets/Hut.png';
import shepherdImage from '../../assets/Shepherd.png';
import podImage from '../../assets/Pod.png';
import yachtImage from '../../assets/Yacht.png';
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
  const { publicData, title } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  let userName = currentUser && currentUser.attributes && currentUser.attributes.profile && currentUser.attributes.profile.firstName
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingBasicPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
      <FormattedMessage id="EditListingBasicPanel.createListingTitle" values={{ name: userName }} />
    );
  let propertType = publicData && publicData.metaData && publicData.metaData.all_property_type ||
    [
      { id: 0, title: 'Bell Tent', image: tentImage, selected: false },

      { id: 1, title: 'Safari Tent', image: safariImage, selected: false },
      { id: 2, title: 'Tipi', image: tipiImage, selected: false },
      { id: 3, title: 'Yurt', image: yurtImage, selected: false },
      { id: 4, title: 'Igloo/Dome', image: iglooImage, selected: false },

      { id: 5, title: 'RV Camper', image: rvImage, selected: false },
      { id: 6, title: 'Treehouse', image: treeImage, selected: false },
      { id: 7, title: 'Tiny House', image: tinyImage, selected: false },
      { id: 8, title: 'Cabin', image: cabinImage, selected: false },
      { id: 9, title: 'Hut', image: hutImage, selected: false },

      { id: 10, title: 'Sheperd\'s Hut', image: shepherdImage, selected: false },
      { id: 11, title: 'Glamping Pod', image: podImage, selected: false },
      { id: 12, title: 'Boat/Yacht', image: yachtImage, selected: false },
    ];
  const place = publicData && publicData.place;
  const initialValues = { place: place, index: (publicData && publicData.property_type && publicData.property_type.id) };
  let property_type = {};

  //Currently saves the 'selectedIndex' and the type itself into property_type
  const setpropertyType = (typeIndex, types) => {
    property_type = { id: typeIndex, type: types[typeIndex] }
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
            publicData: {
              place: [place],
              property_type,
              property_type_id: Number(property_type.id),
              metaData: {
                all_property_type: propertType
              }
            },
            title: title || Date.now().toString()
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
