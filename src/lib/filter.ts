/**
 * Filter a list of items by text match, hiding non-matches and selecting the first match.
 * Used by both Combobox and Listbox.
 */
export function filterItems(
  value: string,
  items: NodeListOf<HTMLElement> | HTMLElement[],
  showAll?: boolean,
) {
  const query = value.toLowerCase();
  let hit = false;
  for (const item of items) {
    const match = item.textContent!.toLowerCase().includes(query);
    item.removeAttribute('selected');
    const visible = showAll || match;
    item.style.display = visible ? '' : 'none';
    if ((showAll ? match : visible) && !hit) {
      item.toggleAttribute('selected', true);
      hit = true;
    }
  }
}
