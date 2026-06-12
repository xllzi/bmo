import { useKeyboard, useRenderer } from "@opentui/react"
import { useState, useEffect, useRef } from "react"
import type { Subprocess } from "bun"
import type { Track } from "./types"
import { NowPlaying } from "./components/NowPlaying"
import { ProgressBar } from "./components/ProgressBar"
import { PlayerControls } from "./components/PlayerControls"
import { Playlist } from "./components/Playlist"
import { scanDirectory } from "./services/scanner"
import { play, stop } from "./services/audio-engine"
import { playerStore } from "./store/player-store"

export function App() {
  const renderer = useRenderer()

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(50)
  const [tracks, setTracks] = useState<Track[]>([])
  const engineRef = useRef<Subprocess | null>(null)

  useEffect(() => {
    scanDirectory("/home/Qtmd/Projects/bmo/test/data/").then((t) => {
      setTracks(t)
    })
  }, [])

  useEffect(() => {
    if (isPlaying && currentTrack) {
      play(currentTrack, setProgress).then((proc) => {
        engineRef.current = proc
      })
    } else {
      if (engineRef.current) {
        stop(engineRef.current)
        engineRef.current = null
      }
    }
    return () => {
      if (engineRef.current) {
        stop(engineRef.current)
        engineRef.current = null
      }
    }
  }, [isPlaying, currentTrack])

  useKeyboard((key) => {
    if (key.name === "q") {
      renderer.destroy()
    }
    if (key.name === "space") {
      setIsPlaying((prev) => !prev)
    }
  })

  return (
    <box flexDirection="column" width="100%" height="100%" padding={1} focusable>
      <NowPlaying track={currentTrack} />
      <ProgressBar progress={progress} />
      <PlayerControls isPlaying={isPlaying} volume={volume} />
      <Playlist tracks={tracks} onSelect={(track) => {
        setProgress(0)
        setCurrentTrack(track)
      }} />
    </box>
  )
}
