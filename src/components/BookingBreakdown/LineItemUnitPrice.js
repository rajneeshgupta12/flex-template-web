import React from 'react';
import { FormattedMessage, intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import moment from 'moment';
import { Modal, Button } from '../../components';

import css from './BookingBreakdown.css';
import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;

class LineItemUnitPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false, formattedUnitPrice: '' };
  }

  componentDidMount(){
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

  setPrice = (init)=>{
    const { totalAmountDetails } = this.props.totalAmount;
    let avgPrice = 0
    totalAmountDetails.forEach(day => {
      avgPrice += day.charge
    })
    let formattedUnitPrice = (avgPrice) / (totalAmountDetails.length)
    formattedUnitPrice = (formattedUnitPrice / 100).toFixed(2).toString()
    this.setState({formattedUnitPrice})
    if(init){
      // this.props.setFormattedUnitPrice(formattedUnitPrice)
    }
  }

  render() {
    const { transaction, unitType, intl, otherCharges, totalAmount, publicData, totalGlampers } = this.props;
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
    return (
      <div>
        <div onClick={() => {
          this.setState({ showDetails: !this.state.showDetails })
        }}>
          ?
        </div>
        <Modal id="UniqueIdForThisModal" isOpen={this.state.showDetails} onClose={() => {
          this.setState({ showDetails: !this.state.showDetails })
        }}
          onManageDisableScrolling={() => { }} >
          <ul>
            {totalAmountDetails.map(days => {
              return <li> {moment(days.selectedDay).format("ll")} ${days.charge / 100}</li>
            })}
          </ul>
        </Modal>
        <div className={css.lineItem}>
          <span className={css.itemLabel}>
            <FormattedMessage id={translationKey} />
          </span>
          <span className={css.itemValue}>{formattedUnitPrice}</span>

        </div>
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
            <span className={css.itemValue}>{formattedExtraGuestFee}</span>
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
};

LineItemUnitPrice.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPrice;
