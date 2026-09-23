// Adds a small playback-speed badge in the top-right corner of every clip.
// Clicking the badge cycles through the speeds; native <video controls>
// handles play, seek, volume, and full screen.
(function () {
  var SPEEDS = [1, 1.5, 2, 4, 0.5];

  document.querySelectorAll('.video-card video').forEach(function (video) {
    var index = 0;
    var badge = document.createElement('button');
    badge.type = 'button';
    badge.className = 'speed-badge';
    badge.title = 'Playback speed (click to change)';
    badge.setAttribute('aria-label', 'Playback speed 1x, click to change');
    badge.textContent = '1×';

    function apply() {
      var speed = SPEEDS[index];
      video.playbackRate = speed;
      badge.textContent = speed + '×';
      badge.setAttribute('aria-label', 'Playback speed ' + speed + 'x, click to change');
      badge.classList.toggle('is-active', speed !== 1);
    }

    badge.addEventListener('click', function () {
      index = (index + 1) % SPEEDS.length;
      apply();
    });

    // Some browsers reset playbackRate when a source loads; reapply the chosen speed.
    video.addEventListener('loadedmetadata', apply);

    video.insertAdjacentElement('afterend', badge);
  });
})();
