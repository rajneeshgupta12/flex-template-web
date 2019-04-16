import React, { Component } from 'react';
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

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

   componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node1.contains(e.target) || (!this.node2 || this.node2.contains(e.target))) {
      return;
    }
    this.handleClickOutside();
  }


  render() {

    const { list, selectedIndex, toggleItem } = this.props;
    const { listOpen, headerTitle } = this.state;

    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const selectedItem = selectedIndex > -1 ? list[selectedIndex] : null;
    let headerImage = selectedIndex > -1 ? (
      '<img src={selectedItem.image} className={css.listItemSelectedImage}/>' +
      '<span className=={css.listItemTextSelected}> {selectedItem.title}</span></li>'
    ) : null;


    return (
      <div className={css.dropWrapper} >
        <div className={css.dropHeader} ref={node => this.node1 = node} onClick={() => this.toggleList()}>
          <div className={css.dropHeaderTitle}>
            {selectedIndex == -1 || listOpen ? headerTitle :
              <div className={css.dropHeaderItem}>
                <img src={selectedItem.image} className={css.headerItemImage} />
                <span className={css.headerItemTitle}> {selectedItem.title}</span>
              </div>}
          </div>
          {listOpen ? <Icon className={css.dropIcon} >expand_less</Icon> : <Icon className={css.dropIcon} >expand_more</Icon>}
        </div>

        {listOpen && <div className={css.listWrapper} ref={node => this.node2 = node}><ul className={css.list} >
          {list.map((item) => (
            <li className={css.listItem} key={item.id} onClick={() => toggleItem(item.id)} >
              <img src={item.image} className={item.id == selectedIndex ? css.listItemSelectedImage : css.listItemImage} />
              <div className={css.itemText}>
                <span className={css.itemGhostText}> {item.title}k</span>
                <span className={item.id == selectedIndex ? css.listItemTextSelected : css.listItemText}> {item.title}</span>
              </div>
              </li>))
          }
        </ul></div>}
      </div>
    )
  }
}

//Only allowed to select one item now, determined by selectedIndex
class EditListingBasicFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

      selectedIndex: (props.initialValues.index >= 0 ? props.initialValues.index : -1),

      glampTypes: [{
        id: 0, title: 'Bell Tent', image: tentImage
      },
      { id: 1, title: 'Safari Tent', image: safariImage },
      { id: 2, title: 'Tipi', image: tipiImage },
      { id: 3, title: 'Yurt', image: yurtImage },
      { id: 4, title: 'Dome', image: iglooImage },

      { id: 5, title: 'RV', image: rvImage },
      { id: 6, title: 'Treehouse', image: treeImage },
      { id: 7, title: 'Tiny House', image: tinyImage },
      { id: 8, title: 'Cabin', image: cabinImage },
      { id: 9, title: 'Hut', image: hutImage },

      { id: 10, title: 'Sheperd\'s Hut', image: shepherdImage },
      { id: 11, title: 'Pod', image: podImage },
      { id: 12, title: 'Boat', image: yachtImage },
      ]
    }
  }

  toggleSelected = id => {
    this.setState({
      selectedIndex: id,
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

          this.props.updatePropertyType(this.state.selectedIndex, this.state.glampTypes);
          if (this.state.selectedIndex < 0)
            submitDisabled = true
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              {errorMessageShowListing}
              <div>
                <p>Type of the property</p>
                <Dropdown title="Choose the type" list={this.state.glampTypes}
                  selectedIndex={this.state.selectedIndex} toggleItem={this.toggleSelected} />
              </div>
              <div>
                <p style={{marginBottom: '0px', marginTop: '30px'}}>The guests can use:</p>
                <div>
                  <label>
                    <FieldRadioButton
                      name="place"
                      value="entire_place"
                      id="entire_place"
                      label={"Entire place"}
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
// submitDisabled = activeGlamp[0].length > 0 && this.state.placeSelected ? false : true
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