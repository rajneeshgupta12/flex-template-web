import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldRadioButton, FieldSelect } from '../../components';

import css from './EditListingBasicForm.css';

const EditListingBasicFormComponent = props => (
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
          <FormattedMessage id="EditListingBasicForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingBasicForm.showListingFailed" />
        </p>
      ) : null;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <div>
            <label>Type of the property</label>
            <FieldSelect name="property_type" component="select">
              <option value={null} >Choose the type</option>
              <option value="bell_tent">Bell tent</option>
              <option value="rv_camper"> RV/camper</option>
              <option value="safari_tent"> Safari tent</option>
              <option value="tree_house"> Tree house</option>
              <option value="glamping_pod"> Glamping pod</option>
              <option value="tipi"> Tipi</option>
              <option value="Tiny house"> Tiny house</option>
              <option value="Boat/Yacht"> Boat/Yacht</option>
              <option value="Yurt"> Yurt</option>
              <option value="Cabin"> Cabin</option>
              <option value="Igloo/dome"> Igloo/dome</option>
              <option value="Hut"> Hut</option>
            </FieldSelect>
          </div>
          <div>
            <p>The guests can use the place</p>
            <div>
              <label>
                <FieldRadioButton
                  name="place"
                  value="entire_place"
                  id="entire_place"
                  label={"Entire place:"}
                />
                <span className="small">  The guests can use the whole place: Bedrooms, kitchens and toilets are available for guests only.</span>
              </label>
              <label>
                <FieldRadioButton
                  name="place"
                  value="private_place"
                  id="private_place"
                  label= "Private place"
                />
                <span className="small">The guest can use the private room during the stay. Other facilities can be shared with others.</span>
              </label>
              <label>
                <FieldRadioButton
                  name="place"
                  id="shared_place"
                  value="shared_place"
                  label="Shared place"
                />
                <span className="small">The guest can sleep or use the place with others.</span>
              </label>
            </div>
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
        </Form>
      );
    }}
  />
);

EditListingBasicFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
};

EditListingBasicFormComponent.propTypes = {
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

const EditListingBasicForm = EditListingBasicFormComponent;

export default EditListingBasicForm;
