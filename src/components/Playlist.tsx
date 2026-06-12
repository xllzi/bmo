import { useRef, useEffect } from "react"
import type { Track } from "../types"

type Props = {
  tracks: Track[]
  onSelect: (track: Track, index: number) => void
}

export function Playlist({ tracks, onSelect }: Props) {
  const selectRef = useRef<any>(null)

  useEffect(() => {
    selectRef.current?.focus()
  }, [tracks])

  if (tracks.length === 0) {
    return (
      <box flexGrow={1} borderStyle="rounded" padding={1}>
        <text fg="#e0af68">Playlist (empty)</text>
      </box>
    )
  }

  const options = tracks.map((t) => ({
    name: t.name,
    description: `${t.artist ?? "Unknown"} - ${t.album ?? "Unknown"}`,
  }))

  return (
    <box flexGrow={1} borderStyle="rounded" padding={1}>
      <select
        ref={selectRef}
        width="100%"
        height="100%"
        options={options}
        onSelect={(index) => {
          const track = tracks[index]
          if (track) onSelect(track, index)
        }}
      />
    </box>
  )
}
