import {
  Button,
  Card,
  Progress,
  Slider,
  TabList,
  Tab,
  TabPanel,
  ScrollArea,
} from 'pui';
import {useState} from 'preact/hooks';

const tracks = [
  {id: 1, title: 'Cold Brew', artist: 'Lofi Beats'},
  {id: 2, title: 'Summer Vibes', artist: 'DJ Sun'},
  {id: 3, title: 'Night Drive', artist: 'Synthwave'},
];

export default function Player() {
  const [tab, setTab] = useState<'playlist' | 'queue'>('playlist');
  const [volume, setVolume] = useState(50);

  return (
    <div class="music-app">
      <Card class="player-card">
        <h3>Now Playing</h3>
        <p>Cold Brew – Lofi Beats</p>
        <Progress value={30} max={100} />
        <div class="player-controls">
          <Button size="icon">⏮</Button>
          <Button size="icon">▶</Button>
          <Button size="icon">⏭</Button>
        </div>
        <div class="volume">
          <span>Volume</span>
          <Slider
            value={volume}
            onInput={(e) =>
              setVolume((e.currentTarget as HTMLInputElement).valueAsNumber)
            }
          />
        </div>
      </Card>
      <div class="playlist-section">
        <TabList>
          <Tab aria-selected={tab === 'playlist'} onClick={() => setTab('playlist')}>
            Playlist
          </Tab>
          <Tab aria-selected={tab === 'queue'} onClick={() => setTab('queue')}>
            Queue
          </Tab>
        </TabList>
        {tab === 'playlist' && (
          <TabPanel>
            <ScrollArea class="playlist">
              <ul>
                {tracks.map((t) => (
                  <li key={t.id}>
                    {t.title} – {t.artist}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </TabPanel>
        )}
        {tab === 'queue' && <TabPanel>No tracks in queue.</TabPanel>}
      </div>
    </div>
  );
}
