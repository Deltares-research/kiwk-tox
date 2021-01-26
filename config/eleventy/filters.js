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
    }
    catch(err) {
      console.error(
        `Failing to convert ${ url } with base ${ base } to an absolute url.`
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

    if(!array || !array.length || !locale) {
      console.warn('getLocaleData: array is: ', array)
      console.warn('getLocaleData: locale is: ', locale)
      return
    }

    return array.find(item => item.locale === locale);
  },

  inferAltSlug(languages, locale) {
    const baseString = `/${locale}/`;
    if (!languages) return baseString;

    const languageDictionary = JSON.parse(languages);
    const slug = languageDictionary[locale];
    if (!slug) return baseString;

    return `${baseString}${slug}/`;
  },

  createStringParameters: function (url, params) {
    return url + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
  }
};
