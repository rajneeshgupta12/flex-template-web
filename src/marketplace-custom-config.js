/*
 * Marketplace specific configuration.
 */


export const amenities_hospitality = [
  {
    key: 'blanket_pillow',
    label: 'Extra Blankets / Pillows',
  },
  {
    key: 'towel',
    label: 'Towels',
  },
  {
    key: 'shampoo_conditioner',
    label: 'Shampoo / Conditioner',
  },
  {
    key: 'body_wash',
    label: 'Body Wash',
  },
  {
    key: 'hair_dryer',
    label: 'Hair dryer',
  },
  {
    key: 'heating',
    label: 'Heating',
  },
  {
    key: 'air_conditioning',
    label: 'Air Conditioning',
  },
  {
    key: 'tv',
    label: 'TV / Projector',
  },
  {
    key: 'wifi_internet',
    label: 'Wifi / Internet',
  },
];

export const amenities_glamping = [
  {
    key: 'firepit',
    label: 'Firepit',
  },
  {
    key: 'camping_chair',
    label: 'Camping Chairs',
  },
  {
    key: 'camping_table',
    label: 'Camping Table',
  },
  {
    key: 'hammock',
    label: 'Hammock',
  },
  {
    key: 'stove',
    label: 'Stove',
  },
  {
    key: 'refrigerator',
    label: 'Refigerator',
  },
  {
    key: 'kitchenware',
    label: 'Kitchenware',
  },
  {
    key: 'silverware',
    label: 'Silverware',
  },
  {
    key: 'toilet',
    label: 'Toilet',
  },
  {
    key: 'shower',
    label: 'Shower',
  },
  {
    key: 'bathtub',
    label: 'Bathtub',
  },
  {
    key: 'hot_tub',
    label: 'Hot Tub',
  },
  {
    key: 'power_outlet',
    label: 'Power Outlet',
  },
];

export const available_transportaion = [
  { key: 'ride_service', label: 'Ride Share', hasInput: true, inputKeyName: "ride_service_text" },
  { key: 'bus', label: 'Bus', hasInput: true, inputKeyName: "bus_text" },
  { key: 'subway', label: 'Subway', hasInput: true, inputKeyName: "subway_text" },
  { key: 'train', label: 'Train', hasInput: true, inputKeyName: "train_text" },
  { key: 'parking_available', label: 'Parking Available', hasInput: true, inputKeyName: "parking_available_text" },
];

export const facilities_culture = [
  { key: 'library', label: 'Library' },
  { key: 'movie_theater', label: 'Movie Theater' },
  { key: 'theater', label: 'Theater' },
  { key: 'museum', label: 'Museum' },
  { key: 'art_gallery', label: 'Art Gallery' }
];

export const facilities_nature = [
  { key: 'lake', label: 'Lake' },
  { key: 'beach', label: 'Beach' },
  { key: 'park', label: 'Park' },
  { key: 'mountain', label: 'Mountain' },
  { key: 'river', label: 'River' },
  { key: 'desert', label: 'Desert' }
];

export const facilities_convenience = [
  { key: 'restaurant', label: 'Restaurant' },
  { key: 'bar', label: 'Bar' },
  { key: 'cafe', label: 'Cafe' },
  { key: 'grocery_store', label: 'Grocery store' },
  { key: 'hospital', label: 'Hospital' },
  { key: 'airport', label: 'Airport' },
  { key: 'shopping_mall', label: 'Shopping Mall' },
  { key: 'gym', label: 'Gym' },
];

export const facilities_tour = [
  { key: 'winery', label: 'Winery' },
  { key: 'brewery', label: 'Brewery' },
  { key: 'roastery', label: 'Roastery' },
  { key: 'zoo', label: 'Zoo' },
  { key: 'amusement_park', label: 'Amusement Park' },
  { key: 'market_flea_farmers', label: 'Farmers Market' },
  { key: 'tower', label: 'Tower' },
  { key: 'historical_building_area', label: 'Historic Places' },
  { key: 'tour_spot', label: 'Tour Spot' },
];

export const categories = [
  { key: 'one', label: '1' },
  { key: 'two', label: '2' },
  { key: 'three', label: '3' },
  { key: 'more then 3', label: 'more then 3' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};
