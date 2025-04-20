import React, { useContext, useRef, useState, useEffect } from 'react';
import SongItem from './SongItem';
import AlbumItem from './AlbumItem';
import { songsData, albumsData } from '../assets/assets';
import Navbar from './Navbar';
import { PlayerContext } from '../context/PlayerContext';

const DisplayHome = () => {
  const { track, playWithId } = useContext(PlayerContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRefs = {
    featured: useRef(null),
    biggest: useRef(null),
    madeForYou: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const headerOpacity = Math.min(scrollPosition / 200, 0.8);

  return (
    <div className="text-white pt-0 pb-32 overflow-x-hidden">
      <Navbar />
      
      <div 
        className="content-container pt-20 pb-4 transition-all duration-300 relative"
        style={{
          background: `linear-gradient(transparent 0, rgba(0, 0, 0, ${headerOpacity}) 100%)`
        }}
      >
        {/* Background gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#12121280] to-transparent -z-10"></div>
        
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">{greeting()}</h1>
          {scrollPosition > 100 && (
            <div className="flex gap-2 animate-fadeInDown">
              <button 
                onClick={() => scrollToSection('featured')} 
                className="bg-[#ffffff15] hover:bg-[#ffffff30] transition-colors text-white font-medium text-sm px-4 py-1.5 rounded-full"
              >
                Featured
              </button>
              <button 
                onClick={() => scrollToSection('biggest')} 
                className="bg-[#ffffff15] hover:bg-[#ffffff30] transition-colors text-white font-medium text-sm px-4 py-1.5 rounded-full"
              >
                Hits
              </button>
              <button 
                onClick={() => scrollToSection('madeForYou')} 
                className="bg-[#ffffff15] hover:bg-[#ffffff30] transition-colors text-white font-medium text-sm px-4 py-1.5 rounded-full"
              >
                For You
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {albumsData.slice(0, 6).map((item) => (
            <div 
              key={item.id}
              className="flex items-center bg-[#ffffff11] hover:bg-[#ffffff22] transition-colors rounded-md overflow-hidden cursor-pointer group h-[64px]"
              onClick={() => playWithId(0)}
            >
              <img src={item.image} alt={item.name} className="h-16 w-16 object-cover shadow-md" />
              <span className="ml-4 font-semibold text-sm group-hover:text-white text-[#ffffffee] truncate">{item.name}</span>
              <div className="ml-auto mr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-[#1db954] rounded-full p-2 shadow-lg hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div ref={sectionRefs.featured} className="content-container section-spacing transition-all duration-300" id="featured">
        <div className="section-header">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">Featured Charts</h2>
          <span 
            className="text-sm font-bold text-[#b3b3b3] hover:text-white hover:underline cursor-pointer transition-colors"
            onClick={() => console.log("Show all featured charts")}
          >
            Show all
          </span>
        </div>
        <div className="w-full overflow-hidden pb-4">
          <div className="card-grid">
            {albumsData.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 overflow-hidden">
                <AlbumItem 
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div ref={sectionRefs.biggest} className="content-container section-spacing" id="biggest">
        <div className="section-header">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">Today's biggest hits</h2>
          <span 
            className="text-sm font-bold text-[#b3b3b3] hover:text-white hover:underline cursor-pointer transition-colors"
            onClick={() => console.log("Show all hits")}
          >
            Show all
          </span>
        </div>
        <div className="w-full overflow-hidden pb-4">
          <div className="card-grid">
            {songsData.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 overflow-hidden">
                <SongItem 
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div ref={sectionRefs.madeForYou} className="content-container section-spacing" id="madeForYou">
        <div className="section-header">
          <h2 className="text-2xl font-bold hover:underline cursor-pointer">Made For You</h2>
          <span 
            className="text-sm font-bold text-[#b3b3b3] hover:text-white hover:underline cursor-pointer transition-colors"
            onClick={() => console.log("Show all Made For You")}
          >
            Show all
          </span>
        </div>
        <div className="w-full overflow-hidden pb-4">
          <div className="card-grid">
            {albumsData.slice().reverse().map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 overflow-hidden">
                <AlbumItem 
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="h-24"></div>
    </div>
  );
};

export default DisplayHome;