import {ProgressRing} from 'kinu';
import {useEffect, useState} from 'preact/hooks';

export function Demo() {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    setTimeout(setProgress, 500, 50);
    setTimeout(setProgress, 1000, 90);
  }, []);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
      <ProgressRing value={progress} max={100} />
      <ProgressRing value={75} max={100} size="lg" />
      <ProgressRing size="sm" />
    </div>
  );
}

export const code = `<ProgressRing value={60} max={100} />`;

export default {Demo, code};
