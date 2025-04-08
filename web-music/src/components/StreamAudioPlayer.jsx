import React, { useEffect, useRef, useState } from 'react';
import './StreamAudioPlayer.css';

const StreamAudioPlayer = ({ videoId }) => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState('0:00');
  const [currentTime, setCurrentTime] = useState('0:00');
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        }
      });
    };

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    updateInfo();
    event.target.setVolume(100);
    setTimeout(() => {
      const dur = playerRef.current.getDuration();
      setDuration(formatTime(dur));
    }, 1000);
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      intervalRef.current = setInterval(updateProgress, 1000);
    } else {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const updateProgress = () => {
    const current = playerRef.current.getCurrentTime();
    const total = playerRef.current.getDuration();
    setCurrentTime(formatTime(current));
    setProgress((current / total) * 100);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const totalWidth = rect.width;
    const percentage = clickX / totalWidth;
    const newTime = playerRef.current.getDuration() * percentage;
    playerRef.current.seekTo(newTime, true);
  };

  const updateInfo = () => {
    const API_KEY = 'AIzaSyD_uhl8JT_N3qKC8Xi1VfPBYl8wOMEei3M'; // nhớ thay bằng API thật
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`)
      .then(res => res.json())
      .then(data => {
        const snippet = data.items[0].snippet;
        setTitle(snippet.title);
        setChannel(snippet.channelTitle);
        setThumbnail(snippet.thumbnails.medium.url);
      });
  };

  return (
    <div className="song-player-box">
      <div id="youtube-player" style={{ display: 'none' }}></div>

      <div className="song-info">
        <img className="thumbnail" src={thumbnail} alt="thumbnail" />
        <div className="text-info">
          <div className="song-title">{title}</div>
          <div className="song-artist">{channel}</div>
        </div>
      </div>

      <div className="custom-audio-player">
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="progress-container">
            <div className="progress-bar" onClick={handleSeek}>
              <div className="progress" style={{ width: `${progress}%` }} />
            </div>
            <div className="time-info">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamAudioPlayer;
