import { useContext } from "react"
import Display from "./components/Display"
import Player from "./components/Player"
import Sidebar from "./components/Sidebar"
import { PlayerContext } from "./context/PlayerContext"

const App = () => {
  const {audioRef,track} = useContext(PlayerContext)
  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar/>
        <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  )
}

export default App