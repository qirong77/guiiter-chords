import { useState, useEffect, useMemo, useCallback } from "react";
import { Button, Drawer, Slider, Tooltip } from "antd";
import { SettingOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Chord } from "./components/Chord";
import { SongManager } from "./components/SongManager";
import { ChordData } from "./chords/type";
import { Song } from "./types/song";
import { chords_awbz } from "./chords/chords_awbz";
import { chords_basic } from "./chords/chords_basic";

const SPEED_KEY = "scrollSpeed";
const SONGS_KEY = "songs";
const CURRENT_SONG_KEY = "currentSongId";

// 默认歌曲
const defaultSongs: Song[] = [
    {
        id: "default-song",
        name: "默认歌曲",
        chords: chords_basic,
    },
    {
        id: "awbz-song",
        name: "爱我别走",
        chords: chords_awbz,
    },
];

export default function App() {
    // 从本地存储加载歌曲
    const [songs, setSongs] = useState<Song[]>(() => {
        const stored = localStorage.getItem(SONGS_KEY);
        return stored ? JSON.parse(stored) : defaultSongs;
    });

    // 当前选中的歌曲
    const [currentSongId, setCurrentSongId] = useState<string>(() => {
        const stored = localStorage.getItem(CURRENT_SONG_KEY);
        return stored || defaultSongs[0].id;
    });

    // 当前歌曲
    const currentSong = useMemo(() => {
        return songs.find((s) => s.id === currentSongId) || songs[0];
    }, [songs, currentSongId]);

    const [displayChordList, setDisplayChordList] = useState<ChordData[]>([]);
    const [scrollSpeed, setScrollSpeed] = useState<number>(
        parseInt(window.localStorage.getItem(SPEED_KEY) || "5", 5)
    );
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // 保存歌曲到本地存储
    useEffect(() => {
        localStorage.setItem(SONGS_KEY, JSON.stringify(songs));
    }, [songs]);

    // 保存当前歌曲到本地存储
    useEffect(() => {
        localStorage.setItem(CURRENT_SONG_KEY, currentSongId);
    }, [currentSongId]);

    // 保存滚动速度
    useEffect(() => {
        window.localStorage.setItem(SPEED_KEY, scrollSpeed.toString());
    }, [scrollSpeed]);

    // 初始化显示的和弦列表（基于当前歌曲）
    const initDisplayChordList = useCallback(() => {
        if (!currentSong || currentSong.chords.length === 0) {
            setDisplayChordList([]);
            return;
        }
        const list = [...currentSong.chords];
        for (let i = 1; i < 5; i++) {
            list.push(...currentSong.chords);
        }
        const randomList = list.sort(() => 0.5 - Math.random());
        setDisplayChordList(randomList);
    }, [currentSong]);

    // 当前歌曲改变时，重新初始化和弦列表
    useEffect(() => {
        initDisplayChordList();
    }, [initDisplayChordList]);
    // 当前歌曲改变时，重新初始化和弦列表
    useEffect(() => {
        initDisplayChordList();
    }, [initDisplayChordList]);

    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#fafafa" }}>
            {/* 顶部标题栏 */}
            <div
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            >
                <div>
                    <h1 style={{ margin: 0, fontSize: 24, fontWeight: "bold" }}>🎸 吉他和弦练习</h1>
                    <div style={{ fontSize: 14, marginTop: 4, opacity: 0.9 }}>
                        当前歌曲：{currentSong?.name} ({currentSong?.chords.length || 0} 个和弦)
                    </div>
                </div>
                <Tooltip title="歌曲设置">
                    <Button
                        type="primary"
                        icon={<SettingOutlined />}
                        size="large"
                        onClick={() => setIsSettingsOpen(true)}
                        style={{
                            background: "rgba(255,255,255,0.2)",
                            border: "1px solid rgba(255,255,255,0.3)",
                        }}
                    >
                        设置
                    </Button>
                </Tooltip>
            </div>

            {/* 和弦滚动区域 */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    width: "100%",
                    overflow: "hidden",
                    padding: "30px 0",
                    background: "linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 50%, #f5f7fa 100%)",
                    position: "relative",
                }}
            >
                {/* 滚动容器 */}
                <div
                    style={{
                        display: "flex",
                        animation: `scroll-left ${100 / scrollSpeed}s linear infinite`,
                        transform: "translateX(0)",
                    }}
                >
                    {useMemo(
                        () =>
                            Array.from({ length: 3 }).flatMap((_, repeatIndex) =>
                                displayChordList.map((chord, index) => (
                                    <div
                                        key={`${chord.title}-${repeatIndex}-${index}`}
                                        style={{
                                            marginRight: "10vw",
                                            flexShrink: 0,
                                            minWidth: "120px",
                                            filter: `hue-rotate(${index * 30}deg)`,
                                            transform: "scale(1)",
                                            transition: "transform 0.3s ease",
                                        }}
                                    >
                                        <Chord
                                            title={chord.title}
                                            xMarks={chord.xMarks}
                                            oMarks={chord.oMarks}
                                            strings={chord.strings}
                                        />
                                    </div>
                                ))
                            ),
                        [displayChordList, scrollSpeed]
                    )}
                </div>
            </div>

            {/* 底部控制栏 */}
            <div
                style={{
                    background: "white",
                    borderTop: "1px solid #e8e8e8",
                    padding: "20px 30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
                }}
            >
                <Button
                    type="primary"
                    icon={<ThunderboltOutlined />}
                    size="large"
                    onClick={initDisplayChordList}
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                    }}
                >
                    换一组
                </Button>

                {/* 滚动速度控制 */}
                <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, minWidth: 80 }}>滚动速度:</span>
                    <Slider
                        min={1}
                        max={10}
                        value={scrollSpeed}
                        onChange={setScrollSpeed}
                        style={{ flex: 1 }}
                        tooltip={{ formatter: (value) => `${value}px/s` }}
                    />
                    <span style={{ fontSize: 12, minWidth: 70, color: "#666", textAlign: "right" }}>
                        {scrollSpeed} px/s
                    </span>
                </div>
            </div>

            {/* 设置抽屉 */}
            <Drawer
                title="歌曲管理"
                placement="right"
                onClose={() => setIsSettingsOpen(false)}
                open={isSettingsOpen}
                width={600}
            >
                <SongManager
                    songs={songs}
                    currentSongId={currentSongId}
                    onSongsChange={setSongs}
                    onCurrentSongChange={setCurrentSongId}
                />
            </Drawer>

            {/* CSS 动画定义 */}
            <style>
                {`
                    @keyframes scroll-left {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-33.333%);
                        }
                    }
                `}
            </style>
        </div>
    );
}
