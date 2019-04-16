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
  { key: 'ride_service', label: 'Ride Service', hasInput: true, inputKeyName: "ride_service_text" },
  { key: 'bus', label: 'Bus',  hasInput: true, inputKeyName: "bus_text" },
  { key: 'subway', label: 'Subway' , hasInput: true, inputKeyName: "subway_text" },
  { key: 'train', label: 'Train' ,hasInput: true, inputKeyName: "train_text" },
  { key: 'parking_available', label: 'Parking available', hasInput: true, inputKeyName: "parking_available_text" },
];

export const facilities_culture = [
  { key: 'library', label: 'Library' },
  { key: 'movie_theater', label: 'Movie theater' },
  { key: 'theater', label: 'Theater(performance, concert)' },
  { key: 'museum', label: 'Museum' },
  { key: 'art_gallary', label: 'Art gallary' }
];

export const facilities_nature = [
  { key: 'lake', label: 'lake' },
  { key: 'beach', label: 'beach' },
  { key: 'park', label: 'park' },
  { key: 'mountain', label: 'mountain' },
  { key: 'river', label: 'river' },
  { key: 'desert', label: 'desert' }
];

export const facilities_convenience = [
  { key: 'restaurant', label: 'restaurant' },
  { key: 'bar', label: 'bar' },
  { key: 'cafe', label: 'cafe' },
  { key: 'grocery_store', label: 'grocery store' },
  { key: 'hospital', label: 'hospital' },
  { key: 'airport', label: 'airport' },
  { key: 'shopping_mall', label: 'shopping mall' },
  { key: 'gym', label: 'gym' },
];

export const facilities_tour = [
  { key: 'winery', label: 'winery' },
  { key: 'brewery', label: 'brewery' },
  { key: 'roastery', label: 'roastery' },
  { key: 'zoo', label: 'zoo' },
  { key: 'amusement_park', label: 'amusement park' },
  { key: 'market_flea_farmers', label: 'flea market/farmers market mall' },
  { key: 'tower', label: 'tower' },
  { key: 'historical_building_area', label: 'historical building/area' },
  { key: 'regional_tour_spot', label: 'regional tour spot' },
];

export const categories = [
  { key: 'smoke', label: 'Smoke' },
  { key: 'electric', label: 'Electric' },
  { key: 'wood', label: 'Wood' },
  { key: 'other', label: 'Other' },
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
