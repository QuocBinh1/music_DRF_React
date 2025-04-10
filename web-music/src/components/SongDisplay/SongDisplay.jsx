//web-music/SongDisplay.jsx
import React, { useState, useEffect } from "react";
import './SongDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import SongItem from '../SongItem/SongItem'
import { Link } from "react-router-dom";
import SearchBar from '../SearchBar/SearchBar';

const SongDisplay = () => {
  const [songsData, setSongsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('mikelodick');

  const fetchSongs = (query) => {
    fetch(`https://music-backend-k82o.onrender.com/api/search/?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSongsData(data);
        } else if (data && Array.isArray(data.data)) {
          setSongsData(data.data);
        } else {
          console.error("Dữ liệu API không hợp lệ:", data);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu bài hát", err));
  };

  useEffect(() => {
    fetchSongs(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='song-display' id='song-display'>
       <SearchBar onSearch={handleSearch} />
      <h2>Danh sách bài hát</h2>

      <div className="song-display-list">
        {songsData.map((song, index) => (
          <Link to={`/song/${song.video_id}`} key={index}>
            <SongItem key={index} 
              video_id={song.video_id} 
              name={song.title} 
              desc={song.artist} 
              image={song.thumbnail} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SongDisplay;