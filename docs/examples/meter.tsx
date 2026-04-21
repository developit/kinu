import {Meter} from 'kinu';

export function Demo() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
      <div>
        <div style={{fontSize: '0.8125rem', marginBottom: '0.25rem'}}>
          Disk usage — 90% (optimum)
        </div>
        <Meter value={0.9} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />
      </div>
      <div>
        <div style={{fontSize: '0.8125rem', marginBottom: '0.25rem'}}>
          Disk usage — 60% (suboptimum)
        </div>
        <Meter value={0.6} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />
      </div>
      <div>
        <div style={{fontSize: '0.8125rem', marginBottom: '0.25rem'}}>
          Disk usage — 15% (even less good)
        </div>
        <Meter value={0.15} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />
      </div>
    </div>
  );
}

export const code = `<Meter value={0.9} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />
<Meter value={0.6} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />
<Meter value={0.15} min={0} max={1} low={0.3} high={0.8} optimum={0.9} />`;

export default {Demo, code};
