
import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames'
import { NamedLink } from '..'
import glampImage from './images/Space.png'

//import 'react-responsive-carousel/lib/styles/carousel.min.css' ;
import { Carousel, Button, ButtonToolbar } from 'react-bootstrap'
import css from './SectionUpcomingBookingsGuest.css'
import AvatarLarge from '../Avatar/Avatar'

const RecItemGuest = props => {
  const { listings, booking, user } = props
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  let bookingId = props.booking.type == "booking" && props.booking.id && props.booking.id.uuid;
  let listing = {}

  let transaction = Object.keys(props.result.marketplaceData.entities.transaction).map(function (key) {
    return props.result.marketplaceData.entities.transaction[key]
  })
let txId = 'id'
  transaction && transaction.forEach(tx => {
    if (tx.relationships.booking.data.id.uuid == bookingId) {
      listing = tx.relationships.listing;
      txId = tx.id.uuid
    }
  })
  let userArrayIndex = listings && listings.data.map(function (x) { return x.id.uuid; }).indexOf(listing && listing.data &&listing.data.id.uuid);
  let bookedListing = listings && listings.data[userArrayIndex];


  let startDate = booking.attributes.start.getDate();
  let startMonth = booking.attributes.start.getMonth();
  startMonth = months[startMonth];
  let endDate = booking.attributes.end.getDate();
  let endMonth = booking.attributes.end.getMonth();
  endMonth = months[endMonth];
  const checkInTime = bookedListing && bookedListing.attributes && bookedListing.attributes.publicData && bookedListing.attributes.publicData.check_in_time
  const checkOutTime = bookedListing && bookedListing.attributes && bookedListing.attributes.publicData && bookedListing.attributes.publicData.check_out_time
  const n = null;
  let img = listings && listings.included[userArrayIndex];
  let tx = booking && booking.relationships && booking.relationships.transaction
    && booking.relationships.transaction.data
    && booking.relationships.transaction.data.id
    && booking.relationships.transaction.data.id.uuid;
  const date1 = new Date(booking.attributes.displayStart);
  const date2 = new Date(booking.attributes.displayEnd);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffTotalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const date3 = new Date(booking.attributes.displayStart);
  const date4 = new Date(booking.attributes.displayEnd);
  const diffTime2 = Math.abs(date4.getTime() - date3.getTime());
  const diffRemainingDays = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
  return (
    <div>
      <div>
        Left{diffRemainingDays} days
  to Seattle
for {diffTotalDays} nights stay!

      </div>
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
      {bookedListing && <div className={css.textWrapper}>
        <div>

          <div className={css.typeInfo}>
            {startDate} {startMonth}
            ~
          {endDate} {endMonth}
          </div>
          <div className={css.typeInfo}>
            Check in {checkInTime} / Check out {checkOutTime}
          </div>

          <div className={css.titleInfo}>
            <strong>
              {bookedListing.attributes && bookedListing.attributes.title}
            </strong>
          </div>
          <Link to={`/order/${txId}/details`} >
            <button>
              Messege to the Host
        </button>
          </Link>
          <div className={css.costInfo}>
          </div>
        </div>
      </div>
      } </div>
  );
}

const SectionUpcomingBookingsGuest = props => {
  const { rootClassName, className, result } = props;
  let booking = result && result.marketplaceData && result.marketplaceData.entities && result.marketplaceData.entities.booking

  const allListings = result && result.LandingPage && result.LandingPage.listings && result.LandingPage.listings.data;

  let user = result && result.LandingPage && result.LandingPage.Tx && result.LandingPage.Tx.data.data.relationships.customer.data;

  let bookings = Object.keys(booking).map(function (key) {
    return booking[key]
  })

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={classes}>
      {bookings.length > 0 &&
        <div>
          <div className={css.title}>
            <FormattedMessage id="SectionUpcomingBookingsGuest.title" />
          </div>
          <div className={css.allContainer}>
            <div>
              {bookings.map((booking, idx) => {
                if (idx <3)
                  return <RecItemGuest
                    listings={allListings}
                    user={user}
                    booking={booking}
                    {...props}
                  />
              })}
            </div>
          </div>
          <button>
            <Link to={'/inbox/orders'}>See all</Link>
          </button>
        </div>
      }
    </div>
  );
};

SectionUpcomingBookingsGuest.defaultProps = { rootClassName: null, className: null };

SectionUpcomingBookingsGuest.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionUpcomingBookingsGuest;

