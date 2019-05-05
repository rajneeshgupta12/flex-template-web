import { bool, func, shape, string } from 'prop-types';
import { Form as FinalForm, } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldRadioButton, FieldTextInput } from '../../components';
import css from './EditListingPricingForm.css';
import React, { Component } from 'react';
import { compose } from 'redux';
import classNames from 'classnames';
import {
  DateRangePicker,
} from 'react-dates';
import { updateLocale } from 'moment';

const { Money } = sdkTypes;

export class EditListingPricingFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      seasonal_price: false,
      extra_guest_fee: false,
      special_price: false,
      special_weekend: false,
      seasonal_weekend: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    if (e) {
      const { startDate, endDate, total_glampers, totalPrice } = this.state;
      this.props.onSubmit({ startDate, endDate, total_glampers, totalPrice });
    }
  }
  updateState = (stateName) => {
    let currentState = this.state[stateName]
    this.setState({ [stateName]: !currentState })
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
        } = fieldRenderProps;

        const unitType = config.bookingUnitType;
        const isNightly = unitType === LINE_ITEM_NIGHT;
        const isDaily = unitType === LINE_ITEM_DAY;

        const translationKey = isNightly
          ? 'EditListingPricingForm.pricePerNight'
          : isDaily
            ? 'EditListingPricingForm.pricePerDay'
            : 'EditListingPricingForm.pricePerUnit';

        const pricePerUnitMessage = intl.formatMessage({
          id: translationKey,
        });

        const pricePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPricingForm.priceInputPlaceholder',
        });

        const priceRequired = validators.required(
          intl.formatMessage({
            id: 'EditListingPricingForm.priceRequired',
          })
        );
        const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
        const minPriceRequired = validators.moneySubUnitAmountAtLeast(
          intl.formatMessage(
            {
              id: 'EditListingPricingForm.priceTooLow',
            },
            {
              minPrice: formatMoney(intl, minPrice),
            }
          ),
          config.listingMinimumPriceSubUnits
        );
        const priceValidators = config.listingMinimumPriceSubUnits
          ? validators.composeValidators(priceRequired, minPriceRequired)
          : priceRequired;

        const classes = classNames(css.root, className);
        const submitReady = updated && pristine;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;
        const { updateListingError, showListingsError } = fetchErrors || {};
        const showAsRequired = pristine;

        return (
          <Form onSubmit={handleSubmit} className={classes}>
            {updateListingError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.updateFailed" />
              </p>
            ) : null}
            {showListingsError ? (
              <p className={css.error}>
                <FormattedMessage id="EditListingPricingForm.showListingFailed" />
              </p>
            ) : null}
            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.priceInput}
              autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              validate={priceValidators}
            /><label> $ per night</label>

            <FieldCurrencyInput
              id="cleaning_fee"
              name="cleaning_fee"
              className={css.priceInput}
              label={"Cleaning fee"}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
            /><label> $ per night</label>

            <FieldCurrencyInput
              id="weekend_price"
              name="weekend_price"
              className={css.priceInput}

              label={"Weekend price"}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
            /><label> $ per night</label>
            <span>This is for Friday and Saturday</span>

            <FieldTextInput
              id="tax"
              name="tax"
              className={css.tax}
              type="number"
              label={"Tax"}
              placeholder={"Enter Tax %"}

            />
            <label> %</label>
            <span>This is percentage of total price, except for Glam Oasis's service fee</span>
            <div onClick={() => {
              this.updateState("extra_guest_fee")
            }}>
              + Extra guest fee
            </div>
            {this.state.extra_guest_fee &&
              <div>  <FieldCurrencyInput
                id="extra_guest_fee"
                name="extra_guest_fee"
                className={css.priceInput}
                label={""}
                placeholder={pricePlaceholderMessage}
                currencyConfig={config.currencyConfig}
              /> <label> $ per night</label>
              </div>
            }
            <div onClick={() => {
              this.updateState("seasonal_price")
            }}>
              + Seasonal price
            </div>{this.state.seasonal_price &&
              <div>
                <div>
                  <FieldCurrencyInput
                    id="seasonal_price"
                    name="seasonal_price"
                    className={css.priceInput}

                    label={""}
                    placeholder={pricePlaceholderMessage}
                    currencyConfig={config.currencyConfig}
                  /><label> $ per night</label>
                  <DateRangePicker
                    startDate={this.state.startDateSeasonal} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDateSeasonal} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ "startDateSeasonal": startDate, "endDateSeasonal": endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInputSeasonal} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    numberOfMonths={1}
                    onFocusChange={focusedInput => this.setState({ focusedInputSeasonal: focusedInput })} // PropTypes.func.isRequired,
                  />
                </div>
                <div onClick={() => {
                  this.updateState("seasonal_weekend")
                }}>
                  + Seasonal weekend Price
            </div>
                <div>
                  {this.state.seasonal_weekend &&
                    <div>
                      <FieldCurrencyInput
                        id="seasonal_weekend"
                        name="seasonal_weekend"
                        className={css.priceInput}
                        label={""}
                        placeholder={pricePlaceholderMessage}
                        currencyConfig={config.currencyConfig}
                      />
                      <label> $ per night</label>
                    </div>
                  }
                </div>
              </div>
            }
            <div onClick={() => {
              this.updateState("special_price")
            }}>
              + Special price
            </div>{this.state.special_price &&
              <div>
              <div>
                <FieldCurrencyInput
                  id="special_price"
                  name="special_price"
                  className={css.priceInput}
                  label={""}
                  placeholder={pricePlaceholderMessage}
                  currencyConfig={config.currencyConfig}
                /><label> $ per night</label>
                <DateRangePicker
                  startDate={this.state.startDateSpecial} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={this.state.endDateSpecial} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => this.setState({ "startDateSpecial": startDate, "endDateSpecial": endDate })} // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInputSpecial} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  numberOfMonths={1}
                  onFocusChange={focusedInput => this.setState({ focusedInputSpecial: focusedInput })} // PropTypes.func.isRequired,
                />
              </div>
                 <div onClick={() => {
                  this.updateState("special_weekend")
                }}>
                  + Special weekend Price
            </div>
                <div>
                  {this.state.special_weekend &&
                    <div>
                      <FieldCurrencyInput
                        id="special_weekend"
                        name="special_weekend"
                        className={css.priceInput}
                        label={""}
                        placeholder={pricePlaceholderMessage}
                        currencyConfig={config.currencyConfig}
                      />
                      <label> $ per night</label>
                    </div>
                  }
                </div>
              </div>
            }
            <label>
              Cancellation & Refund
          </label>
            <div className={css.radioButtonRow}>
              <FieldRadioButton
                name="cancellation_or_refund"
                showAsRequired={showAsRequired}
                id="free"
                value="free"
                label={`Free`}
                validate={validators.composeValidators(validators.requiredRadioBox('required'))}

              />
              <label>
                If cancel anytime before the check in day and time, the guest will receive a full refund (minus service fee).
            </label>
              <FieldRadioButton
                validate={validators.composeValidators(validators.requiredRadioBox('required'))}
                name="cancellation_or_refund"
                showAsRequired={showAsRequired}
                value="flexible"
                id="flexible"
                label={`Flexible`}
              />
              <label>
                If cancel at least 7 days before the check in day and time, the guest will receive a full refund (minus service fee).
             </label>
              <FieldRadioButton
                validate={validators.composeValidators(validators.requiredRadioBox('required'))}
                name="cancellation_or_refund"
                id="moderate"
                value="moderate"
                showAsRequired={showAsRequired}
                label={`Moderate`}
              />
              <label>
                If cancel at least 15 days before the check in day and time, the guest will receive a full refund (minus service fee).
                Cancelation between 7 to 15 days before the check in day and time,
                the guest will receive a 50% refund (minus service fee).
            </label>
              <FieldRadioButton
                validate={validators.composeValidators(validators.requiredRadioBox('required'))}
                name="cancellation_or_refund"
                value="strict"
                id="strict"
                showAsRequired={showAsRequired}
                label={`Strict`}
              />
              <label>
                There will be no refund after the booking is confirmed.
            </label>
            </div>
            <div onClick={() => {
              this.props.updateCal(this.state)
            }}>
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {saveActionMsg}
              </Button>
            </div>
            <div onClick={() => this.props.history.goBack()}>Back: Description</div>
          </Form>
        );
      }}
    />

    EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

    EditListingPricingFormComponent.propTypes = {
      intl: intlShape.isRequired,
      onSubmit: func.isRequired,
      saveActionMsg: string.isRequired,
      updated: bool.isRequired,
      updateInProgress: bool.isRequired,
      fetchErrors: shape({
        showListingsError: propTypes.error,
        updateListingError: propTypes.error,
      }),
    };
  }
}

export default compose(injectIntl)(EditListingPricingFormComponent);
