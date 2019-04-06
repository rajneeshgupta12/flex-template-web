import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import { hashHistory } from 'react-router';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form } from '../../components';

import css from './EditListingCapacityForm.css';

const EditListingCapacityFormComponent = props => (
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
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = fieldRenderProps;

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingCapacityForm.showListingFailed" />
        </p>
      ) : null;


      const { guestNumber, bedsNumber, bedroomsNumber, bathroomsNumber } = props
      const initialData = {
        guestNumber: {
          guestNumber,
          'minVal': 1,
          'maxVal': 99
        },
        bedsNumber: {
          bedsNumber,
          'minVal': 0,
          'maxVal': 99
        }, bedroomsNumber: {
          bedroomsNumber,
          'minVal': 0,
          'maxVal': 99
        }, bathroomsNumber: {
          bathroomsNumber,
          'minVal': 0,
          'maxVal': 99
        }
      }
      const incrementButton = (name) => {
        return <button
          type="button"
          name={name}
          onClick={(e) => {
            props.updateCapacityValues(name, 'increment', initialData)
          }}
        > +
      </button>
      }

      const derementButton = (name) => {
        return <button
          type="button"
          name={name}
          onClick={(e) => {
            props.updateCapacityValues(name, 'derement', initialData)
          }}
        >
          -
      </button>
      }
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <div>
            <p>How many gusets can stay comfortably?</p>
            <div>
              <strong>Number of guests</strong>
              {derementButton("guestNumber")}
              {guestNumber || '    '}
              {incrementButton("guestNumber")}

            </div>
          </div>
          <div>
            <p>How many bedroom & bed can your guest use?</p>
            <div>
              <strong>Bedroom</strong>
              {derementButton('bedroomsNumber')}
              {bedroomsNumber || '    '}
              {incrementButton('bedroomsNumber')}
            </div>
          </div>
          <div>
            <div>
              <strong>Bed</strong>
              {derementButton('bedsNumber')}
              {bedsNumber || '    '}
              {incrementButton('bedsNumber')}
            </div>
          </div>
          <div>
            <p>How many bathroom can your guest use?</p>
            <div>
              <strong>Bathroom</strong>
              {derementButton('bathroomsNumber')}
              {bathroomsNumber || '    '}
              {incrementButton('bathroomsNumber')}
            </div>
          </div>
          <div>
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
          <div onClick={() => props.history.goBack()}>Back: Basic info</div>
        </Form>
      );
    }}
  />
);

EditListingCapacityFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingCapacityFormComponent.propTypes = {
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

const EditListingCapacityForm = EditListingCapacityFormComponent;

export default EditListingCapacityForm;
