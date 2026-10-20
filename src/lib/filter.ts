import './filter.css';

const HIGHLIGHT_NAME = 'k-filter-match';

/**
 * Filter a list of items by text match, hiding non-matches.
 * When autoSelect is true (default), clears selection and selects the first match.
 * Where the Custom Highlight API exists, the matched substring in each visible
 * item is painted via ::highlight(k-filter-match) — no DOM mutation. One
 * registration is shared by every filtered list, and only the open one paints:
 * a closed list is hidden, and reopening one filters it afresh.
 * Used by both Combobox and Listbox.
 */
export function filterItems(
  value: string,
  items: NodeListOf<HTMLElement> | HTMLElement[],
  showAll?: boolean,
  autoSelect = true,
) {
  const query = value.toLowerCase();
  // Only ever called from event handlers, so `window` is always there.
  const highlights = 'Highlight' in window && CSS.highlights;
  const ranges: Range[] = [];
  let hit = false;
  for (const item of items) {
    const match = item.textContent!.toLowerCase().includes(query);
    if (autoSelect) item.removeAttribute('selected');
    item.style.display = showAll || match ? '' : 'none';
    if (autoSelect && match && !hit) {
      item.toggleAttribute('selected', true);
      hit = true;
    }
    if (highlights && query && match) {
      // The first text node holding the whole match — the common case of a
      // plain-text label; a match split across elements goes unpainted.
      const walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const index = (node as Text).data.toLowerCase().indexOf(query);
        if (index >= 0) {
          const range = new Range();
          range.setStart(node, index);
          range.setEnd(node, index + query.length);
          ranges.push(range);
          break;
        }
      }
    }
  }
  // An empty Highlight paints nothing, so there is no separate clear path.
  if (highlights) highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges));
}
