import { Glob } from "bun"
import { join, basename } from "node:path"
import type { Track } from "../types"

const AUDIO_PATTERN = "**/*.{mp3,flac,wav,ogg,m4a,aac,wma}"

export async function scanDirectory(dir: string): Promise<Track[]> {
    const glob = new Glob(AUDIO_PATTERN)
    const tracks: Track[] = []

    for await (const file of glob.scan(dir)) {
        const ext = file.lastIndexOf(".")
        const name = ext !== -1 ? basename(file).slice(0, ext) : basename(file)

        tracks.push({
            name,
            path: join(dir, file),
            duration: 0,
        })
    }

    return tracks
}
