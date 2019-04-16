import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import DropzoneComponent from 'react-dropzone-component';
import ReactDOMServer from 'react-dom/server';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Field } from 'react-final-form'

import { Form, Button, FieldTextInput, EditListingPhotosPanel } from '../../components';
import css from './EditListingDescriptionForm.css';
const TITLE_MAX_LENGTH = 60;


const EditListingDescriptionFormComponent = props => (

  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        categories,
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
        handlePlaceTheme,
        placeTheme,
        validateImageUploaded,
        IsImageUploaded
      } = fieldRenderProps;

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
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      let submitDisabled = invalid || disabled || submitInProgress;

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
         props.onImageUpload({ id: Date.now(), file })
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
     if (filteredplaceThemeKeys.length < 1 || !IsImageUploaded) {
        submitDisabled = true
      }
      return (
        <Form className={classes} onSubmit={handleSubmit}>
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
            <label>
              Photos
               </label>
            <DropzoneComponent config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            >
              <div className="dz-message">+ Choose an image…</div>
            </DropzoneComponent>

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
          <div onClick={() => props.history.goBack()}>Back: Travel Info</div>
        </Form>
      );
    }}
  />
);

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
