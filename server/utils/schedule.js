var {
  isSameDayMonthYear,
  durationInDays,
  durationInHours,
  formatDateToYearMonthDay,
  fromISOString
} = require("./dateHelper");
var moment = require('moment')

var r = require("ramda");

const workingStartTime = "08:00";
const workingEndTime = "17:00";

const workingDays = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday"
};

const firstDayEventStart = "09:00";
const firstDayEventEnd = "21:30";
const secondDayEventStart = "1:00";
const secondDayEventEnd = "13:00";

const generateEventForDateStringsAndStatus = (
  startDateString,
  endDateString,
  status
) => ({
  status,
  start: {
    dateTime: startDateString,
    timeZone: "Pacific Standard Time"
  },
  end: {
    dateTime: endDateString,
    timeZone: "Pacific Standard Time"
  }
});

const generateEventsForDateString = dateString => {
  return [
  generateEventForDateStringsAndStatus(
    moment(dateString + ' ' + firstDayEventStart, 'DD/MM/YYYY HH:mm'),
    moment(dateString + ' ' + firstDayEventEnd, 'DD/MM/YYYY HH:mm'),
    "Tentative"
  ),
  generateEventForDateStringsAndStatus(
    moment(dateString + ' ' + secondDayEventStart, 'DD/MM/YYYY HH:mm'),
    moment(dateString + ' ' + secondDayEventEnd, 'DD/MM/YYYY HH:mm'),
    "Busy"
  )
];}

const generateEvents = (startDate, endDate) => {
  const days = durationInDays(startDate, endDate);
  const daysVector = r.range(0, days + 1);
  const fromThisDay = startDate.clone();

  const allEvents = r.reduce(
    (acc, day) =>
      r.concat(
        acc,
        generateEventsForDateString(
          formatDateToYearMonthDay(fromThisDay.add(day, 'days'))
        )
      ),
    [],
    daysVector
  );
  return r.filter(event => {
    const eventStartDate = fromISOString(moment(event.start.dateTime));
    const eventEndDate = fromISOString(event.end.dateTime);

    return fromISOString(moment(startDate)) < eventEndDate && fromISOString(moment(endDate)) >= eventStartDate;
  }, allEvents);
};

const generateAvailabilityView = (startDate, endDate, events) => {
  const hours = r.range(0, durationInHours(startDate, endDate));
  const availableSlots = []
  return (r.map(hour => {
      const date = startDate.add( hour, "hours" );

      const collision = r.find(event => {
        const eventStartDate = moment(event.start.dateTime, moment.ISO_8601);
        const eventEndDate = moment(event.end.dateTime, moment.ISO_8601);
        
        return date >= eventStartDate && date < eventEndDate;
      }, events);

      return collision ? {date: date} : 0;
    }, hours));
  }
  

exports.generateOffice365Schedule = (startDate, endDate) => {
  const events = generateEvents(startDate, endDate);
  const availabilityView = generateAvailabilityView(startDate, endDate, events);
  var output = []
  availabilityView.map(item => {
    if (item) {
      return {
        date: formatDateToYearMonthDay(item.date),
        availableSlots: [
          { startTime: item.date.format('HH:mm'), endTime: item.date.add(1, "hours").format('HH:mm') },
        ]}
    }
  }).forEach(function(item) {
    if (item) {
      var existing = output.filter(function(v, i) {
        return v.date == item.date;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].availableSlots = output[existingIndex].availableSlots.concat(item.availableSlots);
      } else {
        if (typeof item.availableSlots == 'string')
          item.availableSlots = [item.availableSlots];
        output.push(item);
      }
    }
  });

  return output
};
