
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
    getTxCalled, isGetTxCalled, user } = props;
  const n = null;
  let userArrayIndex = listings && listings.data.map(function (x) { return x.id.uuid; }).indexOf(bookedlistingId.uuid);
  let bookedListing = listings && listings.data[userArrayIndex];
  let bookedListingImageId = bookedListing
    && bookedListing.relationships
    && bookedListing.relationships.images.data[0].id.uuid
  userArrayIndex = listings && listings.included.map(function (x) { return x.id.uuid; }).indexOf(bookedListingImageId);
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
  return (
    <div>
      <div className={css.carouselWrapper}>
        <Carousel interval={n}>
          return <Carousel.Item>
            <div className={css.imageWrapper}>
              <div className={css.aspectWrapper}>
                <img src={img && img.attributes && img.attributes.variants['landscape-crop'] && img.attributes.variants['landscape-crop'].url} className={css.imageContainer} />
              </div>
            </div>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          })}
        </Carousel>
      </div>
      {booking && <div className={css.textWrapper}>
        <div>
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
              {bookedListing.attributes && bookedListing.attributes.title}
            </strong>
          </div>
        </div>
        <div>
          <AvatarLarge className={css.avatar} user={user} listing={listing} />

          <div className={css.typeInfo}>
            {startDate} {startMonth}
            ~
          {endDate} {endMonth}
          </div>
          <div className={css.titleInfo}>
            <strong>
            </strong>
          </div>
          <Link to={`/sale/${tx}/details`} >
            <button>
              Messege to the guest
        </button>
          </Link>
          <div className={css.costInfo}>
          </div>
        </div>
      </div>
      } </div>
  );
}
const RecItemGuest = props => {
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  let { rootClassName, className, icon, listing, bookedlistingId, listings, booking,
    getTxCalled, isGetTxCalled, user } = props;
  const n = null;
  let userArrayIndex = listings && listings.data.map(function (x) { return x.id.uuid; }).indexOf(bookedlistingId.uuid);
  let bookedListing = listings && listings.data[userArrayIndex];
  let bookedListingImageId = bookedListing
    && bookedListing.relationships
    && bookedListing.relationships.images.data[0].id.uuid
  userArrayIndex = listings && listings.included.map(function (x) { return x.id.uuid; }).indexOf(bookedListingImageId);
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
  return (
    <div>
      <div className={css.carouselWrapper}>
        <Carousel interval={n}>
          return <Carousel.Item>
            <div className={css.imageWrapper}>
              <div className={css.aspectWrapper}>
                <img src={img && img.attributes && img.attributes.variants['landscape-crop'] && img.attributes.variants['landscape-crop'].url} className={css.imageContainer} />
              </div>
            </div>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          })}
        </Carousel>
      </div>
      {booking && <div className={css.textWrapper}>
        <div>
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
              {bookedListing.attributes && bookedListing.attributes.title}
            </strong>
          </div>
        </div>
        <div>
          <AvatarLarge className={css.avatar} user={user} listing={listing} />

          <div className={css.typeInfo}>
            {startDate} {startMonth}
            ~
          {endDate} {endMonth}
          </div>
          <div className={css.titleInfo}>
            <strong>
            </strong>
          </div>
          <Link to={`/sale/${tx}/details`} >
            <button>
              Messege to the guest
        </button>
          </Link>
          <div className={css.costInfo}>
          </div>
        </div>
      </div>
      } </div>
  );
}
const SectionUpcomingBookings = props => {
  const { rootClassName, className, result, isGetBookingListingCalled, getBookingListingCalled, getTxCalled, isGetTxCalled  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const listings = result && result.LandingPage && result.LandingPage.ownListings && result.LandingPage.ownListings.data;

  const allListings = result && result.LandingPage && result.LandingPage.listings && result.LandingPage.listings.data;

  let user = result && result.LandingPage && result.LandingPage.Tx && result.LandingPage.Tx.data.data.relationships.customer.data;
  !isGetBookingListingCalled && listings && listings.data.forEach(listing => {
    props.getListingBookings(listing.id.uuid)
  }, getBookingListingCalled());
  const allBookings = result && result.LandingPage && result.LandingPage.allBookings && result.LandingPage.allBookings.data;

  return (
    <div className={classes}>
      {allBookings && allBookings.data && allBookings.data.length > 0 &&
        <div>
          <div className={css.title}>
            <FormattedMessage id="SectionUpcomingBookings.title" />
          </div>
          <div className={css.allContainer}>
            <div>
              {allBookings.data.map((booking, idx) => {
                if (idx === 0)
                  return <RecItemHost booking={booking}
                    bookedlistingId={allBookings.listingId}
                    listings={allListings}
                    getTxCalled={getTxCalled}
                    isGetTxCalled={isGetTxCalled}
                    user={user}
                    {...props}
                  />
              })}
            </div>
          </div>
          <button>
            <Link to={'/inbox/sales'}>See all</Link>
          </button>
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

