# 音乐播放器组件架构
## 音频引擎层
- 音频播放核心: 通过子进程调用 ffplay
- 解码器 — 支持 MP3、FLAC、WAV 等格式的解码
- 音频数据流 — 为未来的声学可视化暴露 PCM/frequency 数据
## UI 层 (OpenTUI)
| 组件 | 说明 |
|------|------|
| NowPlaying 面板 | 当前歌曲信息、进度条、播放/暂停/上下首控制 |
| Playlist 面板 | 播放列表管理，ScrollBox + Select 组件 |
| Library 浏览器 | 按歌手/专辑/文件夹浏览本地音乐 |
| Search 面板 | Input 组件实现搜索，展示搜索结果列表 |
| Visualizer 面板 | （后期）基于 FrameBuffer 的音频可视化 |
| Layout 骨架 | 使用 Box flexbox 布局划分各区域 |
## 状态管理层
- PlayerStore — 播放状态（play/pause/stop）、当前曲目、音量、进度
- QueueStore — 播放队列、播放模式（顺序/随机/单曲循环）
- LibraryStore — 本地音乐库索引
- SearchStore — 搜索状态和结果
## 数据源层
- 本地文件扫描器 — 递归扫描目录，发现音频文件
- 元数据解析器 — 读取 ID3 tags（歌名、歌手、专辑、封面等），可用 music-metadata 库
- 在线 API 客户端 — 对接在线音乐源（具体 API 待定）
## 工具层
- 键盘快捷键 — 利用 OpenTUI 的 useKeyboard 实现全局快捷键
- 配置管理 — 音乐目录路径、主题偏好等
- 持久化 — 播放列表和配置的本地存储（JSON/SQLite）

# 项目结构
```
bmo/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.tsx              # 入口，初始化 renderer + React root
│   ├── app.tsx                # 主布局 (flexbox 分区)
│   │
│   ├── components/            # UI 组件
│   │   ├── NowPlaying.tsx     # 当前播放信息 + 进度条
│   │   ├── PlayerControls.tsx # 播放/暂停/上下首/音量
│   │   ├── ProgressBar.tsx    # 播放进度条
│   │   ├── Playlist.tsx       # 播放列表 (ScrollBox + Select)
│   │   ├── SearchBar.tsx      # 搜索输入 (Input)
│   │   ├── SearchResults.tsx  # 搜索结果列表
│   │   └── Library.tsx        # 本地音乐库浏览
│   │
│   ├── hooks/                 # 自定义 hooks
│   │   ├── usePlayer.ts       # 播放控制 hook
│   │   ├── usePlaylist.ts     # 播放列表管理 hook
│   │   ├── useSearch.ts       # 搜索 hook
│   │   └── useKeyboard.ts     # 全局快捷键
│   │
│   ├── services/              # 业务逻辑层
│   │   ├── audio-engine.ts    # 子进程音频播放 (ffplay/mpg123)
│   │   ├── scanner.ts         # 本地音乐文件扫描
│   │   ├── metadata.ts        # ID3 元数据解析
│   │   └── online-source.ts   # 在线源接口 (预留)
│   │
│   ├── store/                 # 状态管理
│   │   ├── player-store.ts    # 播放状态
│   │   ├── queue-store.ts     # 播放队列
│   │   └── library-store.ts   # 音乐库状态
│   │
│   └── types/                 # 类型定义
│       └── index.ts           # Track, Playlist, PlayerState 等
```

