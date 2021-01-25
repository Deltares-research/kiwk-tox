export default function() {
  const videos = [...document.querySelectorAll('[data-responsive-video]')];

  if(!videos.length) {
    return
  }

  playVideo(videos);
}

function playVideo(videos) {
  videos.forEach(video => {
    const iframe = video.querySelector('[data-responsive-video-iframe]');
    const playButton = video.querySelector('[data-video-play-button]');

    playButton.addEventListener('click', (event) => {
      event.preventDefault()
      playButton.setAttribute('hidden', '');
      iframe.setAttribute('src', iframe.dataset.responsiveVideoIframe);
    })
  })
}
