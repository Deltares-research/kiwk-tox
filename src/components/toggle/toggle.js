const toggles = document.querySelectorAll('[data-toggle]')

function initToggle() {
  if(!toggles.length) {
    return
  }

  Array.prototype.forEach.call(toggles, toggle => {
    const targetId = toggle.getAttribute('data-toggle-id')
    const target = document.getElementById(targetId)

    toggle.addEventListener('click', event => handleClick(event, target))
  })

  function handleClick(event, target) {
    event.preventDefault()
    history.replaceState('', document.title, window.location.pathname + window.location.search) // reset hash if for some reason it ended up in the url
    target.classList.toggle('toggle--active')
  }
}

export default initToggle
