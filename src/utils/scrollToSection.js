/**
 * Click handler for in-page nav links. Scrolls smoothly to the target
 * section without letting the browser append a #hash to the URL — the
 * address bar stays on the base domain the whole time.
 *
 * IMPORTANT: preventDefault() is called unconditionally, before we even
 * look up the target element. In an earlier version this was deferred
 * until after a successful getElementById() lookup, which meant a single
 * failed lookup (e.g. a timing edge case) let the browser's native hash
 * navigation through — and once a hash lands in the URL, nothing after
 * that click removes it. This version also actively strips any hash
 * that's already sitting in the address bar, so it self-heals instead of
 * only preventing new damage.
 *
 * Modifier-clicks (cmd/ctrl/shift) and non-left clicks are still let
 * through untouched, so "open in new tab" on a nav link keeps working.
 */
export function handleSectionLinkClick(event, id) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  stripHash();

  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Removes any #hash from the current URL without touching scroll position. */
export function stripHash() {
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
}
