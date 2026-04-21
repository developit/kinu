import {Prose} from 'kinu';

export function Demo() {
  return (
    <Prose style={{maxWidth: '40rem'}}>
      <h2>Inverse-square law</h2>
      <p>
        The intensity of an effect, like gravity or radiation, falls off
        inversely with the square of the distance from the source. In code:
      </p>
      <pre>
        <code>{`function intensity(power, distance) {
  return power / (4 * Math.PI * distance ** 2);
}`}</code>
      </pre>
      <h3>Why it shows up everywhere</h3>
      <p>
        Anything radiating uniformly in three dimensions spreads its{' '}
        <code>power</code> across the surface of an ever-larger sphere. Surface
        area grows as <code>r²</code>, so per-unit-area intensity must shrink
        in the same ratio.
      </p>
      <ul>
        <li>Newtonian gravity</li>
        <li>Point-source radiation (light, sound)</li>
        <li>Electrostatic field strength</li>
      </ul>
      <blockquote>
        Make everything as simple as possible, but not simpler.
      </blockquote>
      <p>
        See the <a href="https://en.wikipedia.org/wiki/Inverse-square_law">Wikipedia article</a>{' '}
        for derivations and the long list of physical phenomena it governs.
      </p>
    </Prose>
  );
}

export const code = `<Prose>
  <h2>Inverse-square law</h2>
  <p>The intensity of an effect falls off ...</p>
  <pre><code>...</code></pre>
  <ul><li>...</li></ul>
  <blockquote>...</blockquote>
</Prose>`;

export default {Demo, code};
