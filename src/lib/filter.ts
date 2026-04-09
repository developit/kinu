/**
 * Filter a list of items by text match, hiding non-matches.
 * When autoSelect is true (default), clears selection and selects the first match.
 * Used by both Combobox and Listbox.
 */
export function filterItems(
  value: string,
  items: NodeListOf<HTMLElement> | HTMLElement[],
  showAll?: boolean,
  autoSelect = true,
) {
  const query = value.toLowerCase();
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
  }
}
