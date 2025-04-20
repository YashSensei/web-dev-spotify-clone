import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Home");
  
  const navItems = [
    { icon: assets.home_icon, name: "Home", action: () => { navigate('/'); setActiveItem("Home"); } },
    { icon: assets.search_icon, name: "Search", action: () => setActiveItem("Search") }
  ];
  
  const playlists = [
    "Today's Top Hits",
    "Discover Weekly",
    "Release Radar",
    "Rock Classics",
    "Chill Hits",
    "Indie Mix",
    "Mood Booster",
    "Deep Focus"
  ];

  return (
    <div className="w-[200px] bg-black h-full flex flex-col gap-1 overflow-hidden hidden lg:flex">
      <div className="bg-[#121212] rounded-lg flex flex-col py-1">
        <div className="p-3 flex items-center justify-start">
          <img src={assets.spotify_logo} alt="Spotify" className="w-[22px] h-auto opacity-80 hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="space-y-0.5 mt-1">
          {navItems.map((item, index) => (
            <div 
              key={index}
              onClick={item.action}
              className={`flex items-center gap-3 px-3 py-2 mx-1.5 rounded-md ${
                activeItem === item.name 
                  ? "text-white bg-[#282828]" 
                  : "text-[#b3b3b3] hover:text-white hover:bg-[#1E1E1E]"
              } transition-colors cursor-pointer`}
            >
              <img className="w-4 h-4 opacity-90" src={item.icon} alt={item.name} />
              <p className="text-xs font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[#121212] flex-1 rounded-lg flex flex-col overflow-hidden">
        <div className="flex items-center px-3 py-2">
          <button className="flex items-center gap-2 text-[#b3b3b3] hover:text-white rounded-md py-0.5 px-1.5">
            <img className="w-4 h-4 opacity-80" src={assets.stack_icon} alt="Library" />
            <p className="text-xs">Library</p>
          </button>
          <button className="w-5 h-5 ml-auto flex items-center justify-center rounded-full hover:bg-[#1A1A1A]">
            <img className="w-2.5 opacity-70" src={assets.plus_icon} alt="Add" />
          </button>
        </div>
        
        <div className="relative flex-1 overflow-hidden px-1.5">
          <div className="w-full py-1">
            <div className="flex gap-1.5 mb-2">
              <button className="bg-[#232323] py-0.5 px-2 rounded-full text-[10px] text-white hover:bg-[#2a2a2a]">
                Playlists
              </button>
              <button className="bg-[#232323] py-0.5 px-2 rounded-full text-[10px] text-white hover:bg-[#2a2a2a]">
                Artists
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 bg-[#1A1A1A] rounded-full px-2 py-1 mb-2 hover:bg-[#232323]">
              <img className="w-2.5 opacity-70" src={assets.search_icon} alt="" />
              <p className="text-[#b3b3b3] text-[10px]">Search</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto pb-1">
            <div className="space-y-0.5">
              {playlists.map((playlist, index) => (
                <div 
                  key={index} 
                  className="px-2 py-1.5 hover:bg-[#1a1a1a] rounded cursor-pointer group"
                >
                  <p className="text-[#b3b3b3] group-hover:text-white text-[10px]">{playlist}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
