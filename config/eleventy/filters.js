const { DateTime } = require('luxon');

module.exports = {
  dateToFormat(date, format) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(String(format));
  },

  dateToISO(date) {
    return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
      includeOffset: false,
      suppressMilliseconds: true,
    });
  },

  absoluteUrl(url, base) {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      console.error(
        `Failing to convert ${url} with base ${base} to an absolute url.`
      );
      return url;
    }
  },

  stripSlashes(str) {
    return str.replace(/^\/|\/$/g, '');
  },

  getLocaleData(array) {
    const { locale } = this.ctx;
    return array.find(item => item.locale === locale);
  },
};
