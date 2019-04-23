
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

const RecItem = props => {
  let { rootClassName, className, icon, listing, listings } = props;
  const n = null;
  let imeges = []
  listings.includedRelationships && listings.includedRelationships.forEach(item => {
    if (item.type == 'image') {
      let imgdata = listing.relationships && listing.relationships.images
        && listing.relationships.images.data
      imgdata.forEach(img => {
        if (img.type == 'image' && img.id.uuid == item.id.uuid) {
          imeges.push(item)
        }
      })
    }
  })
  let city = listing && listing.attributes && listing.attributes.publicData && listing.attributes.publicData.location && listing.attributes.publicData.location.city
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  const prev = <span aria-hidden="true" className="carousel-control-prev-icon" />;
  return (
    <div className={classes}>
      <div className={css.carouselWrapper}>
        <Carousel interval={n}>
          {imeges.map(img => {
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

      <div>
        <p className={css.info}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
        <Link
          to={
            '/l/new'
          }
          className={css.hostButton}
        >

          <FormattedMessage id="SectionHost.hostButton" />
        </Link>
      </div >
    </div>
  );
}

const SectionUpcomingBookings = props => {
  const { rootClassName, className, result } = props;
  console.log('SectionUpcomingBookings----', props)
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  // let listings = result && result.LandingPage && result.LandingPage.visitedOasises
  const listings = result && result.LandingPage && result.LandingPage.ownListings && result.LandingPage.ownListings.data
  console.log('at upcomming----- listings', listings)
  let bookedListing = []
  listings && listings.data.forEach(listing => {
    props.getListingBookings(listing.id.uuid)
  })
  let viewableListingsCount = listings && listings.length > 5 ? 6 : 3
  return (
    <div className={classes}>
      {listings && listings.length > 0 &&
        <div>
          <div className={css.title}>
            <FormattedMessage id="SectionUpcomingBookings.title" />
          </div>
          <div className={css.allContainer}>
            <div>
              {listings.map((listing, idx) => {

                if (idx < viewableListingsCount)
                  return <Link to={`/l/${listing.attributes.title}/${listing.id.uuid.toString()}`}>
                    <RecItem listing={listing} listings={listings} icon={css.tentIcon} />
                  </Link>
              })}
            </div>
          </div>
          <button>
            <Link to={'/s'}>Find More</Link>
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

