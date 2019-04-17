import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';


import { NamedLink } from '../../components';

import defaultImage from './images/location_rovaniemi.jpg';
import tentImage from './images/Bell.png';
import safariImage from './images/Safari.png';
import tipiImage from './images/Tipi.png';
import yurtImage from './images/Yurt.png';
import iglooImage from './images/Igloo.png';
import rvImage from './images/RV.png';
import treeImage from './images/Tree.png';
import tinyImage from './images/Tiny.png';
import cabinImage from './images/Cabin.png';
import hutImage from './images/Hut.png';
import shepherdImage from './images/Shepherd.png';
import podImage from './images/Pod.png';
import yachtImage from './images/Yacht.png';


import css from './SectionType.css';

class TypeImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}

const LazyImage = lazyLoadWithDimensions(TypeImage);

const locationLink = (name, image, searchQuery, title, topMargin, grey = false) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  //const greyValue = grey ? 0.5 : 1;
  //const margin = {"margin-top: " + topMargin + "px"};
  const imageStyle = {
    marginTop: topMargin,
    opacity: grey ? 0.5 : 1
  };
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
      <div className={css.circleImage}>
        <div className={css.imageContainer} style={imageStyle}>

          <div className={css.imageWrapper}>
            <div className={css.aspectWrapper}>
              <LazyImage src={image} alt={name} className={css.locationImage} />
            </div>
          </div>
        </div>
      </div>
      <div className={css.linkText}>
        {nameText}
      </div>
    </NamedLink>


  );
};


class SectionType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStartIndex: 0,
      length: 5,
      left: 0
    };
  }
  click(direction) {
    if (direction === "right" && this.state.left >= -390) {
      this.setState({ left: this.state.left - 390 });
      this.state.currentStartIndex++;

    } else if (direction === "right" && this.state.left < -390) {
      this.setState({ left: 0 });



    } else if (direction === "left" && this.state.left < 0) {
      this.setState({ left: this.state.left + 390 });
      this.state.currentStartIndex--;
    }
  }

  getLinks = (selectedLinks) => {
    let links = [], allStyles = [

      { link: locationLink('Bell Tent', tentImage, '?pub_property_type_id=0', 'Romantic', 3), id: 0 },

      { link: locationLink('Safari Tent', safariImage, '?pub_property_type_id=1', 'Calm', 3), id: 1 },

      { link: locationLink('Tipi', tipiImage, '?pub_property_type_id=2', 'Convienent', 2), id: 2 },

      { link: locationLink('Yurt', yurtImage, '?pub_property_type_id=3', 'Great View', 3), id: 3 },

      { link: locationLink('Igloo/Dome', iglooImage, '?pub_property_type_id=4', 'Isolated', 3), id: 4 },

      { link: locationLink('RV/Camper', rvImage, '?pub_property_type_id=5', 'Isolated', 7), id: 5 },

      { link: locationLink('Treehouse', treeImage, '?pub_property_type_id=6', 'Isolated', 10), id: 6 },

      { link: locationLink('Tiny house', tinyImage, '?pub_property_type_id=7', 'Isolated', 0), id: 7 },

      { link: locationLink('Cabin', cabinImage, '?pub_property_type_id=8', 'Isolated', 5), id: 8 },

      { link: locationLink('Hut', hutImage, '?pub_property_type_id=9', 'Isolated', 7), id: 9 },

      { link: locationLink('Shepherd', shepherdImage, '?pub_property_type_id=10', 'Isolated', 7), id: 10 },

      { link: locationLink('Pod', podImage, '?pub_property_type_id=11', 'Isolated', 7), id: 11 },

      { link: locationLink('Yacht', yachtImage, '?pub_property_type_id=12', 'Isolated', 7), id: 12 },

    ]
    allStyles.forEach(style => {
      if (selectedLinks.includes(style.id.toString())) {
        links.push(style.link)
      }
    })
    allStyles.forEach(style => {
      links.push(style.link)
    })
    return [...new Set(links)]
  }

  render() {
    const listings = this.props && this.props.result && this.props.result.LandingPage && this.props.result.LandingPage.listings && this.props.result.LandingPage.listings.data && this.props.result.LandingPage.listings.data.data
    var moveStyle = {
      left: this.state.left
    };
    let allListingStyles = []
    listings && listings.forEach(listing => {
      if (listing && listing.attributes && listing.attributes.publicData && listing.attributes.publicData.property_type_id)
        allListingStyles.push(listing.attributes.publicData.property_type_id)
    })
    let uniqueListingStyles = [...new Set(allListingStyles)];
    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    return (
      <div className={classes}>
        <div className={css.title}>
          <FormattedMessage id="SectionType.title" />
        </div>
        <button onClick={() => this.click("left")} className={css.leftArrow}>&lt;-</button>
        <button onClick={() => this.click("right")} className={css.rightArrow}>-&gt;</button>
        <div className={css.rowWrapper}>

          <div style={moveStyle} className={css.images}>
            {this.getLinks(uniqueListingStyles)}
          </div>
        </div>
      </div>
    );
  }
}



SectionType.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionType.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionType;