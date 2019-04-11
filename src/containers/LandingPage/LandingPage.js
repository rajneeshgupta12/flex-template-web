import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { loadData, getAllListings } from './LandingPage.duck';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  SectionLocations,
  SectionHost,
  SectionDiscover,
  SectionRecommendation,
  SectionInterview,
  SectionType,
  SectionAbout,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './LandingPage.css';

export class LandingPageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      props: {},
      endDate: '',
      startDate: ''
    };
  }

  handleSubmit = (values) => {

    const { currentSearchParams } = this.props;
    const { search, selectedPlace } = values.location;
    const { history } = this.props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};

    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      address: search,
      bounds
    };
    this.setState({ searchParams })
  }

  componentDidMount() {
    this.props.loadData()
    let startDate, endDate, startday,
      sDate = new Date(), eDate = new Date(),
      lastday = sDate.getDate() - (sDate.getDay() - 1) + 6;
    endDate = new Date(sDate.setDate(lastday));
    startday = eDate.getDate() - (eDate.getDay() - 1) + 5;
    startDate = new Date(eDate.setDate(startday));
    this.setState({ endDate, startDate })
  }


  componentWillReceiveProps(newProps) {
    this.setState({ props: newProps });
  }

  toggleCalendar = () => {
    const { showCalendar } = this.state

    showCalendar ? this.setState({ showCalendar: false }) : this.setState({ showCalendar: true })
  }

  onDateChange = (dates) => {
    this.setState(dates);
  }

  submitSsearch = () => {
    const { history } = this.props;
    let { searchParams, endDate, startDate } = this.state
    if (endDate) {
      if (!searchParams) {
        searchParams = {}
      }
    }
    if (searchParams || endDate) {
      searchParams['endDate'] = Date.parse(endDate)
      searchParams['startDate'] = Date.parse(startDate)
      history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
    }
  }

  render() {
    const { history, intl, location, scrollingDisabled } = this.props;
    let { props, showCalendar } = this.state
    // http://schema.org
    // We are using JSON-LD format
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
    const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
    const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
    // const listing = props.showListing('5c63bee0-e3d8-4d64-ac7a-3914ea0c914c')

    let userName = null
    userName = props && props.result && props.result.user && props.result.user.currentUser &&
      props.result.user.currentUser.attributes &&
      props.result.user.currentUser.attributes.profile &&
      props.result.user.currentUser.attributes.profile.firstName
    return (
      <Page
        className={css.root}
        scrollingDisabled={scrollingDisabled}
        contentType="website"
        description={schemaDescription}
        title={schemaTitle}
        facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
        twitterImages={[
          { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
        ]}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'WebPage',
          description: schemaDescription,
          name: schemaTitle,
          image: [schemaImage],
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.heroContainer}>
              <SectionHero
                onSearchSubmit={this.handleSubmit}
                className={css.hero} history={history} location={location} userName={userName || null}
                toggleCalendar={this.toggleCalendar}
                showCalendar={showCalendar}
                onChange={this.onDateChange}
                submitSsearch={this.submitSsearch}
              />
            </div>
            <ul className={css.sections}>

              <li className={css.sectionOverflow}>
                <div className={css.sectionContentFirstChild}>
                  <SectionDiscover />
                </div>
              </li>
              <li className={css.section}>
                <div className={css.sectionContent}>
                  <SectionRecommendation {...props} />
                </div>
              </li>
              <li className={css.sectionOverflow}>
                <div className={css.sectionContent}>
                  <SectionType />
                </div>
              </li>
              <li className={css.section}>
                <div className={css.sectionContent}>
                  <SectionInterview />
                </div>
              </li>

              <li className={css.section}>
                <div className={css.sectionContent}>
                  <SectionHowItWorks />
                </div>
              </li>

            </ul>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
};

const { bool, object } = PropTypes;

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = (state, landingPageReducer) => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
    result: state,
  };
};


const mapDispatchToProps = dispatch => ({
  // getAllListings: () => dispatch(getAllListings()),
  loadData: () => dispatch(loadData())
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(LandingPageComponent);
// LandingPage.getAllListings = loadData;
export default LandingPage;
