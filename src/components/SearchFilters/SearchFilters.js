import React from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import {
  BookingDateRangeFilter,
  SelectSingleFilter,
  SelectMultipleFilter,
  PriceFilter,
  NumberFilter
} from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';
import { createResourceLocatorString } from '../../util/routes';
import { propTypes } from '../../util/types';
import css from './SearchFilters.css';

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(',') : [];
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
      minPrice: valuesFromParams[0],
      maxPrice: valuesFromParams[1],
    }
    : null;
};

const initialDateRangeValue = (queryParams, paramName) => {
  if (queryParams.endDate && queryParams.startDate) {
    const startDate = queryParams['startDate'];
    const endDate = queryParams['endDate'];
    const rawValuesFromParams = [startDate, endDate];
    const valuesFromParams = rawValuesFromParams.map(v => parseDateFromISO8601(v));
    const initialValues =
      valuesFromParams.length === 2
        ? {
          dates: { startDate: valuesFromParams[0], endDate: valuesFromParams[1] },
        }
        : { dates: null };
    return initialValues;
  }
};

const SearchFiltersComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    categoryFilter,
    oasisTypeFilter,
    amenitiesFilter,
    priceFilter,
    dateRangeFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    themeFilter,
    intl,
  } = props;

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const glampersLabel = intl.formatMessage({
    id: 'SearchFilters.glampersLabel',
  });

  const oasisTypeLabel = intl.formatMessage({
    id: 'SearchFilters.oasisTypeLabel',
  });

  const themeLabel = intl.formatMessage({
    id: 'SearchFilters.themeLabel',
  });
  const morefilterLabel = intl.formatMessage({
    id: 'SearchFilters.morefilterLabel',
  });
  const categoryLabel = intl.formatMessage({
    id: 'SearchFilters.categoryLabel',
  });

  const amenitiesLabel = intl.formatMessage({
    id: 'SearchFilters.amenitiesLabel',
  });

  const initialAmenities = amenitiesFilter
    ? initialValues(urlQueryParams, amenitiesFilter.paramName)
    : null;

  const initialCategory = categoryFilter
    ? initialValue(urlQueryParams, categoryFilter.paramName)
    : null;

  const initialoasisType = oasisTypeFilter
    ? initialValue(urlQueryParams, oasisTypeFilter.paramName)
    : null;

  const initialtheme = themeFilter
    ? initialValue(urlQueryParams, themeFilter.paramName)
    : null;



  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  const initialDateRange = dateRangeFilter
    ? initialDateRangeValue(urlQueryParams, dateRangeFilter.paramName)
    : null;

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleSelectOption = (urlParam, option) => {
    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handlePrice = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };
  const updateSearch = (glampers) => {
    console.log('updateSearch--', glampers)

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, {'pub_max_guest_number':`${glampers}`}));
  }

  const handleNumber = (urlParam, range) => {
    console.log('urlParam, range-------', urlParam, range)
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleDateRange = (urlParam, dateRange) => {
    const hasDates = dateRange && dateRange.dates;
    const { startDate, endDate } = hasDates ? dateRange.dates : {};

    const start = startDate ? stringifyDateToISO8601(startDate) : null;
    const end = endDate ? stringifyDateToISO8601(endDate) : null;

    const queryParams =
      start != null && end != null
        ? { ...urlQueryParams, [urlParam]: `${start},${end}` }
        : omit(urlQueryParams, urlParam);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const categoryFilterElement =
    categoryFilter ? (
      <NumberFilter
        id={glampersLabel}
        urlParam={priceFilter.paramName}
        onSubmit={()=>{}}
        updateSearch={updateSearch}
        showAsPopup={true}
        {...priceFilter.config}
        // initialValues={initialPriceRange}
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}

      // urlParam={categoryFilter.paramName}
      // label={glampersLabel}
      // onSelect={handleSelectOption}
      // showAsPopup
      // options={categoryFilter.options}
      // initialValue={initialCategory}
      // contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;
    const oasisTypeFilterElement = oasisTypeFilter ? (
      <SelectMultipleFilter
        urlParam={oasisTypeFilter.paramName}
        label={oasisTypeLabel}
        name={'oasisType'}
        id={'oasisType'}
        onSelect={handleSelectOption}
        showAsPopup
        options={oasisTypeFilter.options}
        initialValue={initialoasisType}
        onSubmit={handleSelectOptions}

        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />
    ) : null;
    const instaBookingFilterElement =      <SelectMultipleFilter
        urlParam={oasisTypeFilter.paramName}
        label={"Insta Booking"}
        name={'insta-booking'}
        id={'insta-booking'}
        onSelect={handleSelectOption}
        showAsPopup
        options={[]}
        initialValue={initialoasisType}
        onSubmit={handleSelectOptions}

        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      />



  const themeFilterElement = themeFilter ? (
    <SelectMultipleFilter
      urlParam={themeFilter.paramName}
      label={themeLabel}
      onSelect={handleSelectOption}
      name={'theme'}
      id={'theme'}
      showAsPopup
      options={themeFilter.options}
      initialValue={initialtheme}
      onSubmit={handleSelectOptions}

      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const amenitiesFilterElement = amenitiesFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.amenitiesFilter'}
      name="amenities"
      urlParam={amenitiesFilter.paramName}
      label={amenitiesLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={amenitiesFilter.options}
      initialValues={initialAmenities}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const priceFilterElement = priceFilter ? (
    <PriceFilter
      id="SearchFilters.priceFilter"
      urlParam={priceFilter.paramName}
      onSubmit={handlePrice}
      showAsPopup
      {...priceFilter.config}
      initialValues={initialPriceRange}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const dateRangeFilterElement =
    dateRangeFilter && dateRangeFilter.config.active ? (
      <BookingDateRangeFilter
        id="SearchFilters.dateRangeFilter"
        urlParam={dateRangeFilter.paramName}
        onSubmit={handleDateRange}
        showAsPopup
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        initialValues={initialDateRange}
      />
    ) : null;

  const toggleSearchFiltersPanelButtonClasses =
    isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
    <button
      className={toggleSearchFiltersPanelButtonClasses}
      onClick={() => {
        toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
      }}
    >
      <FormattedMessage
        id="SearchFilters.moreFiltersButton"
        values={{ count: searchFiltersPanelSelectedCount }}
      />
    </button>
  ) : null;
  return (
    <div className={classes}>
      <div className={css.filters}>
        {dateRangeFilterElement}
        {categoryFilterElement}
        {oasisTypeFilterElement}
        {priceFilterElement}
        {themeFilterElement}
        {instaBookingFilterElement}
        {toggleSearchFiltersPanelButton}
      </div>

      {listingsAreLoaded && resultsCount > 0 ? (
        <div className={css.searchResultSummary}>
          <span className={css.resultsFound}>
            <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
          </span>
        </div>
      ) : null}

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFilters.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFilters.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  categoryFilter: null,
  amenitiesFilter: null,
  priceFilter: null,
  dateRangeFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  categoriesFilter: propTypes.filterConfig,
  amenitiesFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  dateRangeFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(
  withRouter,
  injectIntl
)(SearchFiltersComponent);

export default SearchFilters;
