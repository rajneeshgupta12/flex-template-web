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

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';  

import css from './EditListingCapacityForm.css';


const StyledButton = withStyles({
  root: {
    width: '30px',
    height  : '30px',
    borderRadius: 0,
    color: '#ffaa00',
    border: ['solid 1px #ffaa00'],
  },
})(IconButton);

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
        return <StyledButton
          type="button"
          name={name}
          className={css.incrementButton}
          onClick={(e) => {
            props.updateCapacityValues(name, 'increment', initialData)
          }}
        > <Icon>add</Icon>
      </StyledButton>
      }

      const derementButton = (name) => {
        return <StyledButton
          type="button"
          name={name}
          className={css.decrementButton}
          onClick={(e) => {
            props.updateCapacityValues(name, 'derement', initialData)
          }}
        >
          <Icon>remove</Icon>
      </StyledButton>
      }
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <div className={css.gridLayout}>
              <span className={css.itemGuestsQ}>How many gusets can stay comfortably?</span>
              <div className={css.itemGuestsA}>
                <strong>Number of guests</strong>
              </div>
              
                <span className={css.itemGuestsD}>{derementButton("guestNumber")}</span>
                <span className={css.itemGuestsN}>{guestNumber || '    '}</span>
                <span className={css.itemGuestsI}>{incrementButton("guestNumber")}</span>      
                  
              <span className={css.itemBedQ}>How many bedroom & bed can your guest use?</span>
              <div className={css.itemBedroomA}>
                <strong>Bedroom</strong>
              </div>
                <span className={css.itemBedroomD}>{derementButton('bedroomsNumber')}</span>
                <span className={css.itemBedroomN}>{bedroomsNumber || '    '}</span>
                <span className={css.itemBedroomI}>{incrementButton('bedroomsNumber')}</span>
            
              <div className={css.itemBedA}>
                <strong>Bed</strong>
              </div>
                <span className={css.itemBedD}>{derementButton('bedsNumber')}</span>
                <span className={css.itemBedN}>{bedsNumber || '    '}</span>
                <span className={css.itemBedI}>{incrementButton('bedsNumber')}</span>            
            
              <span className={css.itemBathroomQ}>How many bathroom can your guest use?</span>
              <div className={css.itemBathroomA}>
                <strong>Bathroom</strong>
              </div>
                <span className={css.itemBathroomD}>{derementButton('bathroomsNumber')}</span>
                <span className={css.itemBathroomN}>{bathroomsNumber || '    '}</span>
                <span className={css.itemBathroomI}>{incrementButton('bathroomsNumber')}</span>
            
            
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
