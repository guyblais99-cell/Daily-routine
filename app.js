if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // The path here MUST match the location of your actual Service Worker file (sw.js)
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}