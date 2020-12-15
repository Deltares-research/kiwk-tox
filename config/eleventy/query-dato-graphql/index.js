const fetch = require('node-fetch');
const {
  addLocaleToAllDataRecords,
  deepFlattenLocaleRecords,
} = require('./locale-helpers');
const { LOCALES } = require('../../constants');
require('dotenv-safe').config();

// const isDevelopment = (process.env.ELEVENTY_ENV === 'development');
// const isPreview = (process.env.APP_PREVIEW === 'true');
// const endpoint = (isDevelopment || isPreview)
//   ? 'https://graphql.datocms.com/preview'
//   : 'https://graphql.datocms.com/';
const ENDPOINT = 'https://graphql.datocms.com/';
const USE_CACHE = true;
const CACHE = {};

const requestToMessage = ({ query }) => {
  const queryName =
    (query.match(/^query ([A-z]+)/) || [])[1] || '(unnamed query)';
  return `"${queryName}"`;
};

module.exports = ({ query }) => {
  const cacheKey = JSON.stringify({ query });
  const cacheReadableName = requestToMessage({ query });

  if (USE_CACHE && CACHE[cacheKey]) {
    console.info(`[DATA CACHE] Using cached data for ${cacheReadableName}`);
    return CACHE[cacheKey];
  }

  console.info(`[DATA CACHE] Fetching fresh data for ${cacheReadableName}`);

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
      .then(addLocaleToAllDataRecords(locale))
  );

  CACHE[cacheKey] = Promise.all(localePromises)
    .then(nestedArray => nestedArray.flat())
    .then(deepFlattenLocaleRecords)
    .then(x => {
      // if (cacheReadableName === '"App"')
      console.log(cacheReadableName, x);
      return x;
    });
  return CACHE[cacheKey];
};
