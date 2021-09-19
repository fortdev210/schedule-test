const { Settings, DateTime } = require("luxon");
var moment = require('moment')

Settings.defaultZoneName = "utc";

const diffDates = (startDate, endDate) =>
  endDate.diff(startDate)

exports.isSameDayMonthYear = (d1, d2) => {
  return (
    d1.hasSame(d2, "year") && d1.hasSame(d2, "month") && d1.hasSame(d2, "day")
  );
};

exports.now = () => DateTime.utc();

exports.durationInDays = (startDate, endDate) => {
  const duration = diffDates(startDate, endDate);
  
  const days = Math.ceil(moment.duration(duration).asDays());

  if (days == 1 && startDate.day === endDate.day) {
    return 0;
  }

  return days;
};

exports.durationInHours = (startDate, endDate) => {
  const duration = diffDates(startDate, endDate);

  return Math.ceil(moment.duration(duration).asHours());
};

exports.formatDateToYearMonthDay = date => date.format("DD/MM/YYYY");
exports.fromISOString = date => date.toISOString();


