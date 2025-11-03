import {Accordion} from 'pui';

export function Demo() {
  return (
    <>
      <Accordion name="accordion-demo">
        <summary>More Info</summary>
        <p style={{margin: '0.5rem 0 0 0'}}>
          Hidden content that becomes visible when the summary is clicked.
        </p>
      </Accordion>
      <Accordion name="accordion-demo">
        <summary>Second Item</summary>
        <p style={{margin: '0.5rem 0 0 0'}}>
          Other hidden content that becomes visible when the summary is clicked.
        </p>
      </Accordion>
    </>
  );
}

export const code = `<Accordion>...</Accordion>`;

export default {Demo, code};
