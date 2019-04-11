import { types as sdkTypes } from '../../util/sdkLoader';

// ================ Action types ================ //

export const GET_ALL_LISTINGS_SUCCESS = 'app/ListingPage/GET_ALL_LISTINGS_SUCCESS';
export const GET_ALL_LISTINGS_ERROR = 'app/ListingPage/GET_ALL_LISTINGS__ERROR';

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
      return { ...state, listings: payload };
    }

    case GET_ALL_LISTINGS_ERROR:
      return { ...state, fetchTimeSlotsError: payload };

    default:
      return state;
  }
};

export default landingPageReducer;

// ================ Action creators ================ //



export const getAllListings = () => (dispatch, getState, sdk) => {

  return sdk.listings.query({
    ['fields.image']: ["variants.landscape-crop", "variants.landscape-crop2x"],
    include: ["images", { expand: true }],
    expand: true
  }, { expand: true })
    .then(response => {
      return dispatch(getAllListingsSuccess(response))
    })
    .catch(e => {
      return dispatch(getAllListingsError(e))
    });
};

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