import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './TermsOfService.css';

const TermsOfService = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);

  // prettier-ignore
  return (
    <div className={classes}>
      <p className={css.lastUpdated}>Last updated: April 2, 2019</p>
    
      <h2>AGREEMENT TO TERMS</h2>
      <p>
        These Terms of Use constitute a legally binding agreement made between you, whether personally 
        or on behalf of an entity (“you”) and Glamp Oasis (“we,” “us” or “our”), concerning your access to 
        and use of the glampoasis.com website as well as any other media form, media channel, mobile website 
        or mobile application related, linked, or otherwise connected thereto (collectively, the “Glamp Oasis”). 
      </p>
      <p>
        You agree that by accessing Glamp Oasis, you have read, understood, and agree to be bound by all of these 
        Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from 
        using Glamp Oasis and you must discontinue use immediately. 
      </p>
      <p>
        Supplemental terms and conditions or documents that may be posted on Glamp Oasis from time to time are 
        hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make 
        changes or modifications to these Terms of Use at any time and for any reason.
      </p>
      <p>
        We will alert you about any changes by updating the “Last updated” date of these Terms of Use, and you waive 
        any right to receive specific notice of each such change. 
      </p>
      <p>
        It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be 
        subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms 
        of Use by your continued use of Glamp Oasis after the date such revised Terms of Use are posted. 
      </p>
      <p>
        The information provided on Glamp Oasis is not intended for distribution to or use by any person or entity in 
        any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would 
        subject us to any registration requirement within such jurisdiction or country. 
      </p>
      <p>
        Accordingly, those persons who choose to access Glamp Oasis from other locations do so on their own initiative 
        and are solely responsible for compliance with local laws, if and to the extent local laws are applicable. 
      </p>
      <p>
        Glamp Oasis is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted 
        to use or register for Glamp Oasis. 
      </p>

      <h2>TERMS APPLICABLE TO GUESTS</h2>
      <p>
        <bold>Booking.</bold> 
        These Terms and Conditions shall govern any Booking, in addition to any terms and conditions 
        applicable to Hosts and Property.
      </p>
      <p>
        <bold>Bookings.</bold>
        Glamp Oasis acts solely as an online service that facilitates communication between Guests and Hosts 
        and shall not be construed as a party to any transaction.
      </p>
      <p>
        Pricing for Bookings is set by the applicable Host. By making a Booking, you agree that you, and not Glamp 
        Oasis, will be responsible for upholding the obligations of any agreement you may have with a Host or of 
        Glamping Rules (defined below) set forth by a Host. You further acknowledge and agree that you, and not Glamp 
        Oasis, shall be responsible for any liability arising from or related to any such agreements, requirements, 
        or policies.
      </p>
      <p>
        In the event that a Host claims for damage and provides evidence thereof, Guests agree to be solely liable 
        for the damage, as described below.
      </p>
      <p>
        <bold>Property.</bold> 
        You acknowledge and agree that you will comply with all applicable policies that are created by 
        the Host (“Glamping Rules”), federal or state laws, rules, regulations, and local ordinances. Use of any 
        Property will be subject to: (i) availability of the Property as provided by the Host; (ii) payment of all 
        fees and charges associated with Booking prior to the first day of the reservation; and (iii) compliance 
        with the Terms of Use, Glamping Rules, federal or state laws, rules, regulations, and local ordinances.
      </p>
      <p>
        A violation of Glamping Rules may result in cancellation of Booking(s), forfeiture of any monies paid 
        for such Booking(s), rescission of access to any Property, and/or termination of your Account. 
      </p>
      <p>
        <bold>Damage to Property.</bold> 
        As a Guest, you are responsible for leaving the Property in the initial condition 
        it was provided to you. You acknowledge and agree that you are responsible for any damages arising from 
        your Booking for the length of your occupancy at the applicable Property. You agree that Glamp Oasis is 
        authorized to charge your Account for all fees and charges due and payable to Glamp Oasis for the
        distribution to the Hosts for any damage to the Property and that no consent is required.
      </p>
      <p>
        Upon receipt of the claim for damage and evidence thereof from a Host, Glamp Oasis will notify Guests 
        of the claim and provide forty eight (48) hours to respond to the claim. If no response is received within 
        the specified period of time, the payment will be charged to and taken from the credit card on file in 
        your Account. If a response is received, Glamp Oasis will investigate the claim and response.
      </p>
      <p>
        <bold>Promotions.</bold>
        Glamp Oasis, at its sole discretion, may provide promotional offers, deals and/or codes in 
        connection with Booking(s). We reserve the right to modify the terms of such offers, suspend such 
        offers with or without notice, and reject or refuse to honor any promotions with or without cause. 
      </p>

      <h2>TERMS APPLICABLE TO HOSTS</h2>
      <p>
        <bold>Listings.</bold> 
        By making your Property available to Guests for Booking and occupancy, you may create a 
        listing of your Property on our Website (“Listing”). Before any Listing is made available to Guests, 
        you are required to verify your identity, provide information about your Property, describe Glamping Rules, 
        and set fees associated with Booking. By making any Listing you acknowledge and agree that: (1) your 
        Listing will be made publicly available on our Website, (2) Glamp Oasis may remove or hide your Listing 
        from its Website for any reason, and (3) you will bear the responsibility of complying with any laws 
        applicable to the jurisdiction in which your Property is located.
      </p>
      <p>
        You may create unique policies for your Property, such as check-in and check-out time, provided that 
        said policies do not conflict or violate any terms of this Agreement and any federal, state, or local laws. 
      </p>
      <p>
        <bold>Compliance with Laws.</bold> 
        IT IS YOUR RESPONSIBILITY AS A HOST TO UNDERSTAND AND COMPLY WITH ALL FEDERAL 
        OR STATE LAWS, RULES, REGULATIONS, AND LOCAL ORDINANCES IN THE JURISDICTION OF YOUR PROPERTY, AS WELL 
        AS ANY THIRD-PARTY AGREEMENTS YOU MAY HAVE WITH RESPECT TO YOUR PROPERTY (E.G. LEASE OR RENTAL AGREEMENTS), 
        TAX REQUIREMENTS, ZONING REQUIREMENTS, PERMITS, LICENSES, AND REGISTRATIONS.
      </p>
      <p>
        <bold>Availability.</bold> 
        The availability and pricing of your Property is in your discretion. You have the right 
        to accept or reject Booking requests. You are not allowed to retroactively request a higher price or 
        charge additional or supplemental fees for any Booking after you have accepted a Booking request or 
        after a Booking is confirmed through Instant Book. 
      </p>
      <p>
        When you accept a Booking request or have pre-approved Instant Book, you are entering into a 
        legally binding agreement with the Guest and are required to provide your Property to the Guest as 
        described in your Listing. 
      </p>
      <p>
        <bold>Relationship with Glamp Oasis.</bold> 
        Hosts are not employees or agents of Glamp Oasis in any way. Nothing in this Agreement is intended 
        or should be construed to create a partnership, joint venture, or employer-employee relationship 
        between Glamp Oasis and you. You are not entitled to or eligible for any benefits that Glamp Oasis may 
        provide to its employees, such as health insurance, life insurance, disability benefits, pension or 
        401(k) benefits, bonus, or profit-sharing benefits.
      </p>
      <p>
        <bold>Tax.</bold> You are solely responsible for filing all tax returns and submitting all payments as required 
        by any federal, state, local, or foreign tax laws for any income you may accrue from your Listing(s). 
      </p>
  
      <h2>DISPUTES BETWEEN GUESTS AND HOSTS</h2>
      <p>
        In the event of any disputes between a Guest and a Host, Glamp Oasis may at its sole discretion assist in 
        resolving such dispute. However, both Guests and Hosts acknowledge and agree that Glamp Oasis has no liability 
        arising from any disputes.
      </p>
      <p>
        Both Guests and Hosts agree to cooperate with Glamp Oasis in good faith in its assistance in resolving any 
        disputes, including: (1) providing Glamp Oasis with any requested information, (2) taking actions as may be 
        reasonably requested by Glamp Oasis, and (3) agreeing to participate in mediation conducted by Glamp Oasis 
        or a third party selected by Glamp Oasis in an effort to resolve the dispute.
      </p>
  
      <h2>INTELLECTUAL PROPERTY RIGHTS</h2>
      <p>
        Unless otherwise indicated, Glamp Oasis is our proprietary property and all source code, databases, 
        functionality, software, website designs, audio, video, text, photographs, and graphics on Glamp Oasis 
        (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”)     
        are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and 
        various other intellectual property rights and unfair competition laws of the United States, foreign 
        jurisdictions, and international conventions. 
      </p>
      <p>
        The Content and the Marks are provided on Glamp Oasis “AS IS” for your information and personal use only. 
        Except as expressly provided in these Terms of Use, no part of Glamp Oasis and no Content or Marks may be 
        copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, 
        transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, 
        without our express prior written permission.
      </p>
      <p>
        Provided that you are eligible to use Glamp Oasis, you are granted a limited license to access and use 
        Glamp Oasis and to download or print a copy of any portion of the Content to which you have properly gained 
        access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you and 
        to Glamp Oasis in the Content and the Marks.
      </p>
  
      <h2>USER REPRESENTATIONS</h2>
      </p>
        
      </p>
    </div>
  );
};

TermsOfService.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

TermsOfService.propTypes = {
  rootClassName: string,
  className: string,
};

export default TermsOfService;
