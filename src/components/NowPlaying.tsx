import type { Track } from "../types"

type Props = {
  track: Track | null
}

export function NowPlaying({ track }: Props) {
  if (!track) {
    return (
      <box borderStyle="rounded" padding={1} width="100%">
        <text fg="#565f89">No track playing</text>
      </box>
    )
  }

  return (
    <box borderStyle="rounded" padding={1} flexDirection="column" width="100%" gap={1}>
      <text fg="#bb9af7">{track.name}</text>
      <text fg="#565f89">
        {track.artist ?? "Unknown"} - {track.album ?? "Unknown"}
      </text>
    </box>
  )
}
