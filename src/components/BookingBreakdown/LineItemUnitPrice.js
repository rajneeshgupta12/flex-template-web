import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import moment from 'moment';
import { Modal, Button } from '../../components';
import LineItemBookingPeriod from './LineItemBookingPeriod';

import css from './BookingBreakdown.css';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;

class LineItemUnitPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false, formattedUnitPrice: '' };
  }

  componentDidMount() {
    // const { totalAmountDetails } = this.props.totalAmount;
    // let avgPrice = 0
    // totalAmountDetails.forEach(day => {
    //   avgPrice += day.charge
    // })
    // let formattedUnitPrice = (avgPrice) / (totalAmountDetails.length)
    // formattedUnitPrice = (formattedUnitPrice / 100).toFixed(2).toString()
    // this.setState({formattedUnitPrice})
    // console.log('0000000')
    this.setPrice(true)
    // this.props.setFormattedUnitPrice(formattedUnitPrice)
  }

  componentWillReceiveProps(nextProps) {
    this.setPrice(false)
  }

  setPrice = (init) => {
    const { totalAmountDetails } = this.props.totalAmount;
    let avgPrice = 0
    totalAmountDetails.forEach(day => {
      avgPrice += day.charge
    })
    let formattedUnitPrice = (avgPrice) / (totalAmountDetails.length)
    formattedUnitPrice = (formattedUnitPrice / 100).toFixed(2).toString()
    this.setState({ formattedUnitPrice })
    if (init) {
      // this.props.setFormattedUnitPrice(formattedUnitPrice)
    }
  }

  render() {
    const { transaction, booking, unitType, intl, otherCharges, totalAmount, publicData, totalGlampers } = this.props;
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

    // const { totalAmountDetails } = totalAmount;
    // let avgPrice = 0
    // totalAmountDetails.forEach(day => {
    //   avgPrice += day.charge
    // })
    let totalExtraGuests = 0
    totalExtraGuests = totalGlampers - this.props.allowedGuestNumber;
    const { totalAmountDetails } = totalAmount;

    // let formattedUnitPrice = (avgPrice) / (totalAmountDetails.length)
    // formattedUnitPrice = (formattedUnitPrice / 100).toFixed(2).toString()
    const { formattedUnitPrice } = this.state
    let cleaningFee = otherCharges && otherCharges.cleaning_fee && otherCharges.cleaning_fee.amount || 0
    let extraGuestFee = otherCharges && otherCharges.extra_guest_fee && otherCharges.extra_guest_fee.amount || 0
    const formattedCleaningFee = formatMoney(intl, new Money(cleaningFee, "USD")
    );
    const formattedExtraGuestFee = formatMoney(intl, new Money(extraGuestFee, "USD")
    );
    let totalPrice = 0
    return (
      <div>
        <div className={css.lineItem}>
          <span className={css.itemLabel}>
            <FormattedMessage id={translationKey} />
          </span>
          <span className={css.itemValue}>{formattedUnitPrice}</span>

        </div>

        <LineItemBookingPeriod transaction={transaction} booking={booking} unitType={unitType} />
        {otherCharges && otherCharges.cleaning_fee &&
          <div className={css.lineItem}>
            <span className={css.itemLabel}>
              Cleaning Fee
        </span>
            <span className={css.itemValue}>{formattedCleaningFee}</span>
          </div>
        }
        {otherCharges && otherCharges.extra_guest_fee && totalExtraGuests > 0 &&
          <div className={css.lineItem}>
            <span className={css.itemLabel}>
              Extra Guest Fee
        </span>
            <span className={css.itemValue}>{formattedExtraGuestFee}</span> /Head
          </div>
        }
        {otherCharges && otherCharges.tax && <div className={css.lineItem}>
          <span className={css.itemLabel}>
            Tax
        </span>
          <span className={css.itemValue}>{otherCharges.tax}%</span>
        </div>
        }
        <div onClick={() => {
          this.setState({ showDetails: !this.state.showDetails })
        }}>
          Show price details
        </div>
        <Modal id="UniqueIdForThisModal" isOpen={this.state.showDetails} onClose={() => {
          this.setState({ showDetails: !this.state.showDetails })
        }} onManageDisableScrolling={() => { }} >
          Base price breakdown
          <ul>
            {totalAmountDetails.map(days => {
              totalPrice += days.charge / 100
              return <li key={Math.random()}> {moment(days.selectedDay).format("ll")} ${days.charge / 100}</li>
            })}
          </ul>
          <hr />
          <strong> Total Base price {totalPrice}</strong>
          <hr />
          {otherCharges && otherCharges.cleaning_fee &&
            <div className={css.lineItem}>
              <span className={css.itemLabel}>
                <strong>   Cleaning Fee</strong>
              </span>
              <span className={css.itemValue}> <strong>{formattedCleaningFee}</strong></span>
            </div>
          }
          <hr />
          {otherCharges && otherCharges.extra_guest_fee && totalExtraGuests > 0 &&
            <div className={css.lineItem}>
              <span className={css.itemLabel}>
                <strong>Extra Guest Fee</strong>
              </span>
              <span className={css.itemValue}><strong>{formattedExtraGuestFee}</strong>
              </span> /Head
          </div>
          }
          <hr />

          {otherCharges && otherCharges.tax && <div className={css.lineItem}>
            <span className={css.itemLabel}>
              <strong>    Tax</strong>
            </span>
            <span className={css.itemValue}><strong>{otherCharges.tax}%</strong></span>
          </div>
          }
          <hr />

          <div>
            <span className={css.itemLabel}>
              <strong> Service fee</strong>
            </span>
            <strong>   <span className={css.itemValue}>10%</span></strong>
          </div>
          <hr />
          <strong>Total Base price{totalPrice}</strong>
        </Modal>
      </div >
    );
  };
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
