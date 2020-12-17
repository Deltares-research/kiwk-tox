const { DateTime } = require('luxon');
const { stringify } = require('query-string');

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

  imageUrl(imagePath, params) {
    const defaults = {
      auto: ['compress', 'quality'],
      fm: 'jpg',
      w: 100,
    };
    return `${imagePath}?${stringify(Object.assign({}, defaults, params))}`;
  },

  stripSlashes(str) {
    return str.replace(/^\/|\/$/g, '');
  },

  getLocaleData(array) {
    const { locale } = this.ctx;
    return array.find(item => item.locale === locale);
  },

  inferAltSlug(languageAlts, altLocale) {
    const baseString = `/${altLocale}/`;
    if (!languageAlts) return baseString;
    const dict = JSON.parse(languageAlts);
    if (!dict[altLocale]) return baseString;
    return `${baseString}${dict[altLocale]}/`;
  },
};
