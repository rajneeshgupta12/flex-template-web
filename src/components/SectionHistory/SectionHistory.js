import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames'
import { NamedLink } from '../../components'
import glampImage from './images/Space.png'

//import 'react-responsive-carousel/lib/styles/carousel.min.css' ;
import { Carousel, Button, ButtonToolbar } from 'react-bootstrap'
//mport 'bootstrap.css'
import css from './SectionHistory.css'
import { getQueryListing } from '../../containers/LandingPage/LandingPage.duck';

const RecItem = props => {
  let { rootClassName, className, icon, listing } = props;
  console.log("at history-----", listing)
  const n = null;
  let imeges = []
  listing.included.forEach(item => {
    if (item.type == 'image')
      imeges.push(item)
  })
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  const prev = <span aria-hidden="true" className="carousel-control-prev-icon" />;
  return (
    <div>
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
                <h3>:)</h3>
              </Carousel.Caption>
            </Carousel.Item>
          })}
        </Carousel>
      </div>
      {listing && <div className={css.textWrapper}>
        <div className={css.typeInfo}>
          {
            <img src={
              listing.data.attributes && listing.data.attributes.publicData &&
              listing.data.attributes.publicData.property_type &&
              listing.data.attributes.publicData.property_type.type &&
              listing.data.attributes.publicData.property_type.type.image}
              height="25" width="25"
            />
          }&nbsp;&nbsp;&nbsp;{listing.data.attributes.publicData.property_type.type &&
            listing.data.attributes.publicData.property_type.type.title}
        </div>
        <div className={css.titleInfo}>
          <strong>
            {listing.data.attributes && listing.data.attributes.title}
          </strong>
        </div>
        <div className={css.costInfo}>
          ${listing.data.attributes && listing.data.attributes.price && (listing.data.attributes.price.amount) / 100}/night
        </div>
        {/* <div className={css.reviewInfo}>
          <div className={css.stars}>
            <i className="material-icons">star_border</i>
            <i className="material-icons">star_border</i>
            <i className="material-icons">star_border</i>
            <i className="material-icons">star_border</i>
            <i className="material-icons">star_border</i>
          </div>
          No reviews
        </div> */}
      </div>
      } </div>
  );
}



const SectionHistory = props => {
  const { rootClassName, className, result, user, isGetQueryListingCalled, getQueryListingCalled } = props;
  let listingUrls = user && user.attributes && user.attributes.profile && user.attributes.profile.publicData && user.attributes.profile.publicData.visitedOasisHistory
  !isGetQueryListingCalled && listingUrls.map(url => {
    props.getQueryListing(url.id)
  }, getQueryListingCalled())
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  let listings = result && result.LandingPage && result.LandingPage.visitedOasises
  return (
    <div className={classes}>
      {listings && listings.length > 0 &&
        <div>
          <div className={css.title}>
            <FormattedMessage id="SectionHistory.title" />
          </div>
          <div className={css.allContainer}>
            <div className={css.rowContainer}>
              {listings.map(listing => {
                return <Link to={`/l/${listing.data.data.attributes.title}/${listing.data.data.id.uuid.toString()}`}>
                  <RecItem listing={listing.data} icon={css.tentIcon} />
                </Link>
              })}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

SectionHistory.defaultProps = { rootClassName: null, className: null };

SectionHistory.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHistory;

