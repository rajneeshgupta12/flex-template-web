import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom'
import { InlineTextButton } from '../../components';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import config from '../../config';

import css from './ListingPage.css';

const SectionHeading = props => {
  const {
    richTitle,
    hostLink,
    showContactUser,
    onContactUser,
    publicData,
    currentUser
  } = props;

  const getPropertyTypes = (propertyTypes) => {
    return propertyTypes.map(propertyType => {
      return <div>
        <img src={propertyType.image} height="42" width="42" />
        {propertyType.title}
      </div>
    })
  }
  let userName = currentUser && currentUser.attributes && currentUser.attributes.profile && currentUser.attributes.profile.displayName
  let name = <Link to='/profile-settings'> {userName} </Link>
  return (
    <div className={css.sectionHeading}>
      <div className={css.desktopPriceContainer}>
      </div>
      <div className={css.heading}>
        <h1 className={css.title}>{richTitle}</h1>
        <div className={css.author}>
          {getPropertyTypes(publicData.property_type)}
          <span className={css.separator}>•</span>
          <FormattedMessage id="ListingPage.hostedBy" values={{ name: name }} />
          {showContactUser ? (
            <span className={css.contactWrapper}>
              <span className={css.separator}>•</span>
              <InlineTextButton rootClassName={css.contactLink} onClick={onContactUser}>
                <FormattedMessage id="ListingPage.contactUser" />
              </InlineTextButton>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
