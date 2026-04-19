import {Timeline} from 'kinu';

export function Demo() {
  return (
    <Timeline style={{maxWidth: '28rem'}}>
      <Timeline.Entry>
        Jason pushed 3 commits to <code>main</code>.
        <time>2h ago</time>
      </Timeline.Entry>
      <Timeline.Entry>
        CI passed on #234.
        <time>5h ago</time>
      </Timeline.Entry>
      <Timeline.Entry>
        Merged <strong>Add Timeline component</strong>.
        <time>yesterday</time>
      </Timeline.Entry>
      <Timeline.Entry>
        Released <code>v0.2.0</code>.
        <time dateTime="2024-03-14">Mar 14</time>
      </Timeline.Entry>
    </Timeline>
  );
}

export const code = `<Timeline>
  <Timeline.Entry>
    Jason pushed 3 commits
    <time>2h ago</time>
  </Timeline.Entry>
  <Timeline.Entry>
    Merged #234
    <time>yesterday</time>
  </Timeline.Entry>
</Timeline>`;

export default {Demo, code};
