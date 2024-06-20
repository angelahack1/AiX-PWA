
var deferredPrompt;

window.addEventListener('DOMContentLoaded', async () => {
  const { Install } = await import('./lib/install.js');
  new Install(document.querySelector('#install'));
    
});

window.addEventListener('DOMContentLoaded', (e) => {
  window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
    let displayMode = 'browser tab';
    if (e.matches) {
      displayMode = 'standalone';
    }
    console.log('DISPLAY_MODE_CHANGED', displayMode);

    if(displayMode == 'standalone') {
      console.log('About to redirect...');
      window.top.location.href = '/index_home.html?source=pwa';
    }
  });

  let displayMode = 'browser tab';
  if (navigator.standalone) {
    displayMode = 'standalone-ios';
  }
  if (window.matchMedia('(display-mode: standalone)').matches) {
    displayMode = 'standalone';
  }
  console.log('DISPLAY_MODE_LAUNCH:', displayMode);

  if(displayMode == 'standalone') {
    console.log('About to redirect...');
    window.top.location.href = '/index_home.html?source=pwa';
  }
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  console.log('INSTALL: Success');
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('INSTALL: Prompted');
});

document.querySelector('#installAngy').addEventListener('click', async () => {
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt.');
  } else if (outcome === 'dismissed') {
    console.log('User dismissed the install prompt');
  }
});