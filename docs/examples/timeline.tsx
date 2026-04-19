import {Timeline} from 'kinu';

export function Demo() {
  return (
    <Timeline style={{maxWidth: '28rem'}}>
      <Timeline.Entry time="2h ago">
        Jason pushed 3 commits to <code>main</code>.
      </Timeline.Entry>
      <Timeline.Entry time="5h ago">
        CI passed on #234.
      </Timeline.Entry>
      <Timeline.Entry time="yesterday">
        Merged <strong>Add Timeline component</strong>.
      </Timeline.Entry>
      <Timeline.Entry time="Mar 14">
        Released <code>v0.2.0</code>.
      </Timeline.Entry>
    </Timeline>
  );
}

export const code = `<Timeline>
  <Timeline.Entry time="2h ago">Jason pushed 3 commits</Timeline.Entry>
  <Timeline.Entry time="yesterday">Merged #234</Timeline.Entry>
</Timeline>`;

export default {Demo, code};
