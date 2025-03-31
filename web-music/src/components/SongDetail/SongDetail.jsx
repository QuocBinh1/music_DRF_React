import React, { useEffect, useState } from 'react'
import './SongDetail.css'
import { data, useParams } from 'react-router-dom'
import { assets, songsData } from '../../assets/assets';

const SongDetail = () => {
  const { video_id } = useParams();

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
  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/youtube-songs/${video_id}/`)
    .then((res)=>res.json())
    .then((data)=>{
      console.log("Dữ liệu bài hát:", data);
        setSongsData(data);
    }).catch((err)=> console.error("Loi khi lay du lieu bai hat",err));
  },[video_id]);

  return (
    <>
      <div className='song-detail'>
        <img src={songsData.thumbnail} alt={songsData.title} />
        <div className="song-info">
          <div className="song-detail-playlist">
            <p>Playlist</p>
            <h2>{songsData.title}</h2>
            <h4>{songsData.artist}</h4>
          </div>
          <div className="duration">
            <p>1:06</p>
            <div>
              <hr />
            </div>
            <p>3:58</p>
          </div>
          <div className='song-detail-controls'>
            <img src={assets.shuffle_icon} alt="" />
            <img src={assets.prev_icon} alt="" />
            <img src={assets.play_icon} alt="" />
            <img src={assets.next_icon} alt="" />
            <img src={assets.loop_icon} alt="" />
          </div>
        </div>
        <h3>NGHE TIẾP</h3>
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
        <img src={assets.like_icon} alt="" />
        <p>Thêm vào yêu thích</p>
        <img src={assets.bell_icon} alt="" />
        <p>Thông báo</p>
        <img src={assets.mini_player_icon} alt="" />
        <p>Trình phát thu nhỏ</p>
        <img src={assets.mic_icon} alt="" />
        <p>Ghi âm</p>
      </div>
      <div className="lyrics">
        <div className="title">
          <h2>Lời bài hát: Lỡ hẹn với dòng sông Lam</h2>
          <p>Lời đăng bởi: <span className="author">nhnhi</span></p>
        </div>
        <hr />
        <div className="lyrics-detail">
          <p>Mây chiều bản làng soi bóng nước<br />
            Một chiếc thuyền nan vội vã trở về<br />
            Sông Lam một dải xanh như ngọc<br />
            Vời vợi mắt ai buồn tái tê
          </p>

          <p>Xa xa mây phủ non Hồng Lĩnh<br />
            Đá vàng hoa cài nở bến sông<br />
            Câu hát giận thương vương sóng nước<br />
            Đò đầy đò phải sang sông
          </p>

          <p>Đến duyên em đi lấy chồng<br />
            Đôi mắt người thương nghiêng vành nón<br />
            Giận hờn chi rứa bến sông buồn<br />
            Anh nỏ ngỏ lời em chờ đợi sớm hôm
          </p>

          <p>Vì hoa đến thì thì hoa phải nở<br />
            Em xuống bến đò em về bên nớ<br />
            Nước mắt nhạt nhòa theo mái chèo buông<br />
            Từ độ chia tay anh phiêu bạt muôn phương
          </p>
          <p>Nay trở về quê đò gác bến rồi<br />
            Nghe câu vĩ dặm người ơi <br />
            Sương chiều ướt lạnh dòng trôi <br />
            Sông Lam xanh biếc đôi bờ
          </p>
        </div>

      </div>
    </>
  )
}
console.log("Dữ liệu songsData:", songsData);
export default SongDetail