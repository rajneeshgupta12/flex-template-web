import React, { Component } from 'react';
import { array, bool, func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { withViewport } from '../../util/contextHelpers';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureListing } from '../../util/data';
import { PayoutDetailsForm } from '../../forms';
import { Modal, NamedRedirect, Tabs } from '../../components';

import EditListingWizardTab, {
  AVAILABILITY,
  DESCRIPTION,
  FEATURES,
  POLICY,
  LOCATION,
  PRICING,
  PHOTOS,

  BASIC,
  CAPACITY,
  TRAVEL,
} from './EditListingWizardTab';
import css from './EditListingWizard.css';

// Show availability calendar only if environment variable availabilityEnabled is true
const availabilityMaybe = config.enableAvailability ? [AVAILABILITY] : [];

// TODO: PHOTOS panel needs to be the last one since it currently contains PayoutDetailsForm modal
// All the other panels can be reordered.
export const TABS = [
  BASIC,
  CAPACITY,
  FEATURES,
  LOCATION,
  TRAVEL,
  DESCRIPTION,
  POLICY,
  PRICING,
  ...availabilityMaybe,
  PHOTOS,
];

// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab) => {
  let key = null;
  if (tab === DESCRIPTION) {
    key = 'EditListingWizard.tabLabelDescription';
  } else if (tab === FEATURES) {
    key = 'EditListingWizard.tabLabelFeatures';
  } else if (tab === POLICY) {
    key = 'EditListingWizard.tabLabelPolicy';
  } else if (tab === LOCATION) {
    key = 'EditListingWizard.tabLabelLocation';
  } else if (tab === PRICING) {
    key = 'EditListingWizard.tabLabelPricing';
  } else if (tab === AVAILABILITY) {
    key = 'EditListingWizard.tabLabelAvailability';
  } else if (tab === PHOTOS) {
    key = 'EditListingWizard.tabLabelPhotos';
  } else if (tab === BASIC) {
    key = 'EditListingWizard.tabLabelBasic';
  } else if (tab === CAPACITY) {
    key = 'EditListingWizard.tabLabelCapacity';
  } else if (tab === TRAVEL) {
    key = 'EditListingWizard.tabLabelTravel';
  }

  return intl.formatMessage({ id: key });
};

/**
 * Check if a wizard tab is completed.
 *
 * @param tab wizard's tab
 * @param listing is contains some specific data if tab is completed
 *
 * @return true if tab / step is completed.
 */
const tabCompleted = (tab, listing, previousTabIndex) => {
  const {
    availabilityPlan,
    description,
    geolocation,
    price,
    title,
    publicData,
  } = listing.attributes;
  const images = listing.images;
  switch (tab) {
    case DESCRIPTION:
    return false
    //   // return !!(description && title);
    // case FEATURES:
    // return true

    //   // return !!(publicData && (publicData.amenities_glamping || publicData.amenities_hospitality));
    // case POLICY:
    // // return true

    //   return !!(publicData && typeof publicData.rules !== 'undefined');
    case LOCATION:
    return false

    //   return !!(geolocation && publicData && publicData.location && publicData.location.address);
    // case PRICING:
    // return true
    //   // return !!price;
    // case AVAILABILITY:
    //   return true;
    // case PHOTOS:
    // return true
    //   // return images && images.length > 0;
    // case BASIC:
    //   return true;
    // case CAPACITY:
    // return true

      // return publicData.place ? true : false;
    // case TRAVEL:
    //   return true;
    default:
      return true;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (isNew, listing) => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;
    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], listing, previousTabIndex) : true;

    return { ...acc, [tab]: isActive };
  }, {});
};

const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

// Create a new or edit listing through EditListingWizard
class EditListingWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.state = {
      draftId: null,
      showPayoutDetails: false,
    };
    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
    this.handlePublishListing = this.handlePublishListing.bind(this);
    this.handlePayoutModalClose = this.handlePayoutModalClose.bind(this);
    this.handlePayoutSubmit = this.handlePayoutSubmit.bind(this);
    this.updateCapacityValues = this.updateCapacityValues.bind(this);

  }

  updateCapacityValues(name, type, defaultValues) {
    let value = this.state[name]
    if (type == 'increment') {
      value += 1
    }
    if (type == 'derement') {
      value -= 1
    }
    (value >= defaultValues[name].minVal && value <= defaultValues[name].maxVal) ? this.setState({ [name]: value }) : this.setState({ [name]: defaultValues[name][name] })
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }

  handlePublishListing(id) {
    const { onPublishListingDraft, currentUser } = this.props;
    const stripeConnected =
      currentUser && currentUser.attributes && currentUser.attributes.stripeConnected;
    if (stripeConnected) {
      onPublishListingDraft(id);
    } else {
      this.setState({
        draftId: id,
        showPayoutDetails: true,
      });
    }
  }

  handlePayoutModalClose() {
    this.setState({ showPayoutDetails: false });
  }

  handlePayoutSubmit(values) {
    const { fname: firstName, lname: lastName, ...rest } = values;
    this.props
      .onPayoutDetailsSubmit({ firstName, lastName, ...rest })
      .then(() => {
        this.setState({ showPayoutDetails: false });
        this.props.onManageDisableScrolling('EditListingWizard.payoutModal', false);
        this.props.onPublishListingDraft(this.state.draftId);
      })
      .catch(() => {
        // do nothing
      });
  }

  render() {
    const {
      id,
      className,
      rootClassName,
      params,
      listing,
      viewport,
      intl,
      errors,
      fetchInProgress,
      onManageDisableScrolling,
      onPayoutDetailsFormChange,
      ...rest
    } = this.props;

    const selectedTab = params.tab;
    const isNewListingFlow = [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      params.type
    );
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);
    const currentListing = ensureListing(listing);
    const tabsStatus = tabsActive(isNewListingFlow, currentListing);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab);
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditListingPage" params={{ ...params, tab: nearestActiveTab }} />;
    }

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const tabLink = tab => {
      return { name: 'EditListingPage', params: { ...params, tab } };
    };
    const { guestNumber, bedsNumber, bedroomsNumber, bathroomsNumber } = this.state
    return (
      <div className={classes}>
        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {TABS.map(tab => {
            return (
              <EditListingWizardTab
                {...rest}
                {...this.props}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab)}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewListingFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                listing={listing}
                marketplaceTabs={TABS}
                errors={errors}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
                handlePublishListing={this.handlePublishListing}
                fetchInProgress={fetchInProgress}
                guestNumber={guestNumber}
                bedsNumber={bedsNumber}
                bedroomsNumber={bedroomsNumber}
                bathroomsNumber={bathroomsNumber}
                updateCapacityValues={this.updateCapacityValues}
              />
            );
          })}
        </Tabs>
        <Modal
          id="EditListingWizard.payoutModal"
          isOpen={this.state.showPayoutDetails}
          onClose={this.handlePayoutModalClose}
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <div className={css.modalPayoutDetailsWrapper}>
            <h1 className={css.modalTitle}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitleOneMoreThing" />
              <br />
              <FormattedMessage id="EditListingPhotosPanel.payoutModalTitlePayoutPreferences" />
            </h1>
            <p className={css.modalMessage}>
              <FormattedMessage id="EditListingPhotosPanel.payoutModalInfo" />
            </p>
            <PayoutDetailsForm
              className={css.payoutDetails}
              inProgress={fetchInProgress}
              createStripeAccountError={errors ? errors.createStripeAccountError : null}
              onChange={onPayoutDetailsFormChange}
              onSubmit={this.handlePayoutSubmit}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

EditListingWizard.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingWizard.propTypes = {
  id: string.isRequired,
  className: string,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(TABS).isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: shape({
    attributes: shape({
      publicData: object,
      description: string,
      geolocation: object,
      pricing: object,
      title: string,
    }),
    images: array,
  }),

  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
    uploadImageError: object,
    createStripeAccountError: object,
  }).isRequired,
  fetchInProgress: bool.isRequired,
  onPayoutDetailsFormChange: func.isRequired,
  onPayoutDetailsSubmit: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(
  withViewport,
  injectIntl
)(EditListingWizard);
