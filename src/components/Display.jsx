import { Route, Routes, useLocation } from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import { useEffect, useRef } from "react"
import { albumsData } from "../assets/assets"

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = isAlbum && albumsData[Number(albumId)] ? albumsData[Number(albumId)].bgColor : "#121212";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor} 0%, #121212 400px)`;
    } else {
      displayRef.current.style.background = "#121212";
    }
  }, [location, bgColor, isAlbum]);

  return (
    <div 
      ref={displayRef} 
      className="flex-1 m-2 rounded-lg overflow-auto transition-colors duration-1000 ease-in-out scroll-smooth scrollbar-hide"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6) 0%, #121212 100%)",
        scrollbarWidth: 'thin',
        scrollbarColor: '#ffffff40 transparent'
      }}
    >
      <Routes>
        <Route path="/" element={<DisplayHome/>}/>
        <Route path="/album/:id" element={<DisplayAlbum/>}/>
      </Routes>
    </div>
  )
}

export default Display