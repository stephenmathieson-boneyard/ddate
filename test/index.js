
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

/*
  describe('DiscordianDate#getDay');

  describe('DiscordianDate#getWeekday');

  describe('DiscordianDate#getSeason');

  describe('DiscordianDate#getYear');
*/

  describe('.ending()', function () {
    it('should handle days ending in 0', function () {
      assert(ddate.ending(0) === 'th');
      assert(ddate.ending(10) === 'th');
      assert(ddate.ending(20) === 'th');
    });

    it('should handle days ending in 1', function () {
      assert(ddate.ending(1) === 'st');
      assert(ddate.ending(11) === 'th');
      assert(ddate.ending(21) === 'st');
    });

    it('should handle days ending in 2', function () {
      assert(ddate.ending(2) === 'nd');
      // differs from ddate(1)
      assert(ddate.ending(12) === 'th');
      assert(ddate.ending(22) === 'nd');
    });

    it('should handle days ending in 3', function () {
      assert(ddate.ending(3) === 'rd');
      assert(ddate.ending(13) === 'th');
      assert(ddate.ending(23) === 'rd');
    });

    it('should handle days ending in 4', function () {
      assert(ddate.ending(4) === 'th');
      assert(ddate.ending(14) === 'th');
      assert(ddate.ending(24) === 'th');
    });

    it('should handle days ending in 5', function () {
      assert(ddate.ending(5) === 'th');
      assert(ddate.ending(15) === 'th');
      assert(ddate.ending(25) === 'th');
    });

    it('should handle days ending in 6', function () {
      assert(ddate.ending(6) === 'th');
      assert(ddate.ending(16) === 'th');
      assert(ddate.ending(26) === 'th');
    });

    it('should handle days ending in 7', function () {
      assert(ddate.ending(7) === 'th');
      assert(ddate.ending(17) === 'th');
      assert(ddate.ending(27) === 'th');
    });

    it('should handle days ending in 8', function () {
      assert(ddate.ending(8) === 'th');
      assert(ddate.ending(18) === 'th');
      assert(ddate.ending(28) === 'th');
    });

    it('should handle days ending in 9', function () {
      assert(ddate.ending(9) === 'th');
      assert(ddate.ending(19) === 'th');
      assert(ddate.ending(29) === 'th');
    });

    // NOTE: this differs from ddate(1)
    it('should handle the 12th', function () {
      assert(ddate.ending(12) === 'th');
    });
  });
});
