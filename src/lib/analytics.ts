/**
 * Thin wrapper over Microsoft Clarity's custom-tag/event API.
 *
 * The Clarity script is only injected on the live site (see index.html), so
 * `window.clarity` is undefined during local dev — every call here no-ops
 * safely in that case. Custom events show up in the Clarity dashboard under
 * Filters → "Smart events" / custom tags, so you can segment recordings and
 * heatmaps by, say, everyone who clicked "View CV".
 */

type ClarityFn = (method: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

/** Fire a named custom event (e.g. "view_cv", "project_repo_click"). */
export function trackEvent(name: string): void {
  window.clarity?.('event', name);
}

/**
 * Attach a key/value tag to the current session so it can be filtered on in
 * the dashboard (e.g. which project's repo was opened).
 */
export function setTag(key: string, value: string): void {
  window.clarity?.('set', key, value);
}
