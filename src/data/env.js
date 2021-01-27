require('dotenv-safe').config();

module.exports = {
  // use Netlify base URL, @see https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
  baseUrl: process.env.URL || 'http://localhost:8080/',
}
