import React from 'react';
import { FormattedMessage } from 'react-intl';
import { richText } from '../../util/richText';

import css from './ListingPage.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;
const getThemeButtons = (placeTheme) => {
  let activePlaceThemes = []
  Object.keys(placeTheme).map(function (key) {
    if (placeTheme[key]) {
      activePlaceThemes.push(key)
    }
  });
  return activePlaceThemes.map((theme) => {
    return <button id={Math.random().toString()
    } disabled >{theme}</button>
  })
}

const SectionDescriptionMaybe = props => {
  const { description, publicData } = props;
  const { capacity, place_themes } = publicData
  getThemeButtons(place_themes)
  return description ? (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.descriptionTitle" />
      </h2>
      <label>
        {publicData && publicData.place}
      </label>
      <div>
        <span>{capacity && capacity.guestNumber} glampers</span>
        <span>{capacity && capacity.maxGuestNumber} Max glampers</span>
        <span>{capacity && capacity.bedroomsNumber} bedroom</span>
        <span>{capacity && capacity.bedsNumber} beds</span>
        <span>{capacity && capacity.bathroomsNumber} bathroom</span>
      </div>
      <br />
      <div>
      </div>
      <p className={css.description}>
        {richText(description, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION,
          longWordClass: css.longWord,
        })}
      </p>
      {place_themes &&
        <div>
          <label>Theme</label>
          {getThemeButtons(place_themes)}
        </div>
      }
    </div>
  ) : null;
};

export default SectionDescriptionMaybe;
