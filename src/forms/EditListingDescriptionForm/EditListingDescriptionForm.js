import React, { Component } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import ReactDOMServer from 'react-dom/server';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { nonEmptyArray, maxLength, required, composeValidators, } from '../../util/validators';
import { Field } from 'react-final-form'
import isEqual from 'lodash/isEqual';
import { Form, Button, AddImages, FieldTextInput, ValidationError } from '../../components';
import css from './EditListingDescriptionForm.css';
const TITLE_MAX_LENGTH = 60;
const ACCEPT_IMAGES = 'image/*';


export class EditListingDescriptionFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUploadRequested: false,
    };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.submittedImages = [];
  }

  onImageUploadHandler(file) {
    if (file) {
      this.setState({ imageUploadRequested: true });
      this.props
        .onImageUpload({ id: `${file.name}_${Date.now()}`, file })
        .then(() => {
          this.setState({ imageUploadRequested: false });
        })
        .catch(() => {
          this.setState({ imageUploadRequested: false });
        });
    }
  }

  UpdateTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    if (this.props.initialValues && !this.props.initialValues.description
      || !this.props.initialValues.glamping_rules) {
      this.props.initialValues.description = this.state.description || this.props.initialValues.description
      this.props.initialValues.glamping_rules = this.state.glamping_rules || this.props.initialValues.glamping_rules
      this.props.initialValues.title = this.state.title || this.props.initialValues.title
    }
    return <FinalForm
      {...this.props}
      onImageUploadHandler={this.onImageUploadHandler}
      imageUploadRequested={this.state.imageUploadRequested}
      render={fieldRenderProps => {
        const {
          categories,
          className,
          disabled,
          handleSubmit,
          intl,
          ready,
          invalid,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          images,
          fetchErrors,
          handlePlaceTheme,
          placeTheme,
          validateImageUploaded,
          onRemoveImage,
          IsImageUploaded,
          form,
          imageUploadRequested,
          onImageUploadHandler,


        } = fieldRenderProps;
        const chooseImageText = (
          <span className={css.chooseImageText}>
            <span className={css.chooseImage}>
              <FormattedMessage id="EditListingPhotosForm.chooseImage" />
            </span>
            <span className={css.imageTypes}>
              <FormattedMessage id="EditListingPhotosForm.imageTypes" />
            </span>
          </span>
        );
        const arrayOfImgIds = imgs =>
          imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));

        const imageIdsFromProps = arrayOfImgIds(images);
        const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages);

        const submittedOnce = this.submittedImages.length > 0;
        const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit);

        const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages;

        const imageRequiredMessage = intl.formatMessage({
          id: 'EditListingPhotosForm.imageRequired',
        });

        const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
        const titlePlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.titlePlaceholder',
        });
        const titleRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.titleRequired',
        });
        const maxLengthMessage = intl.formatMessage(
          { id: 'EditListingDescriptionForm.maxLength' },
          {
            maxLength: TITLE_MAX_LENGTH,
          }
        );
        const descriptionMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.description',
        });

        const descriptionPlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.descriptionPlaceholder',
        });
        const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
        const descriptionRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.descriptionRequired',
        });

        const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
        const errorMessageUpdateListing = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
          </p>
        ) : null;


        // This error happens only on first tab (of EditListingWizard)
        const errorMessageCreateListingDraft = createListingDraftError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
          </p>
        ) : null;

        const classes = classNames(css.root, className);
        const submitReady = (updated && pristineSinceLastSubmit) || ready;
        const submitInProgress = updateInProgress;
        let submitDisabled =
          invalid || disabled || submitInProgress || imageUploadRequested || ready;

        const djsConfig = {
          previewTemplate: ReactDOMServer.renderToStaticMarkup(
            <div className="dz-preview dz-file-preview">

              <div className="dz-details">
                <div className="dz-filename"><span data-dz-name="true"></span></div>
                <img data-dz-thumbnail="true" />
              </div>
              <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
            </div>
          )
        }
        const eventHandlers = {
          addedfile: (file) => {
            validateImageUploaded()
            this.props.onImageUpload({ id: Date.now(), file })
          }

        }

        const componentConfig = {
          iconFiletypes: ['.jpg', '.png', '.gif'],
          postUrl: 'no-url',
          showFiletypeIcon: true,
        };

        let placeThemeKeys = Object.keys(placeTheme);

        let filteredplaceThemeKeys = placeThemeKeys.filter(function (key) {
          return placeTheme[key]
        });
        // if (filteredplaceThemeKeys.length < 1 || !IsImageUploaded) {
        //   submitDisabled = true
        // }

        return (
          <Form className={classes} onSubmit={handleSubmit} onChange={(e) => {
            this.UpdateTextChange(e)
          }
          }>
            {errorMessageCreateListingDraft}
            {errorMessageUpdateListing}
            {errorMessageShowListing}
            <FieldTextInput
              id="title"
              name="title"
              className={css.title}
              type="text"
              label={titleMessage}
              placeholder={titlePlaceholderMessage}
              maxLength={TITLE_MAX_LENGTH}
              validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
              autoFocus
            />

            <FieldTextInput
              id="description"
              name="description"
              className={css.description}
              type="textarea"
              label={descriptionMessage}
              placeholder={descriptionPlaceholderMessage}
              validate={composeValidators(required(descriptionRequiredMessage))}
            />

            <FieldTextInput
              id="glamping_rules"
              name="glamping_rules"
              className={css.description}
              type="textarea"
              label={"Glamping Rules"}
              placeholder={"Rules"}
              validate={composeValidators(required("You need to add a rules."))}
            />
            <div>
              <label >Choose the theme of your place</label>
              <div className={css.buttonLayout} onClick={(e) => {
                handlePlaceTheme(e.target.value)
              }}>

                <Button
                  className={css.themeButton}
                  name="place_theme"
                  type="button"
                  value='couple_friendly'
                >
                  {'couple friendly'}
                </Button>

                <Button
                  className={css.themeButton}
                  name="place_theme"
                  type="button"
                  value='family_friendly'
                >
                  {'family-friendly'}
                </Button>

                <Button
                  className={css.themeButton}
                  name="place_theme"
                  type="button"
                  value='pet_friendly'
                >
                  {'pet-friendly'}
                </Button>
                <Button
                  className={css.themeButton}
                  name="place_theme"
                  type="button"
                  value='for_single_trip'
                >
                  {'for single trip'}
                </Button>

              </div>
              <AddImages
                className={css.imagesField}
                images={images}
                thumbnailClassName={css.thumbnail}
                savedImageAltText={intl.formatMessage({
                  id: 'EditListingPhotosForm.savedImageAltText',
                })}
                onRemoveImage={onRemoveImage}
              >
                <Field
                  id="addImage"
                  name="addImage"
                  accept={ACCEPT_IMAGES}
                  form={null}
                  label={chooseImageText}
                  type="file"
                  disabled={imageUploadRequested}
                >
                  {fieldprops => {
                    const { accept, input, label, type, disabled } = fieldprops;
                    const { name } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`addImage`, file);
                      form.blur(`addImage`);
                      onImageUploadHandler(file);
                    };
                    const inputProps = { accept, id: name, name, onChange, type };
                    return (
                      <div className={css.addImageWrapper}>
                        <div className={css.aspectRatioWrapper}>
                          {disabled ? null : (
                            <input {...inputProps} className={css.addImageInput} />
                          )}
                          <label htmlFor={name} className={css.addImage}>
                            {label}
                          </label>
                        </div>
                      </div>
                    );
                  }}
                </Field>

                <Field
                  component={props => {
                    const { input, type, meta } = props;
                    return (
                      <div className={css.imageRequiredWrapper}>
                        <input {...input} type={type} />
                        <ValidationError fieldMeta={meta} />
                      </div>
                    );
                  }}
                  name="images"
                  type="hidden"
                  validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                />
              </AddImages>

              <span >
                Tip: Choose 5-10 best photos of your place from different angles in a good light that really show the space.
            </span>
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
            <div onClick={() => this.props.history.goBack()}>Back: Travel Info</div>
          </Form>
        );
      }}
    />
  }
}

EditListingDescriptionFormComponent.defaultProps = { className: null, fetchErrors: null };

EditListingDescriptionFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditListingDescriptionFormComponent);
