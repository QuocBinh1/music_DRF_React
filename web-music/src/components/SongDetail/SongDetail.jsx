import React, { useEffect, useState } from 'react'
import './SongDetail.css'
import { data, useParams } from 'react-router-dom'
import { assets, songsData } from '../../assets/assets';
import StreamAudioPlayer from '../../components/StreamAudioPlayer'; // đường dẫn tùy theo cấu trúc của bạn

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
  // useEffect(()=>{
  //  //fetch(`https://music-backend-k82o.onrender.com/api/songs/${video_id}/`)
  //   fetch(`http://127.0.0.1:8000/api/songs/${video_id}/`)
  //   .then((res)=>res.json())
  //   .then((data)=>{
  //     console.log("Dữ liệu bài hát:", data);
  //       setSongsData(data);
  //   }).catch((err)=> console.error("Loi khi lay du lieu bai hat",err));
  // },[video_id]);

  return (
    <>
      <div className='song-detail'>
        {/* <img src={songsData.thumbnail} alt={songsData.title} /> */}
        <div className="song-info">
          <div className="song-detail-playlist">
            <p>Playlist</p>
           
          </div>

          
        {/* {songsData.video_id ? ( <StreamAudioPlayer videoId={video_id} />) : ( <p>Không tìm thấy bài hát.</p> )} */}
        <div>
          <h2 className="text-2xl font-bold text-center my-4">
          </h2>
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
          <h2>Lời bài hát: {songsData.title}</h2>
          <p>Lời đăng bởi: <span className="author">{songsData.artist}</span></p>
        </div>
        <hr />
        <div className="lyrics-detail">
          <p>
            
            M I K E
          </p>
        </div>

      </div>
    </>
  )
}
console.log("Dữ liệu songsData:", songsData);
export default SongDetail