import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import {
  autocompleteSearchRequired,
  autocompletePlaceSelected,
  composeValidators,
  required
} from '../../util/validators';
import { Form, LocationAutocompleteInputField, Button, FieldTextInput } from '../../components';

import css from './EditListingLocationForm.css';
const gMapKey =  process.env.REACT_APP_GOOGLE_MAP_KEY

class EditListingLocationFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      country: '',
      postalCode: ''
    }
  }
  render() {
    return <FinalForm
      {...this.props}
      render={fieldRenderProps => {
        const {
          className,
          disabled,
          handleSubmit,
          intl,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
          values,
        } = fieldRenderProps;

        const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });
        const addressPlaceholderMessage = intl.formatMessage({
          id: 'EditListingLocationForm.addressPlaceholder',
        });

        const stateMessage = intl.formatMessage({ id: 'EditListingLocationForm.state' });
        const cityMessage = intl.formatMessage({ id: 'EditListingLocationForm.city' });
        const zipMessage = intl.formatMessage({ id: 'EditListingLocationForm.zip' });
        const zipPlaceholderMessage = intl.formatMessage({
          id: 'EditListingLocationForm.zipPlaceholder',
        });
        const statePlaceholderMessage = intl.formatMessage({
          id: 'EditListingLocationForm.statePlaceholder',
        });
        const cityPlaceholderMessage = intl.formatMessage({
          id: 'EditListingLocationForm.cityPlaceholder',
        });
        const addressRequiredMessage = intl.formatMessage({
          id: 'EditListingLocationForm.addressRequired',
        });
        const addressNotRecognizedMessage = intl.formatMessage({
          id: 'EditListingLocationForm.addressNotRecognized',
        });

        const buildingMessage = intl.formatMessage({ id: 'EditListingLocationForm.building' });
        const buildingPlaceholderMessage = intl.formatMessage({
          id: 'EditListingLocationForm.buildingPlaceholder',
        });

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingLocationForm.updateFailed" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingLocationForm.showListingFailed" />
          </p>
        ) : null;

        const classes = classNames(css.root, className);
        const submitReady = updated && pristine;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;
        const getFullAddress = (place) => {
          let lat = place.origin && place.origin.lat
          let lng = place.origin && place.origin.lng
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + gMapKey)
            .then((response) => response.json())
            .then((responseJson) => {
              let city = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'locality').length > 0)[0].long_name
              let state = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name
              let country = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name
              let postalCode = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'postal_code').length > 0)[0].long_name
              values.city = city
              values.state = state
              values.zip = postalCode

              this.setState({
                city,
                state,
                country,
                postalCode
              })
            })
        }
        values.city = this.state.city
        values.state = this.state.state
        values.zip = this.state.postalCode
        return (
          <Form className={classes}  onSubmit={handleSubmit}>
            {errorMessage}
            {errorMessageShowListing}
            <LocationAutocompleteInputField
              className={css.locationAddress}
              inputClassName={css.locationAutocompleteInput}
              iconClassName={css.locationAutocompleteInputIcon}
              predictionsClassName={css.predictionsRoot}
              validClassName={css.validLocation}
              autoFocus
              name="location"
              label={titleRequiredMessage}
              placeholder={addressPlaceholderMessage}
              onValueUpdate={(e) => {
                getFullAddress(e)
              }}
              useDefaultPredictions={false}
              format={null}
              valueFromForm={values.location}
              validate={composeValidators(
                autocompleteSearchRequired(addressRequiredMessage),
                autocompletePlaceSelected(addressNotRecognizedMessage)
              )}
            />

            <FieldTextInput
              className={css.building}
              type="text"
              name="city"
              id="city"
              label={cityMessage}
              placeholder={cityPlaceholderMessage}
            />
            <FieldTextInput
              className={css.building}
              type="text"
              name="state"
              id="state"
              label={stateMessage}
              placeholder={statePlaceholderMessage}
            />
            <FieldTextInput
              className={css.building}
              type="text"
              name="zip"
              id="zip"
              label={zipMessage}
              placeholder={zipPlaceholderMessage}
            />
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
            <div onClick={() => this.props.history.goBack()}>Back: Amenities</div>
          </Form>
        );
      }}
    />
  }
}

EditListingLocationFormComponent.defaultProps = {
  selectedPlace: null,
  fetchErrors: null,
};

EditListingLocationFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingLocationFormComponent);
