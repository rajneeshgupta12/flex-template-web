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
