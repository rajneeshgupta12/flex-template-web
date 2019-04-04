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
    
      <h2>1 AGREEMENT TO TERMS</h2>
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

      <h2>2 Sed ut perspiciatis unde</h2>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
        dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
        molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
      </p>

      <h2>3 At vero eos et accusamus</h2>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
        voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
        est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
        libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
        maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
        Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
        et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
        sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
        doloribus asperiores repellat
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
