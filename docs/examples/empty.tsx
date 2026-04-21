import {Button, Empty} from 'kinu';

export function Demo() {
  return (
    <Empty>
      <h3 style={{margin: 0}}>No results</h3>
      <p style={{margin: 0}}>
        Try a different search term or clear the current filter.
      </p>
      <Button variant="outline">Clear filters</Button>
    </Empty>
  );
}

export const code = `<Empty>\n  <h3>No results</h3>\n  <p>Try a different search.</p>\n</Empty>`;

export default {Demo, code};
