/**
 * Night mode class
 */
export class NightMode {
  /**
   * @param {DOMElement} button - Button to trigger Night Mode toggle
   * @param {function} action - Action to call when night mode changes
   * @param {string} init - Initial mode to set
   */
  constructor(button, action, init) {
    this._mode = 'night';
    this._button = button;
    this._night = button.querySelector('.night');
    this._day = button.querySelector('.day');
    this._action = action;
    button.addEventListener('click', this._toggle.bind(this));

    this._button.style.display = 'block';

    let start = init || (matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');

    const params = new URLSearchParams(location.search);
    const paramsMode = params.get('mode');

    if (paramsMode && ['night', 'day'].includes(paramsMode.toLowerCase())) {
      start = paramsMode.toLowerCase();
    }

    if (start === 'night') {
      this.turn('off');
    } else {
      this.turn('on');
    }
  }

  /**
   * Toggles night mode and calls action
   */
  _toggle() {
    if (this._mode === 'night') {
      this._night.dataset.active = false;
      this._day.dataset.active = true;
      document.body.classList.add('light');
      document.body.classList.remove('dark');
      this._mode = 'day';
      this._button.ariaLabel = 'Switch night mode on';
    } else {
      this._night.dataset.active = true;
      this._day.dataset.active = false;
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      this._mode = 'night';
      this._button.ariaLabel = 'Switch night mode off';
    }

    if (typeof this._action === 'function') {
      this._action(this._mode);
    }
  }

  /**
   * Turns night mode on or off
   * @param {string} type - Either 'on' or 'off' to turn night mode on or off
   */
  turn(type) {
    if (type === 'off') {
      this._mode = 'day';
    } else if (type === 'on') {
      this._mode = 'night';
    }

    this._toggle();
  }
}
