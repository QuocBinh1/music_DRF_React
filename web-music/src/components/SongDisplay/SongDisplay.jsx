//web-music/SongDisplay.jsx
import React, { useState, useEffect } from "react";
import './SongDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import SongItem from '../SongItem/SongItem'
import { Link } from "react-router-dom";

const SongDisplay = () => {
  const [songsData, setSongsData] = useState([]);

  useEffect(() => {
    fetch("https://music-backend-k82o.onrender.com/api/songs/")
    //fetch("http://127.0.0.1:8000/api/songs/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSongsData(data); // Nếu API trả về mảng
        } else if (data && Array.isArray(data.data)) {
          setSongsData(data.data); // Nếu API trả về object chứa `data`
        } else {
          console.error("Dữ liệu API không hợp lệ:", data);
        }
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu bài hát", err));
  }, []);

  return (
    
    <div className='song-display' id='song-display'>
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