const { DateTime } = require('luxon');

module.exports = {
  dateToFormat: function (date, format) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format));
  },

  dateToISO: function (date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  absoluteUrl: function (url, base) {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      console.error(
        `Failing to convert ${url} with base ${base} to an absolute url.`
      );
      return url;
    }
  },
};
