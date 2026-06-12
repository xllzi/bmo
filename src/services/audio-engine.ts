/*
 * audio-engine负责与子进程交互
 */

import type { Subprocess } from "bun"
import type { Track } from '../types'

async function getDuration(path: string): Promise<number> {
    const proc = Bun.spawn([
        'ffprobe', '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        path
    ])
    const output = await new Response(proc.stdout).text()
    return parseFloat(output.trim()) || 0
}

export async function play(
    track: Track,
    onProgress: (progress: number) => void
): Promise<Subprocess> {
    const duration = await getDuration(track.path)
    console.log("duration:", duration)

    const proc = Bun.spawn(['ffplay', '-nodisp', '-autoexit', track.path], {
        stdout: "pipe",
        stderr: "pipe",
    })

    ;(async () => {
        try {
            if (!proc.stderr) {
                console.log("stderr is null")
                return
            }
            const reader = proc.stderr.getReader()
            const decoder = new TextDecoder()
            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const text = decoder.decode(value)
                console.log("stderr:", text.slice(0, 500))

                const timeMatch = text.match(/(?:nan|[\d.]+)\s*:\s*([\d.]+)/)
                if (timeMatch && timeMatch[1] && duration > 0) {
                    const current = parseFloat(timeMatch[1])
                    const progress = current / duration
                    console.log("time:", current, "progress:", progress)
                    onProgress(progress)
                }
            }
        } catch (err) {
            console.log("reader error:", err)
        }
    })()

    return proc
}

export function stop(proc: Subprocess) {
    proc.kill()
}
