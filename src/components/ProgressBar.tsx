type Props = {
  progress: number
  width?: number
}

export function ProgressBar({ progress, width = 40 }: Props) {
  const filled = Math.floor(width * progress)
  const bar = "█".repeat(filled) + "░".repeat(width - filled)

  return (
    <box paddingX={1}>
      <text fg="#7aa2f7">{bar}</text>
    </box>
  )
}
