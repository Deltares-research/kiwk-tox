import copy from 'clipboard-copy';

const $shareMailButtons = document.querySelectorAll('[data-share-mail]')
const $shareCopyButtons = document.querySelectorAll('[data-share-copy]')

function initShareButton() {
  if(!$shareMailButtons || !$shareMailButtons.length || !$shareCopyButtons || !$shareCopyButtons.length) {
    return
  }

  $shareMailButtons.forEach($shareMailButton => {
    $shareMailButton.addEventListener('click', handleMail)
  })

  $shareCopyButtons.forEach($shareCopyButton => {
    $shareCopyButton.addEventListener('click', handleCopy)
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

export default initShareButton;
