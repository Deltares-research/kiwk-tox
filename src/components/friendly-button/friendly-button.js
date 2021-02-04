import copy from 'clipboard-copy';

const $friendlyMailButtons = document.querySelectorAll('[data-friendly-mail]')
const $friendlyCopyButtons = document.querySelectorAll('[data-friendly-copy]')

function initFriendlyButton() {
  if(!$friendlyMailButtons || !$friendlyMailButtons.length || !$friendlyCopyButtons || !$friendlyCopyButtons.length) {
    return
  }

  $friendlyMailButtons.forEach($friendlyMailButton => {
    $friendlyMailButton.addEventListener('click', handleMail)
  })

  $friendlyCopyButtons.forEach($friendlyCopyButton => {
    $friendlyCopyButton.addEventListener('click', handleCopy)
  })

  function handleMail(event) {
    event.preventDefault()
    const href = `mailto:?body=${encodeURIComponent(window.location)}`
    window.location.href = href
  }

  function handleCopy(event) {
    event.preventDefault()
    copy(window.location)
  }
}

export default initFriendlyButton;
