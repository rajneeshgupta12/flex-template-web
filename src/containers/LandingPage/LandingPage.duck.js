import { types as sdkTypes } from '../../util/sdkLoader';

// ================ Action types ================ //

export const GET_ALL_LISTINGS_SUCCESS = 'app/ListingPage/GET_ALL_LISTINGS_SUCCESS';
export const GET_ALL_LISTINGS_ERROR = 'app/ListingPage/GET_ALL_LISTINGS__ERROR';
export const GET_QUERY_LISTINGS_SUCCESS = 'app/ListingPage/GET_QUERY_LISTINGS_SUCCESS';
export const GET_QUERY_LISTINGS_ERROR = 'app/ListingPage/GET_QUERY_LISTINGS__ERROR';

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
};

const landingPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_LISTINGS_SUCCESS: {
      if(payload.data.include){}
       return { ...state, listings: payload };
      }

    case GET_ALL_LISTINGS_ERROR:
      return { ...state, fetchTimeSlotsError: payload };

    case GET_QUERY_LISTINGS_SUCCESS: {
      if (payload.data.data.length) {
        return { ...state, listings: payload };
      }
      else {
        let oasises = state.visitedOasises || []
        oasises = oasises.length > 3 ? [] : oasises
        oasises.push(payload)
        return { ...state, visitedOasises: oasises };
      }
    }

    case GET_QUERY_LISTINGS_ERROR:
      return { ...state, getQueryListingError: payload };

    default:
      return state;
  }
};

export default landingPageReducer;

// ================ Action creators ================ //



export const getAllListings = (listingId) => (dispatch, getState, sdk) => {
  return sdk.listings.query({
    authorId: undefined,
    include: ["images"],
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
    expand:true

  })
    .then(response => {
      return dispatch(getAllListingsSuccess(response))
    })
    .catch(e => {
      return dispatch(getAllListingsError(e))
    });
};

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

export const getAllListingsError = error => ({
  type: GET_ALL_LISTINGS_ERROR,
  error: true,
  payload: error,
});

export const getAllListingsSuccess = listings => ({
  type: GET_ALL_LISTINGS_SUCCESS,
  payload: listings,
});


export const loadData = () => dispatch => {
  return dispatch(getAllListings());
};