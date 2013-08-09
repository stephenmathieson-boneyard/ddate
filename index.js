
var isLeapYear = require('is-leap-year'),
    dayOfYear = require('day-of-year');

exports = module.exports = function (date) {
  return new DiscordianDate(date);
};

/**
 * Get the ending of the given `day`
 *
 * This doesn't actually match `ddate(1)`, as
 * it doesn't properly map `12` to `12th`.
 *
 * @api private
 * @param {Number} day
 * @return {String}
 */
exports.ending = function (day) {
  return Math.floor(day / 10) === 1
      ? 'th'
      : (day % 10 === 1
        ? 'st'
        : (day % 10 === 2
          ? 'nd'
          : (day % 10 === 3
            ? 'rd'
            : 'th')));
};

/**
 * The five Discordian seaons
 *
 * @api private
 * @type {Object}
 */
exports.seasons = {
  'long': [
    'Chaos',
    'Discord',
    'Confusion',
    'Bureaucracy',
    'The Aftermath'
  ],
  'short': [
    'Chs',
    'Dsc',
    'Cfn',
    'Bcy',
    'Afm'
  ]
};

/**
 * The five Discordian weekdays
 *
 * @api private
 * @type {Object}
 */
exports.weekdays = {
  'long': [
    'Sweetmorn',
    'Boomtime',
    'Pungenday',
    'Prickle-Prickle',
    'Setting Orange'
  ],
  'short': [
    'SM',
    'BT',
    'PD',
    'PP',
    'SO'
  ]
};

/**
 * Expose the constructor
 *
 * @api private
 */
exports.DiscordianDate = DiscordianDate;

/**
 * Create a new Discordian Date of the given `date`.
 *
 * When no `date` is provided, will default to the current date
 *
 * @api private
 * @param {String|Date} [date]
 */
function DiscordianDate(date) {
  date = date instanceof Date
    ? date
    : typeof date === 'string'
      ? new Date(date)
      : new Date;

  this._gregorian = date;
  this._dayOfYear = dayOfYear(date);
}

DiscordianDate.prototype.toString =
DiscordianDate.prototype.format = function (format) {
  format = format || '%A %B %e, YOLD %Y';

  var str = '';

  for (var i = 0, len = format.length, c = null; i < len; i++) {
    c = format.charAt(i);
    if (c === '%') {
      i++;
      switch (format.charAt(i)) {
      case 'A':
        str += this.getWeekday(true);
        break;
      case 'a':
        str += this.getWeekday();
        break;
      case 'B':
        str += this.getSeason(true);
        break;
      case 'b':
        str += this.getSeason();
        break;
      case 'd':
        str += this.getDay();
        break;
      case 'e':
        str += this.getDay(true);
        break;
      case 'n':
        str += '\n';
        break;
      case 't':
        str += '\t';
        break;
      case 'Y':
        str += this.getYear();
      }
    } else {
      str += c;
    }
  }

  return str;
};

/**
 * Get the day with an optional ending
 *
 * @api public
 * @param {Boolean} [useLong]
 * @return {String}
 */
DiscordianDate.prototype.getDay = function (useLong) {
  var day = Math.floor(this._dayOfYear % 73);

  if (useLong) {
    return day + exports.ending(day);
  }

  return day;
};

/**
 * Get the weekday with an optional ending
 *
 * @api public
 * @param {Boolean} [useLong]
 * @return {String}
 */
DiscordianDate.prototype.getWeekday = function (useLong) {
  var day = this._dayOfYear - 1;
  return exports.weekdays[useLong ? 'long' : 'short'][day % 5];
};

/**
 * Get the season
 *
 * @api public
 * @param {Boolean} [useLong]
 * @return {String}
 */
DiscordianDate.prototype.getSeason = function (useLong) {
  var season = Math.floor(this._dayOfYear / 73);
  return exports.seasons[useLong ? 'long' : 'short'][season];
};

DiscordianDate.prototype.getYear = function () {
  return this._gregorian.getFullYear() + 1166;
};
