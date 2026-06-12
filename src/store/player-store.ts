/*
 * 管理播放状态的逻辑
 * - 状态初始化
 * - 对应每个操作的状态变化逻辑
 */

import type {PlayState} from '../types'

function createPlayerStore() {
    let state: PlayState = { stopped: true, volume: 50, progress: 0, mode: "sequential" }
    return {
        getState() {
            return state
        }
    }
}

export const playerStore = createPlayerStore()
