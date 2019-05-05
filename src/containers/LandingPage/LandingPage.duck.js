import { types as sdkTypes } from '../../util/sdkLoader';
import reverse from 'lodash/reverse';
import sortBy from 'lodash/sortBy';
import { storableError } from '../../util/errors';
import { parse } from '../../util/urlHelpers';
import { TRANSITIONS } from '../../util/transaction';
import { addMarketplaceEntities } from '../../ducks/marketplaceData.duck';

const { UUID } = sdkTypes;

const sortedTransactions = txs =>
  reverse(
    sortBy(txs, tx => {
      return tx.attributes ? tx.attributes.lastTransitionedAt : null;
    })
  );
// ================ Action types ================ //

export const GET_TX_SUCCESS = 'app/LandingPage/GET_TX_SUCCESS';
export const GET_TX_ERROR = 'app/LandingPage/GET_TX_ERROR';
export const GET_LISTING_BOOKING_SUCCESS = 'app/LandingPage/GET_LISTING_BOOKING_SUCCESS';
export const GET_LISTING_BOOKING_ERROR = 'app/LandingPage/GET_LISTING_BOOKING_ERROR';
export const GET_ALL_OWN_LISTINGS_SUCCESS = 'app/LandingPage/GET_ALL_OWN_LISTINGS_SUCCESS';
export const GET_ALL_OWN_LISTINGS_ERROR = 'app/LandingPage/GET_ALL_OWN_LISTINGS__ERROR';
export const GET_ALL_LISTINGS_SUCCESS = 'app/LandingPage/GET_ALL_LISTINGS_SUCCESS';
export const GET_ALL_LISTINGS_ERROR = 'app/LandingPage/GET_ALL_LISTINGS__ERROR';
export const GET_QUERY_LISTINGS_SUCCESS = 'app/LandingPage/GET_QUERY_LISTINGS_SUCCESS';
export const GET_QUERY_LISTINGS_ERROR = 'app/LandingPage/GET_QUERY_LISTINGS__ERROR';

export const FETCH_ORDERS_OR_SALES_REQUEST = 'app/InboxPage/FETCH_ORDERS_OR_SALES_REQUEST';
export const FETCH_ORDERS_OR_SALES_SUCCESS = 'app/InboxPage/FETCH_ORDERS_OR_SALES_SUCCESS';
export const FETCH_ORDERS_OR_SALES_ERROR = 'app/InboxPage/FETCH_ORDERS_OR_SALES_ERROR';

// ================ Reducer ================ //

const initialState = {
  id: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  timeSlots: null,
  sendEnquiryInProgress: false,
  sendEnquiryError: null,
  enquiryModalOpenForListingId: null,

  fetchInProgress: false,
  fetchOrdersOrSalesError: null,
  pagination: null,
  transactionRefs: [],
};


const entityRefs = entities =>
  entities.map(entity => ({
    id: entity.id,
    type: entity.type,
  }));

const landingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LISTING_BOOKING_SUCCESS: {
      let temp = []
      if (state.allBookings && state.allBookings.data) {
        temp = state.allBookings.data.data
      }
      temp.forEach(booking => {
        payload.data.data.push(booking)
      })
      return { ...state, allBookings: payload };
    }
    case GET_ALL_LISTINGS_SUCCESS: {
      if (payload.data.included) {
        payload.data.data['includedRelationships'] = payload.data.included
      }
      return { ...state, listings: payload };
    }

    case GET_ALL_LISTINGS_ERROR:
      return { ...state, fetchTimeSlotsError: payload };

    case GET_TX_SUCCESS: {
      return { ...state, Tx: payload };
    }

    case GET_TX_ERROR:
      return { ...state, getTx: payload };

    case GET_ALL_OWN_LISTINGS_SUCCESS: {
      if (payload.data.included) {
        payload.data.data['includedRelationships'] = payload.data.included
      }
      return { ...state, ownListings: payload };
    }

    case GET_ALL_OWN_LISTINGS_ERROR:
      return { ...state, ownListingsError: payload };

    case GET_LISTING_BOOKING_ERROR:
      return { ...state, getListingBookingsError: payload };

    case GET_QUERY_LISTINGS_SUCCESS: {
      if (payload.data.data.length) {
        return { ...state, listings: payload };
      }
      else {
        let oasises = state.visitedOasises || []
        if (oasises.length > 2) {
          oasises.shift()
        }
        oasises.push(payload)
        return { ...state, visitedOasises: oasises };
      }
    }

    case GET_QUERY_LISTINGS_ERROR:
      return { ...state, getQueryListingError: payload };


    case FETCH_ORDERS_OR_SALES_REQUEST:
      return { ...state, fetchInProgress: true, fetchOrdersOrSalesError: null };
    case FETCH_ORDERS_OR_SALES_SUCCESS: {
      const transactions = sortedTransactions(payload.data.data);
      return {
        ...state,
        fetchInProgress: false,
        transactionRefs: entityRefs(transactions),
        pagination: payload.data.meta,
      };
    }
    case FETCH_ORDERS_OR_SALES_ERROR:
      console.error(payload); // eslint-disable-line
      return { ...state, fetchInProgress: false, fetchOrdersOrSalesError: payload };


    default:
      return state;
  }
};

export default landingPageReducer;

// ================ Action creators ================ //


const fetchOrdersOrSalesRequest = () => ({ type: FETCH_ORDERS_OR_SALES_REQUEST });
const fetchOrdersOrSalesSuccess = response => ({
  type: FETCH_ORDERS_OR_SALES_SUCCESS,
  payload: response,
});
const fetchOrdersOrSalesError = e => ({
  type: FETCH_ORDERS_OR_SALES_ERROR,
  error: true,
  payload: e,
});

const INBOX_PAGE_SIZE = 10;


export const getAllOwnListings = (listingId, dispatch, getState, sdk) => {
  return sdk.ownListings.query({include:['images','author']})
    .then(response => {
      return dispatch(getAllOwnListingsSuccess(response))
    })
    .catch(e => {
      return dispatch(getAllOwnListingsError(e))
    });
}

export const getAllListings = (listingId) => (dispatch, getState, sdk) => {
  getAllOwnListings(listingId, dispatch, getState, sdk)
  return sdk.listings.query({
    authorId: undefined,
    include: ["images",'author'],
    'fields.image': [
      // Listing page
      'variants.landscape-crop',
      'variants.landscape-crop2x',
      'variants.landscape-crop4x',
      'variants.landscape-crop6x',

      // Social media
      'variants.facebook',
      'variants.twitter',

      // Image carousel
      'variants.scaled-small',
      'variants.scaled-medium',
      'variants.scaled-large',
      'variants.scaled-xlarge',

      // Avatars
      'variants.square-small',
      'variants.square-small2x',
      "url"
    ],
    expand: true

  })
    .then(response => {
      return dispatch(getAllListingsSuccess(response))
    })
    .catch(e => {
      return dispatch(getAllListingsError(e))
    });
};


export const getTx = (tx) => async (dispatch, getState, sdk) => {
  const params = {
    id: new UUID(tx),
    include: ['customer','provider'],
  };

  sdk.transactions.show(params, { expand: true })
    .then(response => {
      return dispatch(getTxSuccess(response));
    })
    .catch(e => {
      return dispatch(getTxError(e));
    });
};


export const getTxError = error => ({
  type: GET_TX_ERROR,
  error: true,
  payload: error,
});

export const getTxSuccess = tx => (
  {
    type: GET_TX_SUCCESS,
    payload: tx,
  }
);

