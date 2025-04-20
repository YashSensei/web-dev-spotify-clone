import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"

const SongItem = ({name,image,desc,id}) => {

  const {playWithId, track} = useContext(PlayerContext)
  const isPlaying = track.id === id

  return (
    <div
      onClick={()=> playWithId(id)}
      className="h-full p-4 bg-[#181818] rounded-lg cursor-pointer hover:bg-[#282828] transition-colors duration-300 group relative w-full"
    >
      <div className="relative mb-3">
        <img
          className="w-full aspect-square object-cover rounded-md shadow-lg"
          src={image}
          alt={name}
          loading="lazy"
        />
        <button
          className="absolute right-2 bottom-2 w-10 h-10 rounded-full bg-[#1db954] shadow-xl flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-[#1ed760]"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
              <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        {isPlaying && (
          <div className="absolute bottom-2 left-2 flex items-end h-3 space-x-0.5">
            <div className="w-[3px] bg-[#1db954] rounded-sm spotify-equalizer" style={{ "--delay": "0" }}></div>
            <div className="w-[3px] bg-[#1db954] rounded-sm spotify-equalizer" style={{ "--delay": "1" }}></div>
            <div className="w-[3px] bg-[#1db954] rounded-sm spotify-equalizer" style={{ "--delay": "2" }}></div>
          </div>
        )}
      </div>
      <div className="space-y-1 overflow-hidden">
        <h3 className={`font-bold text-base truncate ${isPlaying ? 'text-[#1db954]' : ''}`}>{name}</h3>
        <p className="text-[#a7a7a7] text-sm line-clamp-2 break-words">{desc}</p>
      </div>
    </div>
  )
}

export default SongItem