import {Progress} from 'kinu';
import {useEffect, useState} from 'preact/hooks';

export function Demo() {
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    setTimeout(setProgress, 500, 50);
    setTimeout(setProgress, 1000, 90);
  }, []);
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Progress value={progress} max={100} />
      <Progress value={75} max={100} />
    </div>
  );
}

export const code = `<Progress value={25} max={100} />`;

export default {Demo, code};
