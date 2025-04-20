import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { albumsData, assets, songsData } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId, track, play } = useContext(PlayerContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerOpacity = Math.min(scrollPosition / 300, 0.8);

  return (
    <div className="text-white pt-0 pb-32 overflow-x-hidden">
      <Navbar />
      
      <div 
        className="content-container pt-24 pb-8 relative transition-all duration-300"
        style={{
          background: `linear-gradient(transparent 0, rgba(0, 0, 0, ${headerOpacity}) 100%)`
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-[#12121280] to-transparent -z-10"></div>
        
        {/* Album header content */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-8 max-w-full">
          <div className="shadow-2xl flex-shrink-0 group relative">
            <img 
              className="w-52 h-52 md:w-56 md:h-56 object-cover rounded-md shadow-xl transition-all duration-300 group-hover:shadow-2xl" 
              src={albumData.image} 
              alt={albumData.name} 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  playWithId(0);
                  play();
                }}
                className="bg-[#1db954] rounded-full p-3.5 scale-90 hover:scale-100 transition-transform shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col overflow-hidden text-center md:text-left">
            <span className="text-xs font-medium uppercase tracking-wider mb-2">Playlist</span>
            <h1 className="text-5xl font-extrabold mb-5 md:text-7xl truncate">{albumData.name}</h1>
            <p className="text-[#b3b3b3] mb-3 line-clamp-2 text-sm md:text-base">{albumData.desc}</p>
            <div className="flex items-center gap-2 text-sm flex-wrap justify-center md:justify-start">
              <img className="inline-block w-6 h-6 rounded-full" src={assets.spotify_logo} alt="Spotify" />
              <span className="font-semibold hover:underline cursor-pointer">Spotify</span>
              <span className="mx-1 text-xs text-[#b3b3b3]">•</span>
              <span className="font-semibold hover:underline cursor-pointer">{Math.floor(Math.random() * 1000000) + 500000} likes</span>
              <span className="mx-1 text-xs text-[#b3b3b3]">•</span>
              <span className="font-semibold">{songsData.length} songs,</span>
              <span className="text-[#a7a7a7]">about 2hr 30 min</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="content-container mt-4 group max-w-full bg-gradient-to-b from-[#12121210] to-[#121212] pt-4">
        <div className="flex items-center gap-8 mb-6">
          <button
            onClick={() => {
              playWithId(0);
              play();
            }}
            className="bg-[#1db954] rounded-full p-3.5 hover:scale-105 transition-transform cursor-pointer shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-6 h-6">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
          </button>
          <svg className="w-8 h-8 text-[#1db954] opacity-0 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm6-6.75a.75.75 0 00-1.5 0v13.5a.75.75 0 001.5 0V6zm6 3a.75.75 0 00-1.5 0v10.5a.75.75 0 001.5 0V9z" />
          </svg>
        </div>

        <div className="grid grid-cols-[16px_4fr_3fr_2fr_1fr] items-center border-b border-[#ffffff1a] py-2 px-4 text-[#b3b3b3] text-sm max-w-full overflow-hidden">
          <span className="font-bold">#</span>
          <span>Title</span>
          <span className="truncate">Album</span>
          <span className="truncate">Date Added</span>
          <span className="justify-self-end">
            <img className="w-5" src={assets.clock_icon} alt="Duration" />
          </span>
        </div>
        
        <div className="mt-2 overflow-hidden">
          {songsData.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => playWithId(item.id)} 
              className={`grid grid-cols-[16px_4fr_3fr_2fr_1fr] items-center px-4 py-2 rounded mx-[-16px] group/item hover:bg-[#ffffff1a] cursor-pointer ${track.id === item.id ? 'bg-[#ffffff1a]' : ''}`}
            >
              <div className="relative flex items-center justify-center">
                <span className={`group-hover/item:hidden ${track.id === item.id ? 'text-[#1db954]' : ''}`}>{index + 1}</span>
                {track.id === item.id ? (
                  <svg className="w-4 h-4 text-[#1db954] hidden group-hover/item:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 hidden group-hover/item:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.3 2.84A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.27l9.344-5.891a1.5 1.5 0 000-2.538L6.3 2.841z" />
                  </svg>
                )}
              </div>
              
              <div className="flex items-center gap-3 overflow-hidden">
                <img className="w-10 h-10 object-cover flex-shrink-0" src={item.image} alt={item.name} />
                <div className="overflow-hidden">
                  <p className={`font-medium text-sm truncate ${track.id === item.id ? 'text-[#1db954]' : 'text-white'}`}>{item.name}</p>
                  <p className="text-xs text-[#b3b3b3] truncate">{item.desc}</p>
                </div>
              </div>
              
              <span className="text-sm text-[#b3b3b3] truncate">{albumData.name}</span>
              <span className="text-sm text-[#b3b3b3] truncate">5 days ago</span>
              <span className="text-sm text-[#b3b3b3] justify-self-end flex-shrink-0">{item.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayAlbum;
