import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();
  
  const navItems = [
    { icon: assets.home_icon, name: "Home", action: () => navigate('/') },
    { icon: assets.search_icon, name: "Search", action: () => {} }
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
    <div className="w-56 bg-black h-full flex flex-col gap-1 overflow-hidden hidden lg:flex">
      <div className="bg-[#121212] rounded-lg flex flex-col">
        <div className="px-5 pt-6 pb-5">
          <img src={assets.spotify_logo} alt="Spotify" className="w-[82px]" />
        </div>
        
        {navItems.map((item, index) => (
          <div 
            key={index}
            onClick={item.action}
            className="flex items-center gap-4 px-4 py-2.5 mx-2 rounded font-semibold text-[#b3b3b3] hover:text-white transition-colors cursor-pointer"
          >
            <img className="w-6" src={item.icon} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-[#121212] flex-1 rounded-lg flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors cursor-pointer rounded-md py-1 px-2">
            <img className="w-6" src={assets.stack_icon} alt="Library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center">
            <div className="p-1 rounded-full hover:bg-[#232323] transition-colors cursor-pointer">
              <img className="w-4 opacity-70 hover:opacity-100" src={assets.plus_icon} alt="Add" />
            </div>
          </div>
        </div>
        
        <div className="px-2">
          <div className="flex gap-2 mb-4 px-2">
            <div className="bg-[#232323] py-1 px-3 rounded-full text-xs font-medium text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer">
              Playlists
            </div>
            <div className="bg-[#232323] py-1 px-3 rounded-full text-xs font-medium text-white hover:bg-[#2a2a2a] transition-colors cursor-pointer">
              Artists
            </div>
          </div>
        </div>
          
        <div className="relative flex-1 overflow-hidden px-2">
          <div className="bg-[#121212] py-1 w-full">
            <div className="flex items-center gap-1 bg-[#242424] rounded-md px-3 py-1.5 mx-2 hover:bg-[#2a2a2a] transition-colors cursor-pointer">
              <img className="w-4 opacity-70" src={assets.search_icon} alt="" />
              <p className="text-[#b3b3b3] text-sm">Search in Your Library</p>
            </div>
          </div>
          
          <div className="mt-3 flex-1 overflow-auto">
            <div className="mx-2 space-y-2">
              {playlists.map((playlist, index) => (
                <div 
                  key={index} 
                  className="px-3 py-2 hover:bg-[#1a1a1a] rounded-md cursor-pointer transition-colors"
                >
                  <p className="text-[#b3b3b3] hover:text-white transition-colors text-sm font-medium">{playlist}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-[#242424] rounded-lg mx-2 mt-4 overflow-hidden">
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1">Create your first playlist</h3>
                <p className="text-xs text-[#b3b3b3] mb-4">It's easy, we'll help you</p>
                <button className="bg-white text-black font-semibold text-xs py-1.5 px-3.5 rounded-full hover:scale-105 transition-transform">
                  Create playlist
                </button>
              </div>
            </div>
            
            <div className="bg-[#242424] rounded-lg mx-2 mt-3 overflow-hidden">
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1">Find podcasts to follow</h3>
                <p className="text-xs text-[#b3b3b3] mb-4">We'll keep you updated on new episodes</p>
                <button className="bg-white text-black font-semibold text-xs py-1.5 px-3.5 rounded-full hover:scale-105 transition-transform">
                  Browse podcasts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
