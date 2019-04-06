import React, {Component} from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from 'react-intl';

import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, Form, FieldRadioButton, FieldTextInput } from '../../components';
import { maxLength, required, composeValidators, requiredSelectBox, requiredRadioBox } from '../../util/validators';
import Icon from '@material-ui/core/Icon';

import tentImage from '../../assets/Bell.png';
import safariImage from '../../assets/Safari.png';
import tipiImage from '../../assets/Tipi.png';
import yurtImage from '../../assets/Yurt.png';
import iglooImage from '../../assets/Igloo.png';
import rvImage from '../../assets/RV.png';
import treeImage from '../../assets/Tree.png';
import tinyImage from '../../assets/Tiny.png';
import cabinImage from '../../assets/Cabin.png';
import hutImage from '../../assets/Hut.png';
import shepherdImage from '../../assets/Shepherd.png';
import podImage from '../../assets/Pod.png';
import yachtImage from '../../assets/Yacht.png';

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
    const{list, toggleItem} = this.props;
    const{listOpen, headerTitle} = this.state;

    const {rootClassName, className } = this.props;
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
            <img src={item.image} className={item.selected ? css.listItemSelectedImage : css.listItemImage}/>
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

       glampTypes : [{
          id: 0, title: 'Bell Tent', image: tentImage,  selected: false},
        { id: 1, title: 'Safari Tent', image: safariImage, selected: false},
        { id: 2, title: 'Tipi', image: tipiImage, selected: false},
        { id: 3, title: 'Yurt', image: yurtImage, selected: false},
        { id: 4, title: 'Igloo/Dome', image: iglooImage, selected: false},

        { id: 5, title: 'RV Camper', image:rvImage, selected: false },
        { id: 6, title: 'Treehouse', image: treeImage, selected: false},
        { id: 7, title: 'Tiny House', image: tinyImage, selected: false},
        { id: 8, title: 'Cabin', image: cabinImage, selected: false},
        { id: 9, title: 'Hut', image: hutImage, selected: false},

        { id: 10, title: 'Sheperd\'s Hut', image: shepherdImage, selected: false},
        { id: 11, title: 'Glamping Pod', image: podImage, selected: false},
        { id: 12, title: 'Boat/Yacht', image: yachtImage, selected: false},
      ]
    }
  }


  toggleSelected = (id, key) => {
      let temp = this.state[key];
      temp[id].selected = !temp[id].selected;
      this.setState({
        [key]: temp,
      })
  }


  render() {
    return(
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
      const submitDisabled = invalid || disabled || submitInProgress;

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
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          <div>
            <label>Type of the property</label>
            <Dropdown title="Choose the type" list={this.state.glampTypes} toggleItem={this.toggleSelected}/>
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
                  validate={composeValidators(required('required'))}
                />
                <span className="small">  The guests can use the whole place: Bedrooms, kitchens and toilets are available for guests only.</span>
              </label>
              <label>
                <FieldRadioButton
                  name="place"
                  value="private_place"
                  id="private_place"
                  label= "Private place"
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
