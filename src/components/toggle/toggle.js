const toggles = document.querySelectorAll('[data-toggle]')
const ACTIVE_CLASS = 'toggle--active'

function initToggle() {
  if(!toggles.length) {
    return
  }

  Array.prototype.forEach.call(toggles, toggle => {
    const targetId = toggle.getAttribute('data-toggle-id')
    const target = document.getElementById(targetId)

    // toggle 'ACTIVE_CLASS' for targets of same id group
    const resetId = toggle.getAttribute('data-toggle-reset-id')
    let resetTargets = []

    if(resetId) {
      resetTargets = Array.from(document.querySelectorAll(`[id^="${resetId}"]`))
    }

    toggle.addEventListener('click', event => handleClick(event, target, resetTargets))
  })

  function handleClick(event, target, resetTargets) {
    event.preventDefault()
    history.replaceState('', document.title, window.location.pathname + window.location.search) // reset hash if for some reason it ended up in the url

    if(resetTargets.length) {
      resetTargets.forEach(resetTarget => {
        if(resetTarget !== target) {
          resetTarget.classList.remove(ACTIVE_CLASS)
        }
      })
    }
    target.classList.toggle(ACTIVE_CLASS)
  }
}

export default initToggle
