import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropertyGroup, OnlyVisiblePropertyGroup } from '../../components';

import css from './ListingPage.css';

const SectionFeatures = props => {
  const { hospitalityAmenitiesConfig, glampingAmenitiesConfig, publicData,
    transportaionAmenitiesConfig,
    cultureAmenitiesConfig,
    natureAmenitiesConfig,
    convenienceAmenitiesConfig,
    tourAmenitiesConfig,
  } = props;
  const { amenities_glamping, amenities_hospitality, travel_info } = publicData
  return (
    <div className={css.sectionFeatures}>
      <h2 className={css.featuresTitle}>
        <FormattedMessage id="ListingPage.featuresTitle" />
      </h2>
      <label>for glamping</label>
      <PropertyGroup
        id="ListingPage.hospitalityAmenities"
        options={hospitalityAmenitiesConfig}
        selectedOptions={amenities_hospitality}
        twoColumns={true}
      />
      <br /> <label>for hospitality</label>

      <PropertyGroup
        id="ListingPage.glampingAmenities"
        options={glampingAmenitiesConfig}
        selectedOptions={amenities_glamping}
        twoColumns={true}
      />
      <br />
      <h3>Around the Oasis</h3>
      <label>Available transportaition</label>

      <OnlyVisiblePropertyGroup
        id="Available_transportaition"
        options={transportaionAmenitiesConfig}
        selectedOptions={travel_info.available_transportaion}
        twoColumns={false}
      />
      <br /><label>Culture</label>

      <OnlyVisiblePropertyGroup
        id="Culture"
        options={cultureAmenitiesConfig}
        selectedOptions={travel_info.facilities_culture}
        fiveColumns={true}
      />
      <br /><label>Nature</label>

      <OnlyVisiblePropertyGroup
        id="Nature"
        options={natureAmenitiesConfig}
        selectedOptions={travel_info.facilities_nature}
        fiveColumns={true}
      />
      <br /><label>Convenience</label>

      <OnlyVisiblePropertyGroup
        id="Convenience"
        options={convenienceAmenitiesConfig}
        selectedOptions={travel_info.facilities_convenience}
        fiveColumns={true}
      />
      <br /><label>tour</label>
      <OnlyVisiblePropertyGroup
        id="tour"
        options={tourAmenitiesConfig}
        selectedOptions={travel_info.facilities_tour}
        fiveColumns={true}
      />
    </div>
  );
};

export default SectionFeatures;
