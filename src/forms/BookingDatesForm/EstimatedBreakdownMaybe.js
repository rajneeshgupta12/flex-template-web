/**
 * Booking breakdown estimation
 *
 * Transactions have payment information that can be shown with the
 * BookingBreakdown component. However, when selecting booking
 * details, there is no transaction object present and we have to
 * estimate the breakdown of the transaction without data from the
 * API.
 *
 * If the payment process of a customized marketplace is something
 * else than simply daily or nightly bookings, the estimation will
 * most likely need some changes.
 *
 * To customize the estimation, first change the BookingDatesForm to
 * collect all booking information from the user (in addition to the
 * default date pickers), and provide that data to the
 * EstimatedBreakdownMaybe components. You can then make customization
 * within this file to create a fake transaction object that
 * calculates the breakdown information correctly according to the
 * process.
 *
 * In the future, the optimal scenario would be to use the same
 * transactions.initiateSpeculative API endpoint as the CheckoutPage
 * is using to get the breakdown information from the API, but
 * currently the API doesn't support that for logged out users, and we
 * are forced to estimate the information here.
 */
import React from 'react';
import moment from 'moment';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { dateFromLocalToAPI, nightsBetween, daysBetween } from '../../util/dates';
import { TRANSITION_REQUEST, TX_TRANSITION_ACTOR_CUSTOMER } from '../../util/transaction';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, LINE_ITEM_UNITS } from '../../util/types';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import { BookingBreakdown } from '../../components';
import { CalculateAmount } from './CalculationsUtils'

import css from './BookingDatesForm.css';

const { Money, UUID } = sdkTypes;

const estimatedTotalPrice = (unitPrice, unitCount, totalGlampers, otherCharges, totalPrice=100, totalExtraGuestsFee = 0) => {
  const numericPrice = (totalPrice / 100).toFixed(2);
  let numericTotalPrice = new Decimal(numericPrice).times(unitCount).times(totalGlampers).toNumber();
  numericTotalPrice += totalExtraGuestsFee
  numericTotalPrice += Number(otherCharges && otherCharges.cleaning_fee && otherCharges.cleaning_fee.amount / 100)
  let taxRate = Number(otherCharges && otherCharges.tax);
  numericTotalPrice += (taxRate / 100 * numericTotalPrice)
  numericTotalPrice = numericTotalPrice.toFixed(2)

  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (unitType, bookingStart, bookingEnd, unitPrice, quantity, totalGlampers, otherCharges = {}, averagePrice,
  allowedGuestNumber,
  allowedMaxGuestNumber) => {
  const now = new Date();
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  let isExtraGuest = allowedGuestNumber >= totalGlampers ? false : true;
  let totalExtraGuestsFee = 0
  if (isExtraGuest && otherCharges.extra_guest_fee) {
    totalExtraGuestsFee += otherCharges.extra_guest_fee.amount / 100;
    totalExtraGuestsFee *=  totalGlampers -allowedGuestNumber
  };
  const unitCount = isNightly
    ? nightsBetween(bookingStart, bookingEnd)
    : isDaily
      ? daysBetween(bookingStart, bookingEnd)
      : quantity;

  const totalPrice = estimatedTotalPrice(unitPrice, unitCount, totalGlampers, otherCharges, averagePrice, totalExtraGuestsFee);
  // bookingStart: "Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)"
  // Server normalizes night/day bookings to start from 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // The result is: local timestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)

  // local noon -> startOf('day') => 00:00 local => remove timezoneoffset => 00:00 API (UTC)
  const serverDayStart = dateFromLocalToAPI(
    moment(bookingStart)
      .startOf('day')
      .toDate()
  );
  const serverDayEnd = dateFromLocalToAPI(
    moment(bookingEnd)
      .startOf('day')
      .toDate()
  );

  return {
    id: new UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST,
      payinTotal: totalPrice,
      payoutTotal: totalPrice,
      lineItems: [
        {
          code: unitType,
          includeFor: ['customer', 'provider'],
          unitPrice: unitPrice,
          quantity: new Decimal(unitCount),
          lineTotal: totalPrice,
          reversal: false,
        },
      ],
      transitions: [
        {
          createdAt: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST,
        },
      ],
    },
    booking: {
      id: new UUID('estimated-booking'),
      type: 'booking',
      attributes: {
        start: serverDayStart,
        end: serverDayEnd,
      },
    },
  };
};


const EstimatedBreakdownMaybe = props => {
  const { unitType, unitPrice, startDate, endDate, quantity, totalGlampers } = props.bookingData;
  const { publicData, price, setFormattedUnitPrice, updatedTotalPrice } = props;
  const otherCharges = publicData && publicData.other_charges && {
    cleaning_fee: publicData.other_charges.cleaning_fee ? JSON.parse(publicData.other_charges.cleaning_fee) : 0,
    extra_guest_fee: publicData.other_charges.extra_guest_fee ? JSON.parse(publicData.other_charges.extra_guest_fee) : 0,
    seasonal_price: publicData.other_charges.seasonal_price ? JSON.parse(publicData.other_charges.seasonal_price) : 0,
    special_price: publicData.other_charges.special_price ? JSON.parse(publicData.other_charges.special_price) : 0,
    weekend_price: publicData.other_charges.weekend_price ? JSON.parse(publicData.other_charges.weekend_price) : 0,
    seasonal_weekend: publicData.other_charges.seasonal_weekend ? JSON.parse(publicData.other_charges.seasonal_weekend) : 0,
    special_weekend: publicData.other_charges.special_weekend ? JSON.parse(publicData.other_charges.special_weekend) : 0,
    tax: publicData.other_charges.tax ? Number(publicData.other_charges.tax) : 0,
  }
  let allowedGuestNumber = publicData.capacity.guestNumber;
  let allowedMaxGuestNumber = publicData.capacity.maxGuestNumber;
  const totalAmount = CalculateAmount(startDate, endDate, publicData.other_charges, otherCharges, price);
  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice = startDate && endDate && unitPrice && quantityIfUsingUnits && totalGlampers;
  if (!canEstimatePrice) {
    return null;
  }

  const tx = estimatedTransaction(
    unitType,
    startDate,
    endDate,
    unitPrice,
    quantity,
    totalGlampers,
    otherCharges,
    totalAmount.averagePrice,
    allowedGuestNumber,
    allowedMaxGuestNumber
  );

  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
      totalAmount={totalAmount}
      transaction={tx}
      totalGlampers={totalGlampers}
      booking={tx.booking}
      publicData={publicData}
      otherCharges={otherCharges}
      allowedGuestNumber={allowedGuestNumber}
      allowedMaxGuestNumber={allowedMaxGuestNumber}
      updatedTotalPrice={updatedTotalPrice}
      setFormattedUnitPrice={setFormattedUnitPrice}
    />
  );
};

export default EstimatedBreakdownMaybe;
