import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';

import { NamedLink } from '../../components';

import css from './SectionDiscover.css';

import defaultImage from './images/location_rovaniemi.jpg';


class DiscoverImage extends Component {
  render() {
    const { alt, ...rest } = this.props;
    return <img alt={alt} {...rest} />;
  }
}

const LazyImage = lazyLoadWithDimensions(DiscoverImage);

const locationLink = (name, image, searchQuery, title) => {
  const nameText = <span className={css.locationName}>{name}</span>;
  return (
    <NamedLink name="SearchPage" to={{ search: searchQuery }} className={css.location}>
     
      
      <div className={css.linkText}>
        <FormattedMessage
          id={title}
          values={{ theme: nameText }}
        />
     
      </div>
	      <div className={css.imageWrapper}>
	        <div className={css.aspectWrapper}>
	          <LazyImage src={image} alt={name} className={css.locationImage} />
	        </div>	        
	      </div>   
    </NamedLink>
  );
};

class SectionDiscover extends React.Component {
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
		if (direction === "right" && this.state.left >= -320) {
			this.setState({left: this.state.left - 320});
			this.state.currentStartIndex++ ;

		} else if (direction === "right" && this.state.left <-320) {
			this.setState({left: 0});
			

			
		} else if (direction === "left" && this.state.left < 0){
			this.setState({left: this.state.left + 320});
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
					<FormattedMessage id="SectionDiscover.title" />
				</div>
				<div className={css.rowWrapper}>
				
					<button onClick={() => this.click("left")} className={css.leftArrow}>/</button>
					<button onClick={() => this.click("right")} className={css.rightArrow}>/</button>
				<div style={moveStyle} className={css.images}>
				
							{locationLink('Romantic Night', defaultImage, '?address=romantic', 'Romantic')
						}
						
							{locationLink('Romantic Night', defaultImage, '?address=romantic', 'Calm')
							}
						
							{locationLink('Romantic Night', defaultImage, '?address=romantic', 'Convienent')
							}
						
							{locationLink('Romantic Night', defaultImage, '?address=romantic', 'Great View')
							}
						
							{locationLink('Romantic Night', defaultImage, '?address=romantic', 'Isolated')
							}
						
							{locationLink('Romantic Night', defaultImage, '?address=romantic', 'One of a kind')
							}
						
				</div>

				

				</div>
			</div>
		);
	}
}

SectionDiscover.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionDiscover.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionDiscover;