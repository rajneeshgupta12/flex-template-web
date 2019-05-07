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

import libraryIcon from '../../assets/LibraryB.png';
import movieIcon from '../../assets/MovieB.png';
import theaterIcon from '../../assets/TheaterB.png';
import museumIcon from '../../assets/HistoricB.png';
import artIcon from '../../assets/ArtB.png';

import lakeIcon from '../../assets/LakeB.png';
import beachIcon from '../../assets/LakeB.png';
import parkIcon from '../../assets/ForestB.png';
import mountainIcon from '../../assets/MountainB.png';
import riverIcon from '../../assets/MountainB.png';
import desertIcon from '../../assets/MountainB.png';

import restaurantIcon from '../../assets/RestaurantB.png';
import barIcon from '../../assets/BarB.png';
import cafeIcon from '../../assets/CafeB.png';
import groceryIcon from '../../assets/GroceryB.png';
import hospitalIcon from '../../assets/HospitalB.png';
import airportIcon from '../../assets/AirportB.png';
import shoppingIcon from '../../assets/ShoppingB.png';
import gymIcon from '../../assets/GymB.png';

import wineryIcon from '../../assets/WineryB.png';
import breweryIcon from '../../assets/BreweryB.png';
import roasteryIcon from '../../assets/RoasteryB.png';
import zooIcon from '../../assets/ZooB.png';
import tourIcon from '../../assets/SightB.png';



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
  const { label, ID, category, isSelected } = props;
  const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
  if (!isSelected && (category === 'Culture' || category === 'Nature' || category === 'tour'))
    return;
  else
  return (

    <li className={css.item}>
      <span className={css.iconWrapper}>

        { ID === 'ride_service' ? <img src={rideIcon} className={css.transportationIcon}/>
        : ID === 'bus' ? <img src={busIcon} className={css.transportationIcon}/>
        : ID === 'subway' ? <img src={subwayIcon} style={{bottom: '-1px'}} className={css.transportationIcon}/>
        : ID === 'train' ? <img src={trainIcon} className={css.transportationIcon}/>
        : ID === 'parking_available' ? <img src={parkingIcon} className={css.transportationIcon}/>

        : ID === 'library' ? <div className={css.circle}> <img src={libraryIcon} className={css.facilityIcon}/></div>
        : ID === 'movie_theater' ? <div className={css.circle}><img src={movieIcon} className={css.facilityIcon}/></div>
        : ID === 'theater' ?<div className={css.circle}> <img src={theaterIcon} className={css.facilityIcon}/></div>
        : ID === 'museum' ? <div className={css.circle}><img src={museumIcon} className={css.facilityIcon}/></div>
        : ID === 'art_gallery' ? <div className={css.circle}><img src={artIcon} className={css.facilityIcon}/></div>

        : ID === 'lake' ? <div className={css.circle}><img src={lakeIcon} className={css.facilityIcon}/></div>
        : ID === 'beach' ? <div className={css.circle}><img src={beachIcon} className={css.facilityIcon}/></div>
        : ID === 'park' ? <div className={css.circle}><img src={parkIcon} className={css.facilityIcon}/></div>
        : ID === 'mountain' ? <div className={css.circle}><img src={mountainIcon} className={css.facilityIcon}/></div>
        : ID === 'river' ? <div className={css.circle}><img src={riverIcon} className={css.facilityIcon}/></div>
        : ID === 'desert' ? <div className={css.circle}><img src={desertIcon} className={css.facilityIcon}/></div>

        : ID === 'restaurant' ? <div className={css.circle}><img src={restaurantIcon} className={css.facilityIcon} /></div>
        : ID === 'bar' ? <div className={css.circle}><img src={barIcon} className={css.facilityIcon}/></div>
        : ID === 'cafe' ? <div className={css.circle}><img src={cafeIcon} className={css.facilityIcon}/></div>
        : ID === 'grocery_store' ?<div className={css.circle}> <img src={groceryIcon} className={css.facilityIcon}/></div>
        : ID === 'hospital' ? <div className={css.circle}><img src={hospitalIcon} className={css.facilityIcon}/></div>
        : ID === 'airport' ? <div className={css.circle}><img src={airportIcon} className={css.facilityIcon}/></div>
        : ID === 'shopping_mall' ? <div className={css.circle}><img src={shoppingIcon} className={css.facilityIcon}/></div>
        : ID === 'gym' ? <div className={css.circle}><img src={gymIcon} className={css.facilityIcon}/></div>

        : ID === 'winery' ?<div className={css.circle}> <img src={wineryIcon} className={css.facilityIcon}/></div>
        : ID === 'brewery' ? <div className={css.circle}><img src={breweryIcon} className={css.facilityIcon}/></div>
        : ID === 'roastery' ? <div className={css.circle}><img src={roasteryIcon} className={css.facilityIcon}/></div>
        : ID === 'zoo' ? <div className={css.circle}><img src={zooIcon} className={css.facilityIcon}/></div>
        : ID === 'tour_spot' ? <div className={css.circle}><img src={tourIcon} className={css.facilityIcon}/></div>


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
        <Item category={id} key={`${id}.${option.key}`} ID={option.key} label={option.label} isSelected={option.isSelected} />
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
