import React from 'react';
import { bool, func, number, object, string } from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import { Form, RangeSlider } from '../../components';
import css from './NumberFilterForm.css';

const DEBOUNCE_WAIT_TIME = 400;

// Helper function to parse value for min handle
// Value needs to be between slider's minimum value and current maximum value
const parseMin = (min, currentMax) => value => {
  if (isNaN(value)) {
    return min;
  }
  const parsedValue = Number.parseInt(value, 10);
  return parsedValue < min ? min : parsedValue > currentMax ? currentMax : parsedValue;
};

// Helper function to parse value for max handle
// Value needs to be between slider's max value and current minimum value
const parseMax = (max, currentMin) => value => {
  if (isNaN(value)) {
    return max;
  }
  const parsedValue = Number.parseInt(value, 10);
  return parsedValue < currentMin ? currentMin : parsedValue > max ? max : parsedValue;
};

// NumberFilterForm component
class NumberFilterFormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }


  render() {
    const { liveEdit, onChange, onSubmit, onCancel, onClear, ...rest } = this.props;

    if (liveEdit && !onChange) {
      throw new Error('NumberFilterForm: if liveEdit is true you need to provide onChange function');
    }

    if (!liveEdit && !(onCancel && onClear && onSubmit)) {
      throw new Error(
        'NumberFilterForm: if liveEdit is false you need to provide onCancel, onClear, and onSubmit functions'
      );
    }

    const handleChange = debounce(
      formState => {
        if (formState.dirty) {
          onChange(formState.values);
        }
      },
      DEBOUNCE_WAIT_TIME,
      { leading: false, trailing: true }
    );

    const formCallbacks = liveEdit ? { onSubmit: () => null } : { onSubmit, onCancel, onClear };
    return (
      <FinalForm
        {...rest}
        {...formCallbacks}
        render={formRenderProps => {
          const {
            form,
            handleSubmit,
            id,
            showAsPopup,
            onClear,
            onCancel,
            isOpen,
            contentRef,
            style,
            intl,
            values,
            min,
            max,
            step,
          } = formRenderProps;
          const { minNumber, maxNumber } = values;

          const handleCancel = () => {
            // reset the final form to initialValues
            form.reset();
            onCancel();
          };

          const clear = intl.formatMessage({ id: 'NumberFilterForm.clear' });
          const cancel = intl.formatMessage({ id: 'NumberFilterForm.cancel' });
          const submit = intl.formatMessage({ id: 'NumberFilterForm.submit' });

          const classes = classNames(css.root, {
            [css.popup]: showAsPopup,
            [css.isOpenAsPopup]: showAsPopup && isOpen,
            [css.plain]: !showAsPopup,
            [css.isOpen]: !showAsPopup && isOpen,
          });

          const doDecrement = () => {
            console.log('doDecrement--', this.state.value)
            if (this.state.value) {
              this.setState({
                value: this.state.value - 1,
                message: null
              });
            } else {
              this.setState({
                message: "Can't decrement. Since 0 is the min value"
              });
            }
          }

          const doIncrement = () => {
            if (this.state.value < max) {
              this.setState({
                value: this.state.value + 1,
                message: null
              });
            } else {
              this.setState({
                message: "Can't increment. Since 10 is the max value"
              });
            }
          }
          return (
            <Form
              className={classes}
              onSubmit={handleSubmit}
              tabIndex="0"
              contentRef={contentRef}
              style={{ minWidth: '300px', ...style }}
            >
              <div className={css.contentWrapper}>
                <span className={css.label}>
                  <FormattedMessage id="NumberFilterForm.label" />
                </span>
                <div
                  onChange={(e) => {
                    this.setState({ value: Number(e.target.value) })
                  }}

                  className={css.inputsWrapper}>
                  <Field
                    className={css.minNumber}
                    id={`${id}.minNumber`}
                    name="number"
                    component="input"
                    type="number"

                   defaultValue={this.state.value}
                  />
                </div>
              </div>

              <div className={css.sliderWrapper}>

                <div>
                  <button type="button" onClick={() => doDecrement()}>-</button>
                  <span >{this.state.value}</span>
                  <button type="button" onClick={() => doIncrement()} >+</button>
                  <sub>{this.state.message}</sub>
                </div>
                {/* <RangeSlider
                min={min}
                max={max}
                step={step}
                handles={[minNumber, maxNumber]}
                onChange={handles => {
                  form.change('minNumber', handles[0]);
                  form.change('maxNumber', handles[1]);
                }} */}

              </div>

              {liveEdit ? (
                <FormSpy onChange={handleChange} subscription={{ values: true, dirty: true }} />
              ) : (
                  <div className={css.buttonsWrapper}>
                    <button className={css.clearButton} type="button" onClick={onClear}>
                      {clear}
                    </button>
                    <button className={css.cancelButton} type="button" onClick={handleCancel}>
                      {cancel}
                    </button>
                    <button className={css.submitButton} type="submit">
                      {submit}
                    </button>
                  </div>
                )}
            </Form>
          );
        }}
      />
    );
  };
};


NumberFilterFormComponent.defaultProps = {
  liveEdit: false,
  showAsPopup: false,
  isOpen: false,
  contentRef: null,
  style: null,
  min: 0,
  step: 1,
  onCancel: null,
  onChange: null,
  onClear: null,
  onSubmit: null,
};

NumberFilterFormComponent.propTypes = {
  id: string.isRequired,
  liveEdit: bool,
  showAsPopup: bool,
  onCancel: func,
  onChange: func,
  onClear: func,
  onSubmit: func,
  isOpen: bool,
  contentRef: func,
  style: object,
  min: number.isRequired,
  max: number.isRequired,
  step: number,

  // form injectIntl
  intl: intlShape.isRequired,
};

const NumberFilterForm = injectIntl(NumberFilterFormComponent);

export default NumberFilterForm;
