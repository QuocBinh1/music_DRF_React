import React, { useEffect, useState } from 'react'
import './Playlist.css'
import { Link } from 'react-router-dom'
const Playlist = () => {
  const [favoriteSongs, setFavoritesSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const songRank = [
    { name: "Mất kết nối", singer: "Dương Domic" },
    { name: "Giờ thì", singer: "buitruonglinh" },
    { name: "Câu trả lời", singer: "J.DAE" },
    { name: "Có đôi điều", singer: "Shiki" },
    { name: "Hello Việt Nam", singer: "Bống" },
    { name: "Mất kết nối", singer: "Dương Domic" },
    { name: "Giờ thì", singer: "buitruonglinh" },
    { name: "Câu trả lời", singer: "J.DAE" },
    { name: "Có đôi điều", singer: "Shiki" },
    { name: "Hello Việt Nam", singer: "Bống" },
  ];
  

  useEffect(() => {
    const saveFavorites = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    setFavoritesSongs(saveFavorites);
    console.log("Danh sách yêu thích từ localStorage:", saveFavorites);
    console.log("Danh sách tất cả bài hát từ API:", allSongs);
  }, []);
  const filteredSongs = allSongs.filter(song => favoriteSongs.includes(String(song.video_id)));
  console.log("Danh sách bài hát yêu thích đã lọc:", filteredSongs); // Debug danh sách bài hát yêu thích

  return (
    <div className="playlist-container">
      <div className="playlist-left">
        <h2 className="playlist-title">🎵 Danh sách yêu thích</h2>
        {filteredSongs.length > 0 ? (
          <ul className="playlist-song-list">
            {filteredSongs.map((song) => (
              <li key={song.video_id} className="playlist-song-item">
                <img src={song.thumbnail} alt={song.title} className="playlist-song-thumbnail" />
                <div className="playlist-song-info">
                  <h4 className="playlist-song-title">{song.title}</h4>
                  <p className="playlist-song-artist">{song.artist}</p>
                </div>
                <Link to={`/song/${song.video_id}`} className="playlist-play-button">
                  ▶️ Nghe
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-favorites-song">❌ Chưa có bài hát yêu thích nào.</p>
        )}
      </div>
      <div className="playlist-right">
        <h2>🔥 BXH Bài Hát</h2>
        {songRank.map((song, index) =>
          <div key={index} className="song-name-item">
            <span className='song-rank-number'>{index + 1}</span>
            <div className="song-rank-info">
              <p className='song-title'>{song.name}</p>
              <p className='song-singer'>{song.singer}</p><hr />
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default Playlist