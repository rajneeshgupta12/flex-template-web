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
  console.log( 'dispatch-----------------',dispatch, 'sdk---------------------',sdk)
  let dummyData = {

    "data": {
      "id": "c6ff7190-bdf7-47a0-8a2b-e3136e74334f",
      "type": "listing",
      "attributes": {
        "description": "7-speed Hybrid",
        "deleted": false,
        "geolocation": {
          "lat": 40.64542,
          "lng": -74.08508
        },
        "createdAt": "2018-03-23T08:40:24.443Z",
        "state": "published",
        "title": "Peugeot eT101",
        "publicData": {
          "address": {
            "city": "New York",
            "country": "USA",
            "state": "NY",
            "street": "230 Hamilton Ave"
          },
          "metadata": {
            "promoted": true
          },
          "category": "road",
          "gears": 22,
          "rules": "This is a nice, bike! Please, be careful with it."
        },
        "price": {
          "amount": 1590,
          "currency": "USD"
        }
      }
    }
  }

  return sdk.listings.query()
    .then(response => {
      // Send the message to the created transaction
      response.data.data.push(dummyData)//to insert dummy data
      response.data.data.push(dummyData)//to insert dummy data
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
console.log('load data-----------------')
  return dispatch(getAllListings());
};