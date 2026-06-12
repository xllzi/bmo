type Props = {
  isPlaying: boolean
  volume: number
}

export function PlayerControls({ isPlaying, volume }: Props) {
  return (
    <box flexDirection="row" justifyContent="center" gap={4} padding={1}>
      <text fg="#a9b1d6">⏮ Prev</text>
      <text fg={isPlaying ? "#f7768e" : "#9ece6a"}>
        {isPlaying ?  "▶ Play" : "⏸ Pause"}
      </text>
      <text fg="#a9b1d6">Next ⏭</text>
      <text fg="#e0af68">Vol: {volume}</text>
    </box>
  )
}