export const getQueryListing = (listingId, isOwn = false) => async (dispatch, getState, sdk) => {

  const params = {
    id: listingId,
    include: ['author', 'author.profileImage', 'images'],
    'fields.image': [
      // Listing page
      'variants.landscape-crop',
      'variants.landscape-crop2x',
      'variants.landscape-crop4x',
      'variants.landscape-crop6x',

      // Social media
      'variants.facebook',
      'variants.twitter',

      // Image carousel
      'variants.scaled-small',
      'variants.scaled-medium',
      'variants.scaled-large',
      'variants.scaled-xlarge',

      // Avatars
      'variants.square-small',
      'variants.square-small2x',
      "url"
    ],
  };
  const show = isOwn ? await sdk.ownListings.show(params, { expand: true }) : await sdk.listings.show(params, { expand: true })
  return dispatch(getQueryListingSuccess(show))
};


export const getQueryListingError = error => ({
  type: GET_ALL_LISTINGS_ERROR,
  error: true,
  payload: error,
});

export const getQueryListingSuccess = listings => ({
  type: GET_QUERY_LISTINGS_SUCCESS,
  payload: listings,
});

export const getListingBookings = (listingId, isOwn = true) => async (dispatch, getState, sdk) => {
  let date = new Date();
  let start = date.toISOString();
  date.setDate(date.getDate() + 85)
  let end = date.toISOString();

  const params = {
    listingId: new UUID(listingId),
    start: new Date(start),
    end: new Date(end),
    include: ['transaction', { expand: true }],
    expand: true
  };


  sdk.bookings.query(params, { expand: true })
    .then(response => {
      response.data['listingId'] = new UUID(listingId)
      return dispatch(getListingBookingsSuccess(response));
    })
    .catch(e => {
      return dispatch(getListingBookingsError(e));
    });
};

export const getListingBookingsError = error => ({
  type: GET_LISTING_BOOKING_ERROR,
  error: true,
  payload: error,
});

export const getListingBookingsSuccess = listings => ({
  type: GET_LISTING_BOOKING_SUCCESS,
  payload: listings,
});

export const getAllListingsError = error => ({
  type: GET_ALL_LISTINGS_ERROR,
  error: true,
  payload: error,
});

export const getAllListingsSuccess = listings => ({
  type: GET_ALL_LISTINGS_SUCCESS,
  payload: listings,
});

export const getAllOwnListingsError = error => ({
  type: GET_ALL_OWN_LISTINGS_ERROR,
  error: true,
  payload: error,
});

export const getAllOwnListingsSuccess = listings => ({
  type: GET_ALL_OWN_LISTINGS_SUCCESS,
  payload: listings,
});


export const loadData = () => dispatch => {
  return dispatch(getAllListings());
};

export const loadBookingData = (params, search) => (dispatch, getState, sdk) => {

  dispatch(fetchOrdersOrSalesRequest());

  const { page = 1 } = parse(search);

  const apiQueryParamsSale = {
    only: 'sale',
    lastTransitions: TRANSITIONS,
    include: ['provider', 'provider.profileImage', 'customer', 'customer.profileImage', 'booking'],
    'fields.image': ['variants.square-small', 'variants.square-small2x'],
    page,
    per_page: INBOX_PAGE_SIZE,
  };

  const apiQueryParamsOrder = {
    only: 'order',
    lastTransitions: TRANSITIONS,
    include: ['provider', 'listing','provider.profileImage', 'customer', 'customer.profileImage', 'booking'],
    'fields.image': ['variants.square-small', 'variants.square-small2x'],
    page,
    per_page: INBOX_PAGE_SIZE,
  };

  sdk.transactions
    .query(apiQueryParamsSale)
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchOrdersOrSalesSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(fetchOrdersOrSalesError(storableError(e)));
      throw e;
    });
  sdk.transactions
    .query(apiQueryParamsOrder)
    .then(response => {
      dispatch(addMarketplaceEntities(response));
      dispatch(fetchOrdersOrSalesSuccess(response));
      return response;
    })
    .catch(e => {
      dispatch(fetchOrdersOrSalesError(storableError(e)));
      throw e;
    });
  return 0
};