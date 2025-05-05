import React, { useEffect, useState } from 'react'
import './SongDetail.css'
import { data, useParams } from 'react-router-dom'

import StreamAudioPlayer from '../StreamAudioPlayer/StreamAudioPlayer'; // đường dẫn tùy theo cấu trúc của bạn

import { assets, songsData } from '../../assets/assets';

const SongDetail = ({ isLoggedIn, setShowLogin }) => {
  const { video_id } = useParams();
  const [comment, setComment] = useState([]);//ds bl
  const [newComment, setNewComment] = useState("");//new bl
  const [favorites, setFavorites] = useState([]);
  const [songsData, setSongsData] = useState({});
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
    setFavorites(saveFavorites);
    console.log("Danh sách yêu thích từ localStorage:", saveFavorites);
  }, []);
  //lay ds bl tu localStorage
  useEffect(() => {
    const savedComment = JSON.parse(localStorage.getItem(`comment_${video_id}`)) || [];
    setComment(savedComment);
    console.log("Danh sách bình luận từ localStorage:", savedComment);
  }, [video_id]);

  //luu-đẩy bl vao localStorage 
  const saveCommentLocal = (updatedComments) => {
    localStorage.setItem(`comment_${video_id}`, JSON.stringify(updatedComments));
  }

  //xu ly them bl 
  const handleAddComment = () => {
    if (!isLoggedIn) {
      alert("Vui lòng đăng nhập để bình luận");
      setShowLogin(true);
      return;
    }
    if (newComment.trim() === "") {
      alert("Vui lòng nhập bình luận trước khi gửi");
      return;
    }

    const commentData = {
      id: Date.now(),
      name: "Nguời dùng",
      avatar: assets.user,
      content: newComment,
      created_at: new Date().toISOString(),
    };

    const updatedComments = [...comment, commentData];
    setComment(updatedComments);
    setNewComment("");
    saveCommentLocal(updatedComments);
    setNewComment("");
    alert("Đã thêm bình luận thành công!");
  }

  //xu ly xoa bl
  const handleDeleteComment = (commentId) => {
    const updatedComments = comment.filter((comment) => comment.id !== commentId);
    setComment(updatedComments);
    saveCommentLocal(updatedComments);
    alert("Đã xóa bình luận thành công!");
  }
  //xu ly them yeu thich
  const toggleFavorite = (songId) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      console.error("Không có songId (video_id) để thêm vào yêu thích");
      return;
    }

    // Lấy ds yt
    const currentFavorites = JSON.parse(localStorage.getItem("favoriteSongs")) || [];
    let updatedFavorites;

    if (currentFavorites.includes(songId)) {
      updatedFavorites = currentFavorites.filter((id) => id !== songId);
      alert("Đã bỏ khỏi danh sách yêu thích");
    } else {
      updatedFavorites = [...currentFavorites, songId];
      alert("Đã thêm vào danh sách yêu thích");
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites)); // Lưu danh sách yêu thích vào localStorage
    // alert(currentFavorites.includes(songId) ?
    //   "Đã bỏ khỏi danh sách yêu thích" :
    //   "Đã thêm vào danh sách yêu thích"
    // );
  }
  return (
    <>
      <div className='song-detail'>
        {/* <img src={songsData.thumbnail} alt={songsData.title} /> */}
        <div className="song-info">
          <div className="song-detail-playlist">
            <p>Playlist</p>
          </div>
          <div>
          <h2 className="text-2xl font-bold text-center my-4"></h2>
          <StreamAudioPlayer videoId={video_id} />
        </div>

        </div>
      </div>
      <div className="rank-list">
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

      <div className='add-love'>
        <img
          src={assets.like_icon}
          alt="Thêm vào yêu thích"
          onClick={() => toggleFavorite(video_id)}
        />
        <p>{favorites.includes(video_id) ? "Bỏ yêu thích" : "Thêm vào yêu thích"}</p>
        <img src={assets.bell_icon} alt="" />
        <p>Thông báo</p>
        <img src={assets.mini_player_icon} alt="" />
        <p>Trình phát thu nhỏ</p>
        <img src={assets.mic_icon} alt="" />
        <p>Ghi âm</p>
      </div>

      <div className="lyrics">
        <div className="title">
          {/* <h2>Lời bài hát: {song.title}</h2> */}
          <p>Lời đăng bởi: <span className="author">{songsData.artist}</span></p>
        </div>
        <hr />
        <div className="lyrics-detail">
          <p>
            
            M I K E
          </p>
        </div>

      </div>
      <div className="comment-section">
        <h3>Bình luận</h3>
        <div className="comments-list">
          {comment.map((comment) => (
            <div key={comment.id} className="comment-item">
              <img src={comment.avatar} alt="" className='comment-avatar' />
              <div className="comment-content">
                <p><strong>{comment.user}</strong>{comment.content}</p>
                <p className="comment-time">{new Date(comment.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => handleDeleteComment(comment.id)}>Xóa</button>
            </div>
          ))}
        </div>
        <div className="add-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Nhập bình luận của bạn"
          />
          <button onClick={handleAddComment}>Gửi</button>
        </div>
      </div>
    </>
  )
}
console.log("Dữ liệu songsData:", songsData);
export default SongDetail