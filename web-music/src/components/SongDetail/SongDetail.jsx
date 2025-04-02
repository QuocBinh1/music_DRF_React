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
    fetch(`https://music-backend-k82o.onrender.com/api/songs/${video_id}/`)
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
          {/* <div className="duration">
            <p>1:06</p>
            <div>
              <hr />
            </div>
            <p>3:58</p>
          </div> */}
          {songsData.play_url ? (
            <div className="audio-player"    >
              <audio controls autoPlay>
                <source src={songsData.play_url} type="audio/mp3" />
                Trình duyệt của bạn không hỗ trợ phát nhạc.
              </audio>
            </div>
          ):(
            <p>Không tìm thấy file nhạc.</p>
          )}

          {/* <div className='song-detail-controls'>
            <img src={assets.shuffle_icon} alt="" />
            <img src={assets.prev_icon} alt="" />
            <img src={assets.play_icon} alt="" />
            <img src={assets.next_icon} alt="" />
            <img src={assets.loop_icon} alt="" />
          </div> */}
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
            Yéh yeh
            Òh nhạc này tẩm đá
            Hơ hỡ
            (M I K E)
            Tự hào vì những vấp ngã sóng gió thân trai đời này đi qua
            Vẻ đẹp từ những vết xước lớn bé tràn đầy nghệ thuật trên da
            Vùng dậy trở thành người có tiếng nói thay vì một mình rên la
            Trân trọng cảm ơn tất cả anh em không ngại cùng mình xông pha
            Nà á a a à một từ đãa a à
            Tự do làm điều mình muốn xõa à a á
            Rapper thích ka la là la lá
            Không thích thì xích qua và những lời dối trá

            Tao đã quen dần vì đã có những lần
            Tay trắng chân trần bụi đường trời đã cho
            Họ gọi tụi tao "dân bần" (rất là bần)
            Đời người là lắng lo tự thân rạch thân phân trần
            Những lần mình đắn đo là vòng quay Trái Đất cân bằng (rất công bằng)
            Ú quơ o òh

            Làm nhạc là tự do không kịch bản
            Đem lời cần than vãn lên giấy mà viết không được nản
            Đôi khi có vài thằng thích chọc điên tiết mình, đ*o hảo hán
            Như thằng cuồng *** đè beat ra mà hiếp, tòa tuyên án
            Cho bị cáo Mike chung thân cả đời với âm nhạc

            Chúng mày sỉ nhục tao trên mạng rồi tao phải câm à?
            Hay phải cười thân thiện rồi một dạ hai vâng á?
            Tao thích làm đ*o gì tao làm
            Chúng nó muốn thấy tao với hai hàng lệ
            Tao thích làm đ*o gì tao làm
            Chúng nó muốn thấy ao@#$%^&*
            (Shout out 2 anh nam cocáin)

            Tự hào vì những vấp ngã sóng gió thân trai đời này đi qua
            Vẻ đẹp từ những vết xước lớn bé tràn đầy nghệ thuật trên da
            Vùng dậy trở thành người có tiếng nói thay vì một mình rên la
            Trân trọng cảm ơn tất cả anh em không ngại cùng mình xông pha
            Nà á a a à một từ đãa a à
            Tự do làm điều mình muốn xõa à a á
            Rapper thích ka la là la lá
            Không thích thì xích qua và những lời dối trá
            Tao đã quen dần
            M I K E
          </p>
        </div>

      </div>
    </>
  )
}
console.log("Dữ liệu songsData:", songsData);
export default SongDetail