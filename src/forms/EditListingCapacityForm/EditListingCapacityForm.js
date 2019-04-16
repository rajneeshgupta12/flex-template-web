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
  label: {
    height: '4px',
    width: '4px'
  }
})(IconButton)
;

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
        const disable = ((name === "guestNumber" && guestNumber === initialData.guestNumber.maxVal)
          || (name === "bedroomsNumber" && bedroomsNumber === initialData.bedroomsNumber.maxVal)
          || (name === "bedsNumber" && bedsNumber === initialData.bedsNumber.maxVal)
          || (name === "bathroomsNumber" && bathroomsNumber === initialData.bathroomsNumber.maxVal));
        return <StyledButton
          type="button"
          name={name}
          disabled={disable}
          style={ disable ? {borderColor: '#b2b2b2'} : {}}
          className={css.incrementButton}
          onClick={(e) => {
            props.updateCapacityValues(name, 'increment', initialData)
          }}
        > <Icon>add</Icon>
      </StyledButton>
      }

      const derementButton = (name) => {
        const disable = ((name === "guestNumber" && guestNumber === initialData.guestNumber.minVal)
          || (name === "bedroomsNumber" && bedroomsNumber === initialData.bedroomsNumber.minVal)
          || (name === "bedsNumber" && bedsNumber === initialData.bedsNumber.minVal)
          || (name === "bathroomsNumber" && bathroomsNumber === initialData.bathroomsNumber.minVal));
        return <StyledButton
          type="button"
          name={name}
          disabled={disable}
          style={disable ? {borderColor: '#b2b2b2'} : {}}
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
              <span className={css.itemGuestsQ}>How many glampers can stay comfortably?</span>
              <div className={css.itemGuestsA}>
                <strong>Number of glampers</strong>
              </div>
              
                <span className={css.itemGuestsD}>{derementButton("guestNumber")}</span>
                <span className={css.itemGuestsN}>{guestNumber || '    '}</span>
                <span className={css.itemGuestsI}>{incrementButton("guestNumber")}</span>      
                  
              <span className={css.itemBedQ}>How many bedrooms & beds can your glampers use?</span>
              <div className={css.itemBedroomA}>
                <strong>Bedroom(s)</strong>
              </div>
                <span className={css.itemBedroomD}>{derementButton('bedroomsNumber')}</span>
                <span className={css.itemBedroomN}>{bedroomsNumber}</span>
                <span className={css.itemBedroomI}>{incrementButton('bedroomsNumber')}</span>
            
              <div className={css.itemBedA}>
                <strong>Bed(s)</strong>
              </div>
                <span className={css.itemBedD}>{derementButton('bedsNumber')}</span>
                <span className={css.itemBedN}>{bedsNumber}</span>
                <span className={css.itemBedI}>{incrementButton('bedsNumber')}</span>            
            
              <span className={css.itemBathroomQ}>How many bathrooms can your guest use?</span>
              <div className={css.itemBathroomA}>
                <strong>Bathroom(s)</strong>
              </div>
                <span className={css.itemBathroomD}>{derementButton('bathroomsNumber')}</span>
                <span className={css.itemBathroomN}>{bathroomsNumber}</span>
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
