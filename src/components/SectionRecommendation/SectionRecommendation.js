import React, { Component } from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames'
import { NamedLink } from '../../components'
import glampImage from './images/Space.png'

//import 'react-responsive-carousel/lib/styles/carousel.min.css' ;
import { Carousel, Button, ButtonToolbar } from 'react-bootstrap'
//mport 'bootstrap.css'
import css from './SectionRecommendation.css'

const RecItem = props => {
  let { rootClassName, className, icon, listing } = props;
  listing = listing.data
  const n = null;
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  const prev = <span aria-hidden="true" className="carousel-control-prev-icon" />;
  return (
    <div>
      <div className={css.carouselWrapper}>
        <Carousel interval={n}>
          <Carousel.Item>
            <div className={css.imageWrapper}>
              <div className={css.aspectWrapper}>
                <img src={glampImage} className={css.imageContainer} />
              </div>
            </div>
            <Carousel.Caption>
              <h3>:)</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className={css.imageWrapper}>
              <div className={css.aspectWrapper}>
                <img src={glampImage} className={css.imageContainer} />
              </div>
            </div>
            <Carousel.Caption>
              <h3>:)</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>{
        console.log(listing)
      }
     {listing && <div className={css.textWrapper}>
        <div className={css.typeInfo}>
          <i className={icon} /> {
           listing && listing.type
          }
        </div>
        <div className={css.titleInfo}>
          {listing.attributes && listing.attributes.price && listing.attributes.title}
        </div>
        <div className={css.costInfo}>
          ${listing.attributes && listing.attributes.price && listing.attributes.price.amount}
        </div>
        <div className={css.reviewInfo}>
          <div className={css.stars}>
            <i className="material-icons">star</i>
            <i className="material-icons">star</i>
            <i className="material-icons">star</i>
            <i className="material-icons">star</i>
            <i className="material-icons">star</i>
          </div>
          with 10 reviews
        </div>
      </div>
   } </div>
  );
}



const SectionRecommendation = props => {
  const { rootClassName, className, result } = props;
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  const listings = result && result.LandingPage && result.LandingPage.listings && result.LandingPage.listings.data && result.LandingPage.listings.data.data
  return (

    <div className={classes}>
      {listings && listings.length > 0 &&
        <div>
          <div className={css.title}>
            <FormattedMessage id="SectionRecommendation.title" />
          </div>
          <div className={css.allContainer}>
            <div className={css.rowContainer}>
              {listings.map(listing => {
                return <RecItem listing={listing} icon={css.tentIcon} />
              })}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

SectionRecommendation.defaultProps = { rootClassName: null, className: null };

SectionRecommendation.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionRecommendation;


/*

<NamedLink
      name="SearchPage"
      to={{
        search:
          's?address=Finland&bounds=70.0922932%2C31.5870999%2C59.693623%2C20.456500199999937',
      }}
      className={css.findButton}
      >

     <FormattedMessage id="SectionRecommendation.findButton" />
    </NamedLink>

    */