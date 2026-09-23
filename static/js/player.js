// Adds a row of playback-speed buttons under every clip in the deployment grid.
// Native <video controls> handles play, seek, volume, and full screen.
(function () {
  var SPEEDS = [0.5, 1, 1.5, 2, 4];

  document.querySelectorAll('.video-card video').forEach(function (video) {
    var row = document.createElement('div');
    row.className = 'speed-controls';
    row.setAttribute('role', 'group');
    row.setAttribute('aria-label', 'Playback speed');

    var buttons = SPEEDS.map(function (speed) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'button is-small is-rounded';
      btn.textContent = speed + '×';
      btn.setAttribute('aria-pressed', String(speed === 1));
      btn.addEventListener('click', function () {
        video.playbackRate = speed;
        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('is-dark', active);
          b.classList.toggle('is-light', !active);
          b.setAttribute('aria-pressed', String(active));
        });
      });
      btn.classList.add(speed === 1 ? 'is-dark' : 'is-light');
      row.appendChild(btn);
      return btn;
    });

    // Some browsers reset playbackRate when a new source loads; reapply the chosen speed.
    video.addEventListener('loadedmetadata', function () {
      var active = row.querySelector('.is-dark');
      if (active) video.playbackRate = parseFloat(active.textContent);
    });

    video.insertAdjacentElement('afterend', row);
  });
})();
