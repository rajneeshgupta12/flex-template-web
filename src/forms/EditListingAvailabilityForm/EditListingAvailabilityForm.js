import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldSelect } from '../../components';

import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import css from './EditListingAvailabilityForm.css';

export class EditListingAvailabilityFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            handleSubmit,
            //intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
          } = fieldRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;
          let options = [
            <option key={"12:00 AM"} value={"12:00 AM"}>  {"Midnight"} </option>,
            <option key={"01:00 AM"} value={"01:00 AM"}>  {"01:00 AM"} </option>,
            <option key={"02:00 AM"} value={"02:00 AM"}>  {"02:00 AM"} </option>,
            <option key={"03:00 AM"} value={"03:00 AM"}>  {"03:00 AM"} </option>,
            <option key={"04:00 AM"} value={"04:00 AM"}>  {"04:00 AM"} </option>,
            <option key={"05:00 AM"} value={"05:00 AM"}>  {"05:00 AM"} </option>,
            <option key={"06:00 AM"} value={"06:00 AM"}>  {"06:00 AM"} </option>,
            <option key={"07:00 AM"} value={"07:00 AM"}>  {"07:00 AM"} </option>,
            <option key={"08:00 AM"} value={"08:00 AM"}>  {"08:00 AM"} </option>,
            <option key={"09:00 AM"} value={"09:00 AM"}>  {"09:00 AM"} </option>,
            <option key={"10:00 AM"} value={"10:00 AM"}>  {"10:00 AM"} </option>,
            <option key={"11:00 AM"} value={"11:00 AM"}>  {"11:00 AM"} </option >,
            <option key={"12:00 PM"} value={"12:00 PM"}>  {"12:00 PM"} </option>,
            <option key={"01:00 PM"} value={"01:00 PM"}>  {"01:00 PM"} </option>,
            <option key={"02:00 PM"} value={"02:00 PM"}>  {"02:00 PM"} </option>,
            <option key={"03:00 PM"} value={"03:00 PM"}>  {"03:00 PM"} </option>,
            <option key={"04:00 PM"} value={"04:00 PM"}>  {"04:00 PM"} </option>,
            <option key={"05:00 PM"} value={"05:00 PM"}>  {"05:00 PM"} </option>,
            <option key={"06:00 PM"} value={"06:00 PM"}>  {"06:00 PM"} </option>,
            <option key={"07:00 PM"} value={"07:00 PM"}>  {"07:00 PM"} </option>,
            <option key={"08:00 PM"} value={"08:00 PM"}>  {"08:00 PM"} </option>,
            <option key={"09:00 PM"} value={"09:00 PM"}>  {"09:00 PM"} </option>,
            <option key={"10:00 PM"} value={"10:00 PM"}>  {"10:00 PM"} </option>,
            <option key={"11:00 PM"} value={"11:00 PM"}>  {"11:00 PM"} </option>,
          ]
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.calendarWrapper}>
                <ManageAvailabilityCalendar
                  availability={availability}
                  availabilityPlan={availabilityPlan}
                  listingId={listingId}
                />
              </div>
              <FieldSelect
                className={css.category}
                name={"availability_period"}
                id={"availability_period"}
                label={"availability_period"}
              >
                <option disabled value="">
                  {"Default"}
                </option>
                <option key={"3"} value={"3"}> {"3 months later"} </option>,
                <option key={"6"} value={"6"}>  {"6 months later"} </option>,
                <option key={"9"} value={"9"}>  {"9 months later"} </option>,
                <option key={"12"} value={"12"}>  {"12 months later"} </option>,
              </FieldSelect>
              <FieldSelect
                className={css.category}
                name={"check_in_time"}
                id={"check_in_time"}
                label={"check_in_time"}
              >
                <option disabled value="">
                  {"Check-in time"}
                </option>
                {options.map(option => {
                  return option
                })}
              </FieldSelect>
              <FieldSelect
                className={css.category}
                name={"check_out_time"}
                id={"check_out_time"}
                label={"check_out_time"}
              >
                <option disabled value="">
                  {"Check-out time"}
                </option>
                {options.map(option => {
                  return option
                })}
              </FieldSelect>
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
              <div onClick={(props) => props.history.goBack()}>Back: Pricing</div>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);
