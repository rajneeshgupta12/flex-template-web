import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form, FieldTextInput } from '../../components';

import css from './EditListingTravelForm.css';

const EditListingTravelFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={fieldRenderProps => {
      const {
        disabled,
        rootClassName,
        className,
        name,
        handleSubmit,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        showTravelSubfield,
        travelSubFields,
        IstravelsfieldInitialized,
        mangeIstravelsfieldInitialized
      } = fieldRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;

      const submitDisabled = invalid || disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingTravelForm.updateFailed" />
        </p>
      ) : null;
      props.initialValues.available_transportaion.length > 0 && props.initialValues && !IstravelsfieldInitialized && props.initialValues.available_transportaion.forEach(at => {
        showTravelSubfield(at)
      }, mangeIstravelsfieldInitialized())
      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingTravelForm.showListingFailed" />
        </p>
      ) : null;
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <div>
            <label>
              Available transportaion
          </label>
            <div onClick={(e) => {
              e.target.value && showTravelSubfield(e.target.value, false)
            }}>
              <FieldCheckboxGroup
                className={css.features}
                id={'available_transportaion'}
                name={'available_transportaion'}
                travelSubFields={travelSubFields}
                options={config.custom.available_transportaion}
              />
            </div>
          </div>
          <div>
            <label>
              Facilities and Landmarks
          </label>
            <span>
              Culture
          </span>
            <FieldCheckboxGroup
              className={css.features}
              id={'facilities_culture'}
              name={'facilities_culture'}
              options={config.custom.facilities_culture}
            /><span>
              Nature
        </span>
            <FieldCheckboxGroup
              className={css.features}
              id={'facilities_nature'}
              name={'facilities_nature'}
              options={config.custom.facilities_nature}
            />   <span>
              Convenience
        </span>
            <FieldCheckboxGroup
              className={css.features}
              id={'facilities_convenience'}
              name={'facilities_convenience'}
              options={config.custom.facilities_convenience}
            /><span>
              Tour
      </span>
            <FieldCheckboxGroup
              className={css.features}
              id={'facilities_tour'}
              name={'facilities_tour'}
              options={config.custom.facilities_tour}
            />
          </div>
          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
          <div onClick={() => props.history.goBack()}>Back: Location</div>
        </Form>
      );
    }}
  />
);

EditListingTravelFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingTravelFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const EditListingTravelForm = EditListingTravelFormComponent;

export default EditListingTravelForm;
