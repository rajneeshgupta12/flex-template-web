/*
 * Marketplace specific configuration.
 */


export const amenities_hospitality = [
  {
    key: 'beddings',
    label: 'Beddings',
  },
  {
    key: 'towel',
    label: 'Towel',
  },
  {
    key: 'body_cleaneser_shampoo',
    label: 'Shampoo &amp; body cleanser',
  },
  {
    key: 'hair_dryer',
    label: 'Hair dryer',
  },
  {
    key: 'bathtub',
    label: 'Bathtub',
  },
  {
    key: 'refrigerator',
    label: 'Refrigerator',
  },
  {
    key: 'kitchenware',
    label: 'Kitchenware',
  },
  {
    key: 'heat',
    label: 'Heat',
  },
  {
    key: 'air_conditioning',
    label: 'Air conditioning',
  },
  {
    key: 'tv',
    label: 'TV / Projector',
  },
  {
    key: 'wifi',
    label: 'Wifi',
  },
];

export const amenities_glamping = [
  {
    key: 'firepit',
    label: 'firepit',
  },
  {
    key: 'stove',
    label: 'stove',
  },
  {
    key: 'kichenette',
    label: 'kichenette',
  },
  {
    key: 'pot_pen',
    label: 'pot/pen',
  },
  {
    key: 'utensils',
    label: 'utensils',
  },
  {
    key: 'silverware',
    label: 'silverware',
  },
  {
    key: 'picnic_table_bench',
    label: 'picnic table with bench',
  },
  {
    key: 'picnic_blanket',
    label: 'picnic blanket',
  },
  {
    key: 'camping_chair',
    label: 'camping chair',
  },
  {
    key: 'shower',
    label: 'shower',
  },
  {
    key: 'toilet',
    label: 'toilet',
  },
  {
    key: 'electrical_outlet',
    label: 'electrical outlet',
  },
  {
    key: 'hot_tub',
    label: 'hot tub',
  },
  {
    key: 'BBQ_grill',
    label: 'BBQ grill',
  },
  {
    key: 'campfire',
    label: 'Campfire',
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
