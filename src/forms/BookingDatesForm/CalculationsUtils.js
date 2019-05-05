import moment from 'moment';

const getDateObj = (date) => {
  return new moment(date)
}

const enumerateDaysBetweenDates = (startDate, endDate) => {
  let now = startDate.clone(), dates = [];

  while (now.isSameOrBefore(endDate)) {
    dates.push(getDateObj(now));
    now.add(1, 'days');
  }
  return dates;
};

export const CalculateAmount = (startDate, endDate, otherCharges, rates, basePrice) => {

  const selectedStartDate = getDateObj(startDate),
    selectedEndDate = getDateObj(endDate),
    otherDates = JSON.parse(otherCharges.calenders || ''),
    endDateSpecial = otherDates && otherDates.endDateSpecial && getDateObj(otherDates.endDateSpecial),
    endDateSeasonal = otherDates && otherDates.endDateSeasonal && getDateObj(otherDates.endDateSeasonal),
    startDateSeasonal = otherDates && otherDates.startDateSeasonal && getDateObj(otherDates.startDateSeasonal),
    startDateSpecial = otherDates && otherDates.startDateSpecial && getDateObj(otherDates.startDateSpecial);
  const selectedDays = enumerateDaysBetweenDates(selectedStartDate, selectedEndDate)
  let totalPrice = 0;
  selectedDays.length > 1 && selectedDays.pop();
  let totalAmountDetails = []
  selectedDays.forEach(selectedDay => {
    let isWeekendDay = selectedDay.isoWeekday() == 5 || selectedDay.isoWeekday() == 6 ? true : false
    if (isWeekendDay && selectedDay >= startDateSpecial && selectedDay <= endDateSpecial && rates.special_weekend.amount) {
      totalPrice += rates.special_weekend.amount
      totalAmountDetails.push({ selectedDay, charge: rates.special_weekend.amount })
      return null
    }
    if (selectedDay >= startDateSpecial && selectedDay <= endDateSpecial && rates.special_price.amount) {
      totalPrice += rates.special_price.amount
      totalAmountDetails.push({ selectedDay, charge: rates.special_price.amount })
      return null
    }
    if (isWeekendDay && selectedDay >= startDateSeasonal && selectedDay <= endDateSeasonal && rates.seasonal_weekend.amount) {
      totalPrice += rates.seasonal_weekend.amount
      totalAmountDetails.push({ selectedDay, charge: rates.seasonal_weekend.amount })
      return null
    }
    if (selectedDay >= startDateSeasonal && selectedDay <= endDateSeasonal && rates.seasonal_price.amount) {
      totalPrice += rates.seasonal_price.amount
      totalAmountDetails.push({ selectedDay, charge: rates.seasonal_price.amount })
      return null
    }
    if (isWeekendDay && rates&&rates.weekend_price&&rates.weekend_price.amount) {
      totalPrice += rates.weekend_price.amount
      totalAmountDetails.push({ selectedDay, charge: rates.weekend_price.amount })
      return null
    } else {
      totalPrice += basePrice.amount
      totalAmountDetails.push({ selectedDay, charge: basePrice.amount })
      return null
    }
  })
  let avgPrice = 0
  totalAmountDetails.forEach(day => {
    avgPrice += day.charge
  })

  return { totalPrice, totalAmountDetails, averagePrice:(avgPrice) / (totalAmountDetails.length) }
}
