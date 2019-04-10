import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ResponsiveImage, Modal, ImageCarousel } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';
import _ from "lodash"

import css from './ListingPage.css';

const SectionImages = props => {
  const {
    title,
    listing,
    isOwnListing,
    editParams,
    handleViewPhotosClick,
    imageCarouselOpen,
    onImageCarouselClose,
    onManageDisableScrolling,
  } = props;
  const hasImages = listing.includedRelationships && listing.includedRelationships[1].type === 'image';
  const firstImage = hasImages ? listing.includedRelationships[1] : null;
  let allImages = hasImages && _.partition(listing.includedRelationships, function (relationship) { return relationship.type === 'image'; });
  // Action bar is wrapped with a div that prevents the click events
  // to the parent that would otherwise open the image carousel
  const actionBar = listing.id ? (
    <div onClick={e => e.stopPropagation()}>
      <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
    </div>
  ) : null;

  const viewPhotosButton = hasImages ? (
    <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
      <FormattedMessage
        id="ListingPage.viewImagesButton"
        values={{ count: listing.includedRelationships[1].length }}
      />
    </button>
  ) : null;
  return (
    <div className={css.sectionImages}>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>
          {actionBar}
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={[
              'landscape-crop',
              'landscape-crop2x',
              'landscape-crop4x',
              'landscape-crop6x',
            ]}
          />
          {viewPhotosButton}
        </div>
      </div>
      <Modal
        id="ListingPage.imageCarousel"
        scrollLayerClassName={css.carouselModalScrollLayer}
        containerClassName={css.carouselModalContainer}
        lightCloseButton
        isOpen={imageCarouselOpen}
        onClose={onImageCarouselClose}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        {hasImages &&
          <ImageCarousel images={allImages && allImages[0] || []} />}
      </Modal>
    </div>
  );
};

export default SectionImages;
