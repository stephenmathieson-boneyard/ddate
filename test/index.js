
try {
  // node
  var ddate = require('..');
  var assert = require('better-assert');
} catch (e) {
  // component
  var ddate = require('ddate');
  var assert = require('assert');
}

var DiscordianDate = ddate.DiscordianDate;

describe('ddate', function () {
  it('should default to the current date', function () {
    var now = new Date,
        res = ddate()._gregorian;

    assert(now.getFullYear() === res.getFullYear());
    assert(now.getMonth() === res.getMonth());
    assert(now.getDate() === res.getDate());
  });

  it('should allow for "new ddate()" invocation', function () {
    var date = new ddate;
    assert(date._gregorian instanceof Date);
    assert(typeof date.format === 'function');
  });

  it('should work when given a date string', function () {
    var date = ddate('August 9, 2013');
    assert(date._gregorian.getFullYear() === 2013);
    assert(date._gregorian.getMonth() === 7);
    assert(date._gregorian.getDate() === 9);
  });

  it('should expose the DiscordianDate constructor', function () {
    assert(ddate.DiscordianDate);
  });

  describe('DiscordianDate#toString', function () {
    var date;

    before(function () {
      date = new DiscordianDate(new Date(2013, 3, 12));
    });

    it('should be aliased as DiscordianDate#format', function () {
      assert(date.format === date.toString);
    });

    it('should default to "%A %B %e, YOLD %Y"', function () {
      assert(ddate.toString() === ddate.toString('%A %B %e, YOLD %Y'));
    });

    it('should replace %A with the long weekday', function () {
      assert(date.toString('%A' === 'Boomtime'));
      assert(date.toString('%A %A' === 'Boomtime Boomtime'));
      assert(date.toString('%A%A' === 'BoomtimeBoomtime'));
    });

    it('should replace %a with the short weekday', function () {
      assert(date.toString('%a' === 'BT'));
      assert(date.toString('%a %a' === 'BT BT'));
      assert(date.toString('%a%a' === 'BTBT'));
    });

    it('should replace %B with the long season', function () {
      assert(date.toString('%B' === 'Discord'));
      assert(date.toString('%B %B' === 'Discord Discord'));
      assert(date.toString('%B%B' === 'DiscordDiscord'));
    });

    it('should replace %b with the short season', function () {
      assert(date.toString('%b' === 'Dsc'));
      assert(date.toString('%b %b' === 'Dsc Dsc'));
      assert(date.toString('%b%b' === 'DscDsc'));
    });

    it('should replace %d with the day of the season', function () {
      assert(date.toString('%d' === '29'));
      assert(date.toString('%d %d' === '29 29'));
      assert(date.toString('%d%d' === '2929'));
    });

    it('should replace %e with the day of the season with its respective suffix', function () {
      assert(date.toString('%e' === '29th'));
      assert(date.toString('%e %e' === '29th 29th'));
      assert(date.toString('%e%e' === '29th29th'));
    });

    it('should replace %n with a line break', function () {
      assert(date.toString('%n' === '\n'));
      assert(date.toString('%n %n' === '\n \n'));
      assert(date.toString('%n%n' === '\n\n'));
    });

    it('should replace %t with a tab', function () {
      assert(date.toString('%t' === '\t'));
      assert(date.toString('%t %t' === '\t \t'));
      assert(date.toString('%t%t' === '\t\t'));
    });

    it('should replace %Y with a the year', function () {
      assert(date.toString('%Y' === '3179'));
      assert(date.toString('%Y %Y' === '3179 3179'));
      assert(date.toString('%Y%Y' === '31793179'));
    });

    it('should handle complex format strings', function () {
      assert(date.toString('%A %a%B%b%d%e%n%t%Y' === 'Boomtime BTDiscordDsc2929th\n\t3179'));
    });

  });

  describe('DiscordianDate#getDay', function () {
    it('should return the correct day', function () {
      assert(ddate(new Date(2013, 0, 12)).getDay() ===  12);
      assert(ddate(new Date(2013, 1, 12)).getDay() ===  43);
      assert(ddate(new Date(2013, 2, 12)).getDay() ===  71);
      assert(ddate(new Date(2013, 3, 12)).getDay() ===  29);
      assert(ddate(new Date(2013, 4, 12)).getDay() ===  59);
      assert(ddate(new Date(2013, 5, 12)).getDay() ===  17);
      assert(ddate(new Date(2013, 6, 12)).getDay() ===  47);
      assert(ddate(new Date(2013, 7, 12)).getDay() ===  5);
      assert(ddate(new Date(2013, 8, 12)).getDay() ===  36);
      assert(ddate(new Date(2013, 9, 12)).getDay() ===  66);
      assert(ddate(new Date(2013, 10, 12)).getDay() ===  24);
      assert(ddate(new Date(2013, 11, 12)).getDay() ===  54);
    });
    it('should add endings when useLong==true', function () {
      assert(ddate(new Date(2013, 0, 12)).getDay(true) ===  '12th');
      assert(ddate(new Date(2013, 1, 12)).getDay(true) ===  '43rd');
      assert(ddate(new Date(2013, 2, 12)).getDay(true) ===  '71st');
      assert(ddate(new Date(2013, 3, 12)).getDay(true) ===  '29th');
      assert(ddate(new Date(2013, 4, 12)).getDay(true) ===  '59th');
      assert(ddate(new Date(2013, 5, 12)).getDay(true) ===  '17th');
      assert(ddate(new Date(2013, 6, 12)).getDay(true) ===  '47th');
      assert(ddate(new Date(2013, 7, 12)).getDay(true) ===  '5th');
      assert(ddate(new Date(2013, 8, 12)).getDay(true) ===  '36th');
      assert(ddate(new Date(2013, 9, 12)).getDay(true) ===  '66th');
      assert(ddate(new Date(2013, 10, 12)).getDay(true) ===  '24th');
      assert(ddate(new Date(2013, 11, 12)).getDay(true) ===  '54th');
    });
  });

  describe('DiscordianDate#getWeekday', function () {
    it('should return the correct weekday', function () {

    });
  });

/*
  describe('DiscordianDate#getSeason');

  describe('DiscordianDate#getYear');
*/
});
