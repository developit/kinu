import {Accordion} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
      <div>
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
      </div>

      <div>
        <p style={{margin: '0 0 0.5rem 0', fontSize: '0.875rem', opacity: 0.7}}>
          FAQ — only one open at a time (`name="faq"`):
        </p>
        <Accordion name="faq">
          <summary>What is Kinu?</summary>
          <p style={{margin: '0.5rem 0 0 0'}}>
            A tiny Preact UI toolkit that leans on native HTML and CSS.
          </p>
        </Accordion>
        <Accordion name="faq">
          <summary>How small is it?</summary>
          <p style={{margin: '0.5rem 0 0 0'}}>
            Around 6 KB of JavaScript, gzipped.
          </p>
        </Accordion>
        <Accordion name="faq">
          <summary>Does it ship runtime CSS-in-JS?</summary>
          <p style={{margin: '0.5rem 0 0 0'}}>
            No. Kinu uses a static CSS file you import once.
          </p>
        </Accordion>
      </div>
    </div>
  );
}

export const code = `<Accordion name="faq">
  <summary>Question 1</summary>
  <p>Answer.</p>
</Accordion>
<Accordion name="faq">
  <summary>Question 2</summary>
  <p>Only one open at a time.</p>
</Accordion>`;

export default {Demo, code};
