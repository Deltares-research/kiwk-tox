const fetch = require('node-fetch');

require('dotenv-safe').config();

// const isDevelopment = (process.env.ELEVENTY_ENV === 'development');
// const isPreview = (process.env.APP_PREVIEW === 'true');
// const endpoint = (isDevelopment || isPreview)
//   ? 'https://graphql.datocms.com/preview'
//   : 'https://graphql.datocms.com/';
const endpoint = 'https://graphql.datocms.com/';

const USE_CACHE = true;
let cache = {};

function requestToMessage({ query, variables }) {
  const queryName =
    (query.match(/^query ([A-z]+)/) || [])[1] || '(unnamed query)';
  // return `"${queryName}" (${JSON.stringify({ variables })})`;
  return `"${queryName}"`;
}

module.exports = ({ query, variables }) => {
  const cacheKey = JSON.stringify({ query, variables });

  if (USE_CACHE && cache[cacheKey]) {
    console.log(
      `using cached data for ${requestToMessage({ query, variables })}`
    );
    return cache[cacheKey];
  }

  console.log(
    `fetching fresh data for ${requestToMessage({ query, variables })}`
  );
  cache[cacheKey] = fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.DATO_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
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
    });

  return cache[cacheKey];
};
