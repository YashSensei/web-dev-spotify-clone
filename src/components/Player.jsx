import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const { seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong } =
    useContext(PlayerContext);
  const [volume, setVolume] = useState(100);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (document.querySelector('audio')) {
      document.querySelector('audio').volume = e.target.value / 100;
    }
  };

  const formatTime = (time) => {
    return `${time.minute}:${time.second < 10 ? '0' + time.second : time.second}`;
  };

  return (
    <div className="h-[90px] bg-[#181818] border-t border-[#282828] flex justify-between items-center px-4 py-2 text-white w-full overflow-hidden">
      <div className="flex items-center gap-3 w-[30%] min-w-[180px] max-w-[300px]">
        {track.image && (
          <img className="w-14 h-14 rounded shadow-sm flex-shrink-0" src={track.image} alt="song_cover" />
        )}
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-white hover:underline cursor-pointer truncate">{track.name}</p>
          <p className="text-xs text-[#b3b3b3] hover:underline cursor-pointer truncate">{track.desc}</p>
        </div>
        <img
          className="w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity ml-1 flex-shrink-0"
          src={assets.like_icon}
          alt="like"
        />
      </div>

      <div className="flex flex-col items-center gap-2 flex-1 max-w-[45%] px-4">
        <div className="flex gap-4 items-center">
          <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0">
            <img
              className="w-4"
              src={assets.shuffle_icon}
              alt="shuffle"
            />
          </button>
          <button 
            onClick={previous} 
            className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0"
          >
            <img className="w-4" src={assets.prev_icon} alt="previous" />
          </button>
          
          <button 
            onClick={playStatus ? pause : play}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md flex-shrink-0"
          >
            {playStatus ? (
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-black">
                <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" className="w-4 h-4 fill-black ml-0.5">
                <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
              </svg>
            )}
          </button>

          <button 
            onClick={next} 
            className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0"
          >
            <img className="w-4" src={assets.next_icon} alt="next" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0">
            <img className="w-4" src={assets.loop_icon} alt="repeat" />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-[#b3b3b3] min-w-[40px] text-right flex-shrink-0">{formatTime(time.currentTime)}</span>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="h-1 flex-1 bg-[#5e5e5e] rounded-full cursor-pointer group relative min-w-[50px]"
          >
            <div className="absolute inset-0 flex items-center">
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-white rounded-full group-hover:bg-[#1db954]"
              />
              <div className="w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform ml-[-6px] z-10"></div>
            </div>
          </div>
          <span className="text-xs text-[#b3b3b3] min-w-[40px] flex-shrink-0">{formatTime(time.totalTime)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 w-[30%] min-w-[180px] max-w-[300px] justify-end">
        <div className="hidden md:flex items-center">
          <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0">
            <img className="w-4" src={assets.plays_icon} alt="playlist" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0">
            <img className="w-4" src={assets.mic_icon} alt="lyrics" />
          </button>
        </div>
        
        <div className="flex items-center gap-1 group" 
          onMouseEnter={() => setShowVolumeControl(true)}
          onMouseLeave={() => setShowVolumeControl(false)}
        >
          <button className="w-8 h-8 flex items-center justify-center opacity-70 group-hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0">
            <img className="w-4" src={assets.volume_icon} alt="volume" />
          </button>
          <div className={`w-0 group-hover:w-24 overflow-hidden transition-all duration-200 ease-out flex-shrink-0 ${showVolumeControl ? 'w-24' : ''}`}>
            <div className="w-24 bg-[#5e5e5e] h-1 rounded-full relative">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange}
                className="absolute opacity-0 w-full h-5 top-[-8px] cursor-pointer" 
              />
              <div 
                className="h-1 bg-white rounded-full group-hover:bg-[#1db954]"
                style={{width: `${volume}%`}}
              ></div>
              <div 
                className="w-3 h-3 bg-white rounded-full absolute top-[-4px] scale-0 group-hover:scale-100 transition-transform"
                style={{left: `calc(${volume}% - 6px)`}}
              ></div>
            </div>
          </div>
        </div>
        
        <button className="w-8 h-8 flex items-center justify-center opacity-70 hover:opacity-100 cursor-pointer transition-opacity flex-shrink-0">
          <img className="w-4" src={assets.mini_player_icon} alt="mini-player" />
        </button>
      </div>
    </div>
  );
};

export default Player;
