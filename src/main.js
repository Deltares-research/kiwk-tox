// Focus Visible Polyfill
import 'focus-visible';

// Internal Modules
import initToggle from './components/toggle/toggle';

initToggle();

// load all icons to generate a svg sprite and extract it
requireAll(require.context('./assets/sprite-icons/', true, /\.svg$/)) // eslint-disable-line no-undef

function requireAll(r) {
  r.keys().forEach(r)
}
