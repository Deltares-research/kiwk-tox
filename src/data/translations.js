const queryDatoGraphQL = require('../../config/eleventy/query-dato-graphql');

const query = `
  query Translations($locale: SiteLocale) {
    allTranslations(locale: $locale) {
      key
      value
    }
  }
`;

module.exports = async () => {
  const { allTranslations } = await queryDatoGraphQL({ query });
  return allTranslations
    .reduce((returnObj, { locale, key, value }) => {
      let newLocaleObj;
      if(returnObj[locale]) {
        newLocaleObj = { ...returnObj[locale], ...{ [key]: value } };
      }
      else {
        newLocaleObj = { [key]: value };
      }
      return { ...returnObj, [locale]: newLocaleObj };
    }, {})
  ;
};
