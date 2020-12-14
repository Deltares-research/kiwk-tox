const fetch = require('node-fetch');

require('dotenv-safe').config();

// const isDevelopment = (process.env.ELEVENTY_ENV === 'development');
// const isPreview = (process.env.APP_PREVIEW === 'true');
// const endpoint = (isDevelopment || isPreview)
//   ? 'https://graphql.datocms.com/preview'
//   : 'https://graphql.datocms.com/';
const ENDPOINT = 'https://graphql.datocms.com/';
const USE_CACHE = true;
const CACHE = {};
const LOCALES = ['nl', 'en'];

function requestToMessage({ query }) {
  const queryName =
    (query.match(/^query ([A-z]+)/) || [])[1] || '(unnamed query)';
  return `"${queryName}"`;
}

module.exports = ({ query }) => {
  const cacheKey = JSON.stringify({ query });

  if (USE_CACHE && CACHE[cacheKey]) {
    console.info(
      `[DATA CACHE] Using cached data for ${requestToMessage({ query })}`
    );
    return CACHE[cacheKey];
  }

  console.info(
    `[DATA CACHE] Fetching fresh data for ${requestToMessage({ query })}`
  );

  const localePromises = LOCALES.map(locale =>
    fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.DATO_API_TOKEN}`,
      },
      body: JSON.stringify({ query, variables: { locale } }),
    })
      .then(response => {
        if (response.status != 200) {
          throw new Error(`Invalid request (${response.status})`);
        } else {
          return response.json();
        }
      })
      .then(response => {
        if (response.errors && response.errors.length) {
          throw new Error(response.errors[0].message);
        } else {
          return response.data;
        }
      })
      .then(data => {
        const key = Object.keys(data)[0];
        const value = data[key];
        // For multiple records, add locale to each record
        if (Array.isArray(value)) {
          const augmentedData = value.map(dataObj => ({
            ...dataObj,
            locale,
          }));
          return { [key]: augmentedData };
        }
        // Otherwise, add it to the single record
        else {
          return { [key]: { ...value, locale } };
        }
      })
  );

  CACHE[cacheKey] = Promise.all(localePromises)
    .then(nestedArray => nestedArray.flat())
    .then(x => {
      console.log(x);
      return x;
    })
    .then(objArray =>
      objArray.reduce((accObj, currObj) => {
        const key = Object.keys(currObj)[0];
        const value = currObj[key];
        const accArr = accObj[key] || [];
        // For multiple records, merge the arrays
        if (Array.isArray(value)) {
          return { [key]: [...accArr, ...value] };
        }
        // For single records, add record to array
        else {
          return { [key]: [...accArr, value] };
        }
      }, {})
    );
  return CACHE[cacheKey];
};
