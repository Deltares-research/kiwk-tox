import copy from 'clipboard-copy';
const $shareMailButtons = document.querySelectorAll('[data-share-mail]')
const $shareCopyButtons = document.querySelectorAll('[data-share-copy]')

function initShareButton() {
  if(!$shareMailButtons || !$shareMailButtons.length || !$shareCopyButtons || !$shareCopyButtons.length) {
    return
  }

  $shareMailButtons.forEach($shareMailButton => {
    const body = encodeURIComponent(window.location)
    $shareMailButton.href = `mailto:?body=${body}`
  })

  $shareCopyButtons.forEach($shareCopyButton => {
    $shareCopyButton.addEventListener('click', handleCopy)
  })

  function handleCopy(event) {
    event.preventDefault()
    copy(window.location)
  }
}

export default initShareButton;
