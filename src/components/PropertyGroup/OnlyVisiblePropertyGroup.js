/*
 * Renders a set of options with selected and non-selected values.
 *
 * The corresponding component when selecting the values is
 * FieldCheckboxGroup.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';

import css from './PropertyGroup.css';

import rideIcon from '../../assets/Ride.png';
import busIcon from '../../assets/Bus.png';
import subwayIcon from '../../assets/Sub.png';
import trainIcon from '../../assets/Train.png';
import parkingIcon from '../../assets/Parking.png';

import libraryIcon from '../../assets/Library.png';
import movieIcon from '../../assets/Movie.png';
import theaterIcon from '../../assets/Theater.png';
import museumIcon from '../../assets/Art.png';
import artIcon from '../../assets/Art.png';

import lakeIcon from '../../assets/Lake.png';
import beachIcon from '../../assets/Lake.png';
import parkIcon from '../../assets/Park.png';
import mountainIcon from '../../assets/Mountain.png';
import riverIcon from '../../assets/Mountain.png';
import desertIcon from '../../assets/Mountain.png';

import restaurantIcon from '../../assets/Bar.png';
import barIcon from '../../assets/Bar.png';
import cafeIcon from '../../assets/Cafe.png';
import groceryIcon from '../../assets/Grocery.png';
import hospitalIcon from '../../assets/Medical.png';
import airportIcon from '../../assets/Airport.png';
import shoppingIcon from '../../assets/Shopping.png';
import gymIcon from '../../assets/Gym.png';

import wineryIcon from '../../assets/Winery.png';
import breweryIcon from '../../assets/Brewery.png';
import roasteryIcon from '../../assets/Roastery.png';
import zooIcon from '../../assets/Zoo.png';



const checkSelected = (options, selectedOptions) => {
  return options.map(option => ({
    key: option.key,
    label: option.label,
    isSelected: true,
  }));
};

const IconCheck = props => {
  const isVisible = props.isVisible;
  const classes = isVisible ? css.checkIcon : classNames(css.checkIcon, css.hidden);

  return (
    <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path
        className={css.marketplaceFill}
        d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Item = props => {
  const { label, ID, isSelected } = props;
  const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
  return (
    <li className={css.item}>
      <span className={css.iconWrapper}>

        { ID === 'ride_service' ? <img src={rideIcon} className={css.transportationIcon}/>
        : ID === 'bus' ? <img src={busIcon} className={css.transportationIcon}/>
        : ID === 'subway' ? <img src={subwayIcon} className={css.transportationIcon}/>
        : ID === 'train' ? <img src={trainIcon} className={css.transportationIcon}/>
        : ID === 'parking_available' ? <img src={parkingIcon} className={css.transportationIcon}/>

        : ID === 'library' ? <img src={libraryIcon} className={css.transportationIcon}/>
        : ID === 'movie_theater' ? <img src={movieIcon} className={css.transportationIcon}/>
        : ID === 'theater' ? <img src={theaterIcon} className={css.transportationIcon}/>
        : ID === 'museum' ? <img src={museumIcon} className={css.transportationIcon}/>
        : ID === 'art_gallery' ? <img src={artIcon} className={css.transportationIcon}/>

        : ID === 'lake' ? <img src={lakeIcon} className={css.transportationIcon}/>
        : ID === 'beach' ? <img src={beachIcon} className={css.transportationIcon}/>
        : ID === 'park' ? <img src={parkIcon} className={css.transportationIcon}/>
        : ID === 'mountain' ? <img src={mountainIcon} className={css.transportationIcon}/>
        : ID === 'river' ? <img src={riverIcon} className={css.transportationIcon}/>
        : ID === 'desert' ? <img src={desertIcon} className={css.transportationIcon}/>

        : ID === 'restaurant' ? <img src={restaurantIcon} className={css.transportationIcon}/>
        : ID === 'bar' ? <img src={barIcon} className={css.transportationIcon}/>
        : ID === 'cafe' ? <img src={cafeIcon} className={css.transportationIcon}/>
        : ID === 'grocery_store' ? <img src={groceryIcon} className={css.transportationIcon}/>
        : ID === 'hospital' ? <img src={hospitalIcon} className={css.transportationIcon}/>
        : ID === 'airport' ? <img src={airportIcon} className={css.transportationIcon}/>
        : ID === 'shopping_mall' ? <img src={shoppingIcon} className={css.transportationIcon}/>
        : ID === 'gym' ? <img src={gymIcon} className={css.transportationIcon}/>

        : ID === 'winery' ? <img src={wineryIcon} className={css.transportationIcon}/>
        : ID === 'brewery' ? <img src={breweryIcon} className={css.transportationIcon}/>
        : ID === 'roastery' ? <img src={roasteryIcon} className={css.transportationIcon}/>
        : ID === 'zoo' ? <img src={zooIcon} className={css.transportationIcon}/>


        : <IconCheck isVisible={isSelected} />
      }
      </span>
      <div className={css.labelWrapper}>
        <span className={labelClass}>{label}</span>
      </div>
    </li>
  );
};

const OnlyVisiblePropertyGroup = props => {
  const { rootClassName, className, id, options, selectedOptions, fiveColumns} = props;
  const classes = classNames(rootClassName || css.root, className);
  const listClasses = fiveColumns ? classNames(classes, css.fiveColumns) : classes;

  const checked = checkSelected(options, selectedOptions);

  return (
    <ul className={listClasses}>
      {checked.map(option => (
        <Item key={`${id}.${option.key}`} ID={option.key} label={option.label} isSelected={option.isSelected} />
      ))}
    </ul>
  );
};

OnlyVisiblePropertyGroup.defaultProps = {
  rootClassName: null,
  className: null,
  selectedOptions: [],
  fiveColumns: false,
};

const { arrayOf, bool, node, shape, string } = PropTypes;

OnlyVisiblePropertyGroup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ),
  selectedOptions: arrayOf(string),
  fiveColumns: bool,
};

export default OnlyVisiblePropertyGroup;
