import React from 'react';
import { FormattedMessage } from 'react-intl';
import { UserCard, Modal } from '../../components';
import { EnquiryForm } from '../../forms';

import css from './ListingPage.css';

const SectionHost = props => {
  const {
    title,
    listing,
    authorDisplayName,
    onContactUser,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    sendEnquiryInProgress,
    onSubmitEnquiry,
    currentUser,
    author,
    onManageDisableScrolling,
    listingAuthorName
  } = props;

  let includedRelationships = props && props.listing && props.listing.includedRelationships
  let userArrayIndex = includedRelationships.map(function (x) { return x.type; }).indexOf('user');
  let userObj = includedRelationships[userArrayIndex];
  return (
    <div id="host" className={css.sectionHost}>
      <h2 className={css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2>
      <UserCard {...props}
        user={userObj} listingAuthorName={listingAuthorName} author={author} currentUser={currentUser} onContactUser={onContactUser} />
      <Modal
        id="ListingPage.enquiry"
        contentClassName={css.enquiryModalContent}
        isOpen={isEnquiryModalOpen}
        onClose={onCloseEnquiryModal}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <EnquiryForm
          className={css.enquiryForm}
          submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
          listingTitle={title}
          authorDisplayName={authorDisplayName}
          sendEnquiryError={sendEnquiryError}
          onSubmit={onSubmitEnquiry}
          inProgress={sendEnquiryInProgress}
        />
      </Modal>
    </div>
  );
};

export default SectionHost;
