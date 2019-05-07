
import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames'
import { NamedLink } from '../../components'
import glampImage from './images/Space.png'

//import 'react-responsive-carousel/lib/styles/carousel.min.css' ;
import { Carousel, Button, ButtonToolbar } from 'react-bootstrap'
import css from './SectionUpcomingBookings.css'
import AvatarLarge from '../../components/Avatar/Avatar'

const RecItemHost = props => {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  let { rootClassName, className, icon, listing, bookedlistingId, listings, booking,
    getTxCalled, isGetTxCalled, user, bookedListing, result } = props;
  const n = null;
  let bookedListingImageId = bookedListing
    && bookedListing.relationships
    && bookedListing.relationships.images.data[0].id.uuid
  let userArrayIndex = listings && listings.included.map(function (x) { return x.id.uuid; }).indexOf(bookedListingImageId);
  let proId = bookedListing.relationships && bookedListing.relationships.images && bookedListing.relationships.images.data.length > 0 && bookedListing.relationships.images.data[0] && bookedListing.relationships.images.data[0].id.uuid

  let img = listings && listings.included[userArrayIndex];
  let tx = booking && booking.relationships && booking.relationships.transaction
    && booking.relationships.transaction.data
    && booking.relationships.transaction.data.id
    && booking.relationships.transaction.data.id.uuid;
  !isGetTxCalled && props.getTx(tx) && getTxCalled()
  let startDate = booking.attributes.start.getDate();
  let startMonth = booking.attributes.start.getMonth();
  startMonth = months[startMonth];
  let endDate = booking.attributes.end.getDate();
  let endMonth = booking.attributes.end.getMonth();
  endMonth = months[endMonth];
  const checkInTime = bookedListing && bookedListing.attributes && bookedListing.attributes.publicData && bookedListing.attributes.publicData.check_in_time
  const checkOutTime = bookedListing && bookedListing.attributes && bookedListing.attributes.publicData && bookedListing.attributes.publicData.check_out_time;
  let title = bookedListing.attributes && bookedListing.attributes.title;
  let guestName = user && user.attributes.profile.displayName.split(' ')
  guestName = guestName && guestName.length > 0 && guestName[0] || '';
  let customerImageId = user && user.relationships && user.relationships.profileImage && user.relationships.profileImage.data && user.relationships.profileImage.data.id.uuid
  let customerProfileImage = result.marketplaceData.entities.image[customerImageId];
  if (user)
    user['profileImage'] = customerProfileImage;
  return (
    <div>
      <Link to={`/l/${title}/${bookedlistingId.uuid}`} >
        <div className={css.tripContainer}>
          <div className={css.placeWrapper}>
            <div className={css.placeInfo}>
              <div className={css.carouselWrapper}>
                <Carousel interval={n}>
                  <Carousel.Item>
                    <div className={css.imageWrapper}>
                      <div className={css.aspectWrapper}>
                        <img src={img && img.attributes && img.attributes.variants['landscape-crop'] && img.attributes.variants['landscape-crop'].url} className={css.imageContainer} />
                      </div>
                    </div>
                    <Carousel.Caption>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className={css.typeInfo}>
                {
                  <img src={
                    bookedListing.attributes && bookedListing.attributes.publicData &&
                    bookedListing.attributes.publicData.property_type &&
                    bookedListing.attributes.publicData.property_type.type &&
                    bookedListing.attributes.publicData.property_type.type.image}
                    height="25" width="25"
                  />
                }&nbsp;&nbsp;&nbsp;{bookedListing.attributes.publicData.property_type.type &&
                  bookedListing.attributes.publicData.property_type.type.title}
                &nbsp;&nbsp;&nbsp;
            </div>
              <div className={css.titleInfo}>
                <strong>
                  {title}
                </strong>
              </div>
            </div>
          </div>

          <div className={css.bookerInfo}>
          <div className={css.avatarContainer}>
            <div className={css.avatar}>
              <AvatarLarge className={css.avatar} user={user} listing={listing} />
            </div>
            <span>
              {guestName}
            </span>
          </div>
            <div className={css.textWrapper}>
              <div className={css.typeInfo}>
                {startDate} {startMonth}
                ~
                  {endDate} {endMonth}
              </div>
              <div className={css.typeInfo}>
                Check in&nbsp;<b>{checkInTime}</b>&nbsp;/ Check out&nbsp;<b>{checkOutTime}</b>
              </div>

              <Link className={css.messageButton} to={`/sale/${tx}/details`} >
                Message the Guest
              </Link>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
}

const SectionUpcomingBookings = props => {
  const { rootClassName, className, result, isGetBookingListingCalled, getBookingListingCalled, getTxCalled, isGetTxCalled } = props;
  const classes = classNames(rootClassName || css.root, className);
  const listings = result && result.LandingPage && result.LandingPage.ownListings && result.LandingPage.ownListings.data;

  const allListings = result && result.LandingPage && result.LandingPage.listings && result.LandingPage.listings.data;
  let user = result && result.LandingPage && result.LandingPage.Tx && result.LandingPage.Tx.data.data.relationships.customer.data;
  let userId = user && user.id.uuid
  user = result.marketplaceData.entities.user[userId]
  if (user)
    user['profileImage'] = user && user.relationships && user.relationships.profileImage
  !isGetBookingListingCalled && listings && listings.data.forEach(async listing => {
    await props.getListingBookings(listing.id.uuid)
  }, getBookingListingCalled());
  const allBookings = result && result.LandingPage && result.LandingPage.allBookings && result.LandingPage.allBookings.data;
  let bookedOasis = []

  allBookings && allBookings.data && allBookings.data.forEach((booking, idx) => {
    let bookedlistingId = allBookings.listingId;
    let userArrayIndex = allListings && allListings.data.map(function (x) { return x.id.uuid; }).indexOf(bookedlistingId.uuid);
    let bookedListing = allListings && allListings.data[userArrayIndex];
    if (!bookedListing) {
      return null
    }
    bookedOasis.push({ bookedListing, booking })
  })
  return (
    <div className={classes}>
      {bookedOasis.length > 0 &&
        <div>
          <div className={css.title}>
            <FormattedMessage id="SectionUpcomingBookings.title" />
          </div>
          <div className={css.allContainer}>
            <div>
              {bookedOasis.map((booking, idx) => {
                if (idx === 0)
                  return <RecItemHost
                  key={idx}
                   booking={booking.booking}
                    bookedlistingId={allBookings.listingId}
                    listings={allListings}
                    bookedListing={booking.bookedListing}
                    getTxCalled={getTxCalled}
                    isGetTxCalled={isGetTxCalled}
                    user={user}
                    {...props}
                  />
              })}
            </div>
          </div>
          <Link className={css.allButton} to={'/inbox/sales'}>See All</Link>
        </div>
      }
    </div>
  );
};

SectionUpcomingBookings.defaultProps = { rootClassName: null, className: null };

SectionUpcomingBookings.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionUpcomingBookings;

