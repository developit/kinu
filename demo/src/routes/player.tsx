import {
  Button,
  Card,
  Progress,
  Slider,
  TabList,
  Tab,
  TabPanel,
  ScrollArea,
  Avatar,
  Badge,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  Separator,
} from 'pui';
import {useState, useEffect} from 'preact/hooks';

const tracks = [
  {
    id: 1,
    title: 'Midnight Coffee',
    artist: 'Lofi Dreams',
    album: 'Chill Nights',
    duration: '3:42',
    cover: '☕',
    liked: false,
  },
  {
    id: 2,
    title: 'Summer Breeze',
    artist: 'DJ Sunwave',
    album: 'Golden Hour',
    duration: '4:18',
    cover: '🌅',
    liked: true,
  },
  {
    id: 3,
    title: 'Neon Lights',
    artist: 'Synthwave City',
    album: 'Retro Future',
    duration: '5:03',
    cover: '🌃',
    liked: false,
  },
  {
    id: 4,
    title: 'Ocean Waves',
    artist: 'Nature Sounds',
    album: 'Peaceful Mind',
    duration: '2:57',
    cover: '🌊',
    liked: true,
  },
  {
    id: 5,
    title: 'City Rain',
    artist: 'Ambient Collective',
    album: 'Urban Calm',
    duration: '4:35',
    cover: '🌧️',
    liked: false,
  },
  {
    id: 6,
    title: 'Forest Path',
    artist: 'Organic Beats',
    album: 'Natural Rhythm',
    duration: '3:28',
    cover: '🌲',
    liked: false,
  },
];

export default function Player() {
  const [tab, setTab] = useState<'playlist' | 'queue' | 'library'>('playlist');
  const [volume, setVolume] = useState(65);
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [queue, setQueue] = useState<typeof tracks>([]);
  const [trackList, setTrackList] = useState(tracks);

  // Simulate progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const trackDurationInSeconds = 222; // 3:42 = 222 seconds
        const progressPerSecond = 100 / trackDurationInSeconds;
        const newProgress = prev + progressPerSecond;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentTime = (progress / 100) * 222; // Assuming 3:42 = 222 seconds
  const totalTime = 222;

  const addToQueue = (track: (typeof tracks)[0]) => {
    setQueue((prev) => [...prev, track]);
  };

  const toggleLike = (trackId: number) => {
    setTrackList((prev) =>
      prev.map((track) =>
        track.id === trackId ? {...track, liked: !track.liked} : track,
      ),
    );
  };

  const playNext = () => {
    const currentIndex = trackList.findIndex(
      (track) => track.id === currentTrack.id,
    );
    const nextIndex = currentIndex + 1;
    if (nextIndex < trackList.length) {
      setCurrentTrack(trackList[nextIndex]);
      setProgress(0);
    }
  };

  const playPrevious = () => {
    const currentIndex = trackList.findIndex(
      (track) => track.id === currentTrack.id,
    );
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentTrack(trackList[prevIndex]);
      setProgress(0);
    }
  };

  return (
    <div class="music-app">
      <NavigationMenu class="home-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/getting-started">
              Getting Started
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/components">
              Components
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/linear">Linear Demo</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/chat">Chat Demo</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/player">Music Demo</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="music-player-container">
        <div class="player-main">
          {/* Now Playing Card */}
          <Card class="now-playing-card">
            <div class="album-art">
              <Avatar size="lg">{currentTrack.cover}</Avatar>
            </div>
            <div class="track-info">
              <h2>{currentTrack.title}</h2>
              <p class="artist">{currentTrack.artist}</p>
              <Badge variant="secondary">{currentTrack.album}</Badge>
            </div>
          </Card>

          {/* Player Controls */}
          <Card class="player-controls-card">
            <div class="progress-section">
              <div class="time-display">
                <span class="current-time">{formatTime(currentTime)}</span>
                <span class="total-time">{currentTrack.duration}</span>
              </div>
              <Progress value={progress} max={100} class="progress-bar" />
            </div>

            <div class="main-controls">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShuffle(!shuffle)}
              >
                <iconify-icon
                  icon={shuffle ? 'lucide:shuffle' : 'lucide:list'}
                />
              </Button>
              <Button variant="outline" size="icon" onClick={playPrevious}>
                <iconify-icon icon="lucide:skip-back" />
              </Button>
              <Button
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                class="play-button"
              >
                <iconify-icon
                  icon={isPlaying ? 'lucide:pause' : 'lucide:play'}
                />
              </Button>
              <Button variant="outline" size="icon" onClick={playNext}>
                <iconify-icon icon="lucide:skip-forward" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRepeat(!repeat)}
              >
                <iconify-icon
                  icon={repeat ? 'lucide:repeat-1' : 'lucide:repeat'}
                />
              </Button>
            </div>

            <div class="volume-control">
              <iconify-icon
                icon={
                  volume === 0
                    ? 'lucide:volume-x'
                    : volume < 50
                      ? 'lucide:volume-1'
                      : 'lucide:volume-2'
                }
                class="volume-icon"
              />
              <Slider
                value={volume}
                max={100}
                min={0}
                onInput={(e) =>
                  setVolume((e.currentTarget as HTMLInputElement).valueAsNumber)
                }
                class="volume-slider"
              />
              <span class="volume-text">{volume}%</span>
            </div>
          </Card>
        </div>

        <div class="playlist-sidebar">
          <Card class="playlist-card">
            <TabList>
              <Tab
                aria-selected={tab === 'playlist'}
                onClick={() => setTab('playlist')}
              >
                Playlist
              </Tab>
              <Tab
                aria-selected={tab === 'queue'}
                onClick={() => setTab('queue')}
              >
                Queue
              </Tab>
              <Tab
                aria-selected={tab === 'library'}
                onClick={() => setTab('library')}
              >
                Library
              </Tab>
            </TabList>

            {tab === 'playlist' && (
              <TabPanel class="playlist-tab-panel">
                <ScrollArea class="track-list">
                  {trackList.map((track, index) => (
                    <ContextMenu key={track.id}>
                      <ContextMenuTrigger>
                        <div
                          class={`track-item ${track.id === currentTrack.id ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentTrack(track);
                            setProgress(0);
                          }}
                        >
                          <Avatar size="sm">{track.cover}</Avatar>
                          <div class="track-details">
                            <div class="track-title">{track.title}</div>
                            <div class="track-artist">{track.artist}</div>
                          </div>
                          <div class="track-duration">{track.duration}</div>
                          <div class="track-actions">
                            <Button
                              variant="ghost"
                              size="sm"
                              class={`heart-button ${track.liked ? 'liked' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleLike(track.id);
                              }}
                            >
                              <iconify-icon icon="lucide:heart" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              class="context-menu-trigger"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.currentTarget.dispatchEvent(
                                  new MouseEvent('contextmenu', e),
                                );
                              }}
                            >
                              <iconify-icon icon="lucide:more-horizontal" />
                            </Button>
                          </div>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem onClick={() => addToQueue(track)}>
                          <iconify-icon icon="lucide:plus" />
                          Add to Queue
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => toggleLike(track.id)}>
                          <iconify-icon icon="lucide:heart" />
                          {track.liked ? 'Unlike' : 'Like'}
                        </ContextMenuItem>
                        <ContextMenuItem
                          onClick={() => {
                            setCurrentTrack(track);
                            setProgress(0);
                          }}
                        >
                          <iconify-icon icon="lucide:play" />
                          Play Now
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </ScrollArea>
              </TabPanel>
            )}

            {tab === 'queue' && (
              <TabPanel>
                {queue.length === 0 ? (
                  <div class="empty-state">
                    <iconify-icon icon="lucide:music" />
                    <p>Queue is empty</p>
                    <Button variant="outline" size="sm">
                      Add songs to queue
                    </Button>
                  </div>
                ) : (
                  <ScrollArea class="track-list">
                    {queue.map((track, index) => (
                      <div
                        key={`queue-${track.id}-${index}`}
                        class="track-item"
                      >
                        <Avatar size="sm">{track.cover}</Avatar>
                        <div class="track-details">
                          <div class="track-title">{track.title}</div>
                          <div class="track-artist">{track.artist}</div>
                        </div>
                        <div class="track-duration">{track.duration}</div>
                        <div class="track-actions">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setQueue((prev) =>
                                prev.filter((_, i) => i !== index),
                              )
                            }
                          >
                            <iconify-icon icon="lucide:x" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </TabPanel>
            )}

            {tab === 'library' && (
              <TabPanel>
                <div class="library-stats">
                  <div class="stat-item">
                    <Badge variant="default">{tracks.length} Songs</Badge>
                  </div>
                  <div class="stat-item">
                    <Badge variant="secondary">6 Artists</Badge>
                  </div>
                  <div class="stat-item">
                    <Badge variant="outline">4 Albums</Badge>
                  </div>
                </div>
                <Separator />
                <div class="library-actions">
                  <Button variant="outline" size="sm">
                    Import Music
                  </Button>
                  <Button variant="ghost" size="sm">
                    Create Playlist
                  </Button>
                </div>
              </TabPanel>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
