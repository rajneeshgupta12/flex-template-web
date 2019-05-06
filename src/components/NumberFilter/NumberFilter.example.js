import React from 'react';
import { withRouter } from 'react-router-dom';
import { stringify, parse } from '../../util/urlHelpers';

import NumberFilter from './NumberFilter';

const URL_PARAM = 'pub_Number';
const RADIX = 10;

// Helper for submitting example
const handleSubmit = (urlParam, values, history) => {
  const { minNumber, maxNumber } = values || {};
  const queryParams =
    minNumber != null && maxNumber != null
      ? `?${stringify({ [urlParam]: [minNumber, maxNumber].join(',') })}`
      : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const NumberFilterWrapper = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const Number = params[URL_PARAM];
  const valuesFromParams = !!Number ? Number.split(',').map(v => Number.parseInt(v, RADIX)) : [];
  const initialValues = !!Number
    ? {
        minNumber: valuesFromParams[0],
        maxNumber: valuesFromParams[1],
      }
    : null;

  return (
    <NumberFilter
      {...props}
      initialValues={initialValues}
      onSubmit={(urlParam, values) => {
        console.log('Submit NumberFilterForm with (unformatted) values:', values);
        handleSubmit(urlParam, values, history);
      }}
    />
  );
});

export const NumberFilterPopup = {
  component: NumberFilterWrapper,
  props: {
    id: 'NumberFilterPopupExample',
    urlParam: URL_PARAM,
    min: 0,
    max: 1000,
    step: 5,
    liveEdit: false,
    showAsPopup: true,
    contentPlacementOffset: -14,
    // initialValues: handled inside wrapper
    // onSubmit: handled inside wrapper
  },
  group: 'misc',
};

export const NumberFilterPlain = {
  component: NumberFilterWrapper,
  props: {
    id: 'NumberFilterPlainExample',
    urlParam: URL_PARAM,
    min: 0,
    max: 1000,
    step: 5,
    liveEdit: true,
    showAsPopup: false,
    contentPlacementOffset: -14,
    // initialValues: handled inside wrapper
    // onSubmit: handled inside wrapper
  },
  group: 'misc',
};
