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
import css from './SectionRecommendation.css'

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
              </Carousel.Caption>
            </Carousel.Item>
          })}
        </Carousel>
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
          }<span className={css.typeName}> {listing.attributes.publicData.property_type.type &&
            listing.attributes.publicData.property_type.type.title} </span>
           &nbsp;<span className={css.typeCity}>/ {city}</span>
        </div>
        <div className={css.titleInfo}>

            {listing.attributes && listing.attributes.title}

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
  let viewableListingsCount =listings&& listings.length > 5 ? 6 : 3
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

                if (idx < viewableListingsCount)
                  return <Link style={{textDecoration: 'none'}} className={css.linkBox} to={`/l/${listing.attributes.title}/${listing.id.uuid.toString()}`}>
                    <RecItem listing={listing} listings={listings} icon={css.tentIcon} />
                  </Link>
              })}
            </div>
          </div>

            <Link className={css.findButton} to={'/s'}>Find More</Link>

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

