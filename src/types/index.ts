/*
 * 核心类型定义
 */

export type Track = {
    name: string
    path: string
    duration: number
    artist?: string
    album?: string
}

export type Playlist = {
    tracks: Track[]
    currentIndex: number
}

export type PlayState = {
    stopped: boolean
    volume: number
    progress: number
    mode: string
}


