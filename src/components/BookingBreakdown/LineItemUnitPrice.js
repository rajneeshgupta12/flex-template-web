import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';

import css from './BookingBreakdown.css';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;

const LineItemUnitPrice = props => {
  const { transaction, unitType, intl, otherCharges } = props;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const translationKey = isNightly
    ? 'BookingBreakdown.pricePerNight'
    : isDaily
      ? 'BookingBreakdown.pricePerDay'
      : 'BookingBreakdown.pricePerQuantity';

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  if (!unitPurchase) {
    throw new Error(`LineItemUnitPrice: lineItem (${unitType}) missing`);
  }
  const formattedUnitPrice = formatMoney(intl, unitPurchase.unitPrice);
  let cleaningFee = otherCharges && otherCharges.cleaning_fee && otherCharges.cleaning_fee.amount || 0
  const formattedCleaningFee = formatMoney(intl, new Money(cleaningFee, "USD")
  );
  return (
    <div>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id={translationKey} />
        </span>

        <span className={css.itemValue}>{formattedUnitPrice}</span>
      </div>
      {otherCharges&&otherCharges.cleaning_fee &&
        <div className={css.lineItem}>
          <span className={css.itemLabel}>
            Cleaning Fee
        </span>
          <span className={css.itemValue}>{formattedCleaningFee}</span>
        </div>
      }    {otherCharges && otherCharges.tax && <div className={css.lineItem}>
        <span className={css.itemLabel}>
          Tax
        </span>
        <span className={css.itemValue}>{otherCharges.tax}%</span>
      </div>
      }
    </div>
  );
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
