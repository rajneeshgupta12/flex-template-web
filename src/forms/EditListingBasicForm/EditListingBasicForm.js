import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';
import _ from "lodash"
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldRadioButton, FieldTextInput } from '../../components';
import { maxLength, required, composeValidators, requiredSelectBox, requiredRadioBox } from '../../util/validators';
import Icon from '@material-ui/core/Icon';


import css from './EditListingBasicForm.css';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
  }

  handleClickOutside() {
    this.setState({
      listOpen: false
    })
  }

  toggleList() {
    this.setState(prev => ({
      listOpen: !prev.listOpen
    }))
  }

  render() {
    const { list, toggleItem } = this.props;
    const { listOpen, headerTitle } = this.state;

    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={css.dropWrapper}>
        <div className={css.dropHeader} onClick={() => this.toggleList()}>
          <div className={css.dropHeaderTitle}>{headerTitle}</div>
          {listOpen ? <Icon className={css.dropIcon}>expand_less</Icon> : <Icon className={css.dropIcon}>expand_more</Icon>}
        </div>
        {listOpen && <ul className={css.list}>
          {list.map((item) => (
            <li className={css.listItem} key={item.id} onClick={() => toggleItem(item.id, 'glampTypes')} >
              <img src={item.image} className={item.selected ? css.listItemSelectedImage : css.listItemImage} />
              <span className={item.selected ? css.listItemTextSelected : css.listItemText}> {item.title}</span></li>))
          }
        </ul>}
      </div>
    )
  }
}


class EditListingBasicFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

      glampTypes: []
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      glampTypes: newProps.all_property_type,
      placeSelected: (newProps && newProps.initialValues && newProps.initialValues.place) ? true : false
    })
  }

  toggleSelected = (id, key) => {
    let temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp,
    })
  }

  render() {
    return (
      <FinalForm
        {...this.props}
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
            invalid
          } = fieldRenderProps;
          const classes = classNames(rootClassName || css.root, className);
          const submitReady = updated && pristine;
          const submitInProgress = updateInProgress;
          let submitDisabled = invalid || disabled || submitInProgress;
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
          this.props.updatePropertyType(this.state.glampTypes)
          let activeGlamp = _.partition(this.state.glampTypes, function (glamp) { return glamp.selected; });

          submitDisabled = activeGlamp[0].length > 0 && this.state.placeSelected ? false : true
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}
              <div>
                <label>Type of the property</label>
                <Dropdown title="Choose the type" list={this.state.glampTypes} toggleItem={this.toggleSelected}
                />
              </div>
              <div onChange={(e) => {
                this.setState({ placeSelected: true })
              }}>
                <p>The guests can use the place</p>
                <div>
                  <label>
                    <FieldRadioButton
                      name="place"
                      value="entire_place"
                      id="entire_place"
                      label={"Entire place:"}
                      validate={composeValidators(required('required'))}
                    />
                    <span className="small">  The guests can use the whole place: Bedrooms, kitchens and toilets are available for guests only.</span>
                  </label>
                  <label>
                    <FieldRadioButton
                      name="place"
                      value="private_place"
                      id="private_place"
                      label="Private place"
                      validate={composeValidators(required(requiredSelectBox('required')))}
                    />
                    <span className="small">The guest can use the private room during the stay. Other facilities can be shared with others.</span>
                  </label>
                  <label>
                    <FieldRadioButton
                      name="place"
                      id="shared_place"
                      value="shared_place"
                      label="Shared place"
                      validate={composeValidators(required(requiredSelectBox('required')))}
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
      />)
  }
}

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
