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

const locationLink = (name, image, searchQuery, title, topMargin, grey) => {
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
    console.log(this.state.currentStartIndex);
    if (direction === "right" && this.state.left >= -390) {
      this.setState({left: this.state.left - 390});
      this.state.currentStartIndex++ ;

    } else if (direction === "right" && this.state.left <-390) {
      this.setState({left: 0});



    } else if (direction === "left" && this.state.left < 0){
      this.setState({left: this.state.left + 390});
      this.state.currentStartIndex--;
    }
  }

  render() {
    var moveStyle = {
      left: this.state.left
    };
    const {rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    return (
      <div className={classes}>
        <div className ={css.title}>
          <FormattedMessage id="SectionType.title" />
        </div>
        <button onClick={() => this.click("left")} className={css.leftArrow}>&lt;-</button>
          <button onClick={() => this.click("right")} className={css.rightArrow}>-&gt;</button>
        <div className={css.rowWrapper}>



        <div style={moveStyle} className={css.images}>

              {locationLink('Bell Tent', tentImage, '?pub_property_type=id_0', 'Romantic', 3, false)
            }

              {locationLink('Safari Tent', safariImage, '?pub_property_type=id_1', 'Calm', 3, false)
              }

              {locationLink('Tipi', tipiImage, '?pub_property_type=id_2', 'Convienent', 2, false)
              }

              {locationLink('Yurt', yurtImage, '?pub_property_type=id_3', 'Great View', 3, false)
              }

              {locationLink('Igloo/Dome', iglooImage, '?pub_property_type=id_4', 'Isolated', 3, false)
              }

              {locationLink('RV/Camper', rvImage, '?pub_property_type=id_5', 'Isolated', 7, false)
              }

              {locationLink('Treehouse', treeImage, '?pub_property_type=id_6', 'Isolated', 10, true)
              }

              {locationLink('Tiny house', tinyImage, '?pub_property_type=id_7', 'Isolated', 0, true)
              }

              {locationLink('Cabin', cabinImage, '?pub_property_type=id_8', 'Isolated', 5, true)
              }

              {locationLink('Hut', hutImage, '?pub_property_type=id_9', 'Isolated', 7, true)
              }

              {locationLink('Shepherd', shepherdImage, '?pub_property_type=id_10', 'Isolated', 7, true)
              }

              {locationLink('Pod', podImage, '?pub_property_type=id_11', 'Isolated', 7, true)
              }

              {locationLink('Yacht', yachtImage, '?pub_property_type=id_12', 'Isolated', 7, true)
              }


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