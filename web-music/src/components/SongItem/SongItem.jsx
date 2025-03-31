import React, { useState } from 'react';
import './SongItem.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SongItem = ({ video_id, name, desc, image }) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = (e) => {
    console.log("Chuyển đến trang phát nhạc:", name, "ID:", video_id);
    navigate(`/song/${video_id}`);
  };

  return (
    <div className={`song-item ${isPlaying ? 'playing' : ''}`} onClick={handlePlayClick}>
      <div className="song-item-img-container">
        <img className="song-item-image" src={image} alt={name} />
        {!isPlaying && (
          <div className="overlay">
            <img src={assets.play_icon} alt="Play" className="play-icon" />
          </div>
        )}
      </div>

      <div className="song-item-info">
        <div className="song-item-name-rating">
          <p className="song-title">{name}</p>
          <div className="icons">
            <img className="love" src={assets.like_icon} alt="Like" />
            <img className="stars" src={assets.rating_stars} alt="Rating" />
          </div>
        </div>
        <p className="song-item-desc">{desc}</p>
      </div>

      {/* Nếu đang phát, hiển thị iframe YouTube */}
      {isPlaying && video_id && (
        <div className="video-container">
          <iframe
            title={name}
            width="100%"
            height="250px"
            src={`https://www.youtube.com/embed/${video_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default SongItem;
