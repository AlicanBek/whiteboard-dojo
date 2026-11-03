// Sends a Google Analytics event. Only names and small labels are sent, never board content.
// gtag is defined in index.html and only reports on the live site.
export function track(name, params = {}) {
  window.gtag?.("event", name, params);
}
