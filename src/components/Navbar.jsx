import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolling(true);
      
      // Determine scroll direction for hiding/showing navbar
      if (currentScrollY > lastScrollY.current + 50 && currentScrollY > 150) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 100) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout to detect when scrolling stops
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const getNavbarOpacity = () => {
    // Maximum opacity at 100px scroll
    const maxOpacity = 0.95;
    const scrollThreshold = 100;
    const opacity = Math.min(scrollY / scrollThreshold, 1) * maxOpacity;
    return opacity;
  };
  
  const getNavbarScale = () => {
    // Subtle scale effect during scrolling
    if (!isScrolling) return 1;
    return 0.995;
  };
  
  return (
    <div 
      ref={navbarRef}
      className={`sticky top-0 z-50 py-4 px-8 md:px-10 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-16'
      }`}
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-500 -z-10 ${
          scrollY > 10 ? 'navbar-gradient opacity-100' : 'opacity-0'
        }`} 
      />
      
      <div className="relative">
        <div className={`flex justify-between items-center ${scrollY > 10 ? 'animate-fadeInDown' : ''}`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#00000080] rounded-full p-2 flex items-center justify-center hover:bg-[#000000bb] transition-colors"
            >
              <img className="w-5" src={assets.arrow_left} alt="Back" />
            </button>
            <button
              onClick={() => navigate(1)}
              className="bg-[#00000080] rounded-full p-2 flex items-center justify-center hover:bg-[#000000bb] transition-colors"
            >
              <img className="w-5" src={assets.arrow_right} alt="Forward" />
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="bg-white text-black font-semibold text-sm py-2 px-5 rounded-full hover:scale-105 transition-transform hidden md:block">
              Explore Premium
            </button>
            <button className="flex items-center gap-1.5 bg-[#00000080] text-white font-medium text-sm py-1.5 px-4 rounded-full hover:bg-[#000000bb] hover:scale-105 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              </svg>
              Install App
            </button>
            <div className="w-9 h-9 rounded-full bg-[#9b57dc] flex items-center justify-center text-black font-bold cursor-pointer hover:scale-105 transition-transform">
              U
            </div>
          </div>
        </div>
        
        <div className={`flex gap-3 mt-6 transition-all duration-300 ${
          scrollY > 150 ? 'opacity-0 -translate-y-2' : 'opacity-100 animate-fadeInDown'
        }`}>
          <button className="bg-white text-black font-medium text-sm px-5 py-1.5 rounded-full">
            All
          </button>
          <button className="bg-[#232323] text-white font-medium text-sm px-5 py-1.5 rounded-full hover:bg-[#2a2a2a] transition-colors">
            Music
          </button>
          <button className="bg-[#232323] text-white font-medium text-sm px-5 py-1.5 rounded-full hover:bg-[#2a2a2a] transition-colors">
            Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
