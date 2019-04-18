// import React, { Component } from 'react';
// import { string } from 'prop-types';
// import { FormattedMessage } from 'react-intl';
// import classNames from 'classnames'
// import { NamedLink } from '../../components'
// import glampImage from './images/Space.png'

// //import 'react-responsive-carousel/lib/styles/carousel.min.css' ;
// import { Carousel, Button, ButtonToolbar } from 'react-bootstrap'
// //mport 'bootstrap.css'
// import css from './SectionRecommendation.css'

// const RecItem = props => {
//   let { rootClassName, className, icon, listing } = props;
//   const n = null;
//   const glamp = [{ glampImage }, { glampImage }];
//   const classes = classNames(rootClassName || css.root, className);
//   const prev = <span aria-hidden="true" className="carousel-control-prev-icon" />;
//   return (
//     <div>
//       <div className={css.carouselWrapper}>
//         <Carousel interval={n}>
//           <Carousel.Item>
//             <div className={css.imageWrapper}>
//               <div className={css.aspectWrapper}>
//                 <img src={glampImage} className={css.imageContainer} />
//               </div>
//             </div>
//             <Carousel.Caption>
//               <h3>:)</h3>
//             </Carousel.Caption>
//           </Carousel.Item>
//           <Carousel.Item>
//             <div className={css.imageWrapper}>
//               <div className={css.aspectWrapper}>
//                 <img src={glampImage} className={css.imageContainer} />
//               </div>
//             </div>
//             <Carousel.Caption>
//               <h3>:)</h3>
//             </Carousel.Caption>
//           </Carousel.Item>
//         </Carousel>
//       </div>

//      {listing && <div className={css.textWrapper}>
//         <div className={css.typeInfo}>
//           <i className={icon} /> {
//            listing && listing.type
//           }
//         </div>
//         <div className={css.titleInfo}>
//           {listing.attributes && listing.attributes.price && listing.attributes.title}
//         </div>
//         <div className={css.costInfo}>
//           ${listing.attributes && listing.attributes.price && (listing.attributes.price.amount)/100}
//         </div>
//         <div className={css.reviewInfo}>
//           <div className={css.stars}>
//             <i className="material-icons">star_border</i>
//             <i className="material-icons">star_border</i>
//             <i className="material-icons">star_border</i>
//             <i className="material-icons">star_border</i>
//             <i className="material-icons">star_border</i>
//           </div>
//          No reviews
//         </div>
//       </div>
//    } </div>
//   );
// }



// const SectionRecommendation = props => {
//   const { rootClassName, className, result } = props;
//   const glamp = [{ glampImage }, { glampImage }];
//   const classes = classNames(rootClassName || css.root, className);
//   const listings = result && result.LandingPage && result.LandingPage.listings && result.LandingPage.listings.data && result.LandingPage.listings.data.data
//   return (
//     <div className={classes}>
//       {listings && listings.length > 0 &&
//         <div>
//           <div className={css.title}>
//             <FormattedMessage id="SectionRecommendation.title" />
//           </div>
//           <div className={css.allContainer}>
//             <div className={css.rowContainer}>
//               {listings.map(listing => {
//                 return <RecItem listing={listing} icon={css.tentIcon} />
//               })}
//             </div>
//           </div>
//         </div>
//       }
//     </div>
//   );
// };

// SectionRecommendation.defaultProps = { rootClassName: null, className: null };

// SectionRecommendation.propTypes = {
//   rootClassName: string,
//   className: string,
// };

// export default SectionRecommendation;

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
import css from './SectionRecommendation.css'
import { getQueryListing } from '../../containers/LandingPage/LandingPage.duck';

const RecItem = props => {
  let { rootClassName, className, icon, listing } = props;
  const n = null;
  let imeges = []
  listing.included && listing.included.forEach(item => {
    if (item.type == 'image')
      imeges.push(item)
  })
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  const prev = <span aria-hidden="true" className="carousel-control-prev-icon" />;
  return (
    <div>
      <div className={css.carouselWrapper}>
        {/* <Carousel interval={n}>
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
        </Carousel> */}
      </div>
      {listing && <div className={css.textWrapper}>
        <div className={css.typeInfo}>
          {
            <img src={
              listing.attributes && listing.attributes.publicData &&
              listing.attributes.publicData.property_type &&
              listing.attributes.publicData.property_type.type &&
              listing.attributes.publicData.property_type.type.image}
              height="25" width="25"
            />
          }&nbsp;&nbsp;&nbsp;{listing.attributes.publicData.property_type.type &&
            listing.attributes.publicData.property_type.type.title}
        </div>
        <div className={css.titleInfo}>
          <strong>
            {listing.attributes && listing.attributes.title}
          </strong>
        </div>
        <div className={css.costInfo}>
          ${listing.attributes && listing.attributes.price && (listing.attributes.price.amount) / 100}/night
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

const SectionRecommendation = props => {
  const { rootClassName, className, result, user } = props;
  const glamp = [{ glampImage }, { glampImage }];
  const classes = classNames(rootClassName || css.root, className);
  // let listings = result && result.LandingPage && result.LandingPage.visitedOasises
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
              {listings.map((listing, idx) => {
                if (idx < 3)
                  return <Link to={`/l/${listing.attributes.title}/${listing.id.uuid.toString()}`}>
                    <RecItem listing={listing} icon={css.tentIcon} />
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

SectionRecommendation.defaultProps = { rootClassName: null, className: null };

SectionRecommendation.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionRecommendation;

