/*
 * 管理播放队列的逻辑
 * - 下/上一首
 * - 添加到队列
 * - 从队列删除
 * - 设置播放模式：顺序播放、随机播放
 */
import type { Playlist, Track } from '../types'

function createPlaylist(): Playlist {
    return { tracks: [], currentIndex: 0 }
}

export const playList: Playlist = createPlaylist()

export function addTrack(track: Track) {
    playList.tracks.push(track)
}

export function deleteTrack(index: number) {
    playList.tracks.splice(index, 1)
}
