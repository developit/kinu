import './filter.css';

const HIGHLIGHT_NAME = 'k-filter-match';

/**
 * Filter a list of items by text match, hiding non-matches.
 * When autoSelect is true (default), clears selection and selects the first match.
 * Where the Custom Highlight API exists, the matched substring in each visible
 * item is painted via ::highlight(k-filter-match) — no DOM mutation.
 * Used by both Combobox and Listbox.
 */
export function filterItems(
  value: string,
  items: NodeListOf<HTMLElement> | HTMLElement[],
  showAll?: boolean,
  autoSelect = true,
) {
  const query = value.toLowerCase();
  const highlights = typeof Highlight === 'undefined' ? null : CSS.highlights;
  const ranges: Range[] = [];
  let hit = false;
  for (const item of items) {
    const match = item.textContent!.toLowerCase().includes(query);
    if (autoSelect) item.removeAttribute('selected');
    const visible = showAll || match;
    item.style.display = visible ? '' : 'none';
    if (autoSelect && (showAll ? match : visible) && !hit) {
      item.toggleAttribute('selected', true);
      hit = true;
    }
    if (highlights && query && visible && match) {
      const walker = item.ownerDocument.createTreeWalker(item, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const index = (node as Text).data.toLowerCase().indexOf(query);
        if (index < 0) continue;
        const range = new Range();
        range.setStart(node, index);
        range.setEnd(node, index + query.length);
        ranges.push(range);
        break;
      }
    }
  }
  if (highlights) {
    if (ranges.length) highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges));
    else highlights.delete(HIGHLIGHT_NAME);
  }
}
