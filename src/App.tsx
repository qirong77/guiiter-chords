import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Chord } from "./components/Chord";

// 定义和弦数据类型
interface ChordData {
    title: string;
    xMarks: number[];
    oMarks: number[];
    strings: [number, number][];
}
const SPEED_KEY = "scrollSpeed";
export default function App() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [displayChordList, setDisplayChordList] = useState<ChordData[]>([]);
    const [scrollSpeed, setScrollSpeed] = useState<number>(parseInt(window.localStorage.getItem(SPEED_KEY) || "30", 10)); // 滚动速度 (像素/秒)
    useEffect(() => {
        window.localStorage.setItem(SPEED_KEY, scrollSpeed.toString());
    }, [scrollSpeed]);
    // 滚动容器引用
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    // 所有和弦数据
    const chords: ChordData[] = [
        {
            title: "Em",
            xMarks: [],
            oMarks: [6, 3, 2, 1],
            strings: [
                [2, 4], // 第2品第4弦
                [2, 5], // 第2品第5弦
            ],
        },
        {
            title: "E",
            xMarks: [],
            oMarks: [6, 2, 1],
            strings: [
                [1, 3], // 第1品第3弦
                [2, 4], // 第2品第4弦
                [2, 5], // 第2品第5弦
            ],
        },
        {
            title: "Am",
            xMarks: [6],
            oMarks: [2, 1],
            strings: [
                [1, 2],
                [2, 3], // 第2品第3弦
                [2, 4], // 第2品第4弦
            ],
        },
        {
            title: "A",
            xMarks: [6],
            oMarks: [2, 1],
            strings: [
                [2, 2],
                [2, 3], // 第2品第3弦
                [2, 4], // 第2品第4弦
            ],
        },
        {
            title: "Dm",
            xMarks: [5, 6],
            oMarks: [4],
            strings: [
                [1, 1], // 第1品第1弦
                [2, 3], // 第2品第3弦
                [3, 2], // 第3品第2弦
            ],
        },
        {
            title: "D",
            xMarks: [5, 6],
            oMarks: [4],
            strings: [
                [2, 1], // 第2品第1弦
                [2, 3], // 第2品第3弦
                [3, 2], // 第3品第2弦
            ],
        },
        {
            title: "G",
            oMarks: [2, 3, 4],
            xMarks: [],
            strings: [
                [2, 5], // 第2品第5弦
                [3, 6], // 第3品第6弦
                [3, 1], // 第3品第1弦
            ],
        },
        {
            title: "C",
            xMarks: [6],
            oMarks: [1, 3],
            strings: [
                [1, 2], // 第1品第2弦
                [2, 4], // 第2品第4弦
                [3, 5], // 第3品第5弦
            ],
        },
        {
            title: "Fmaj7",
            xMarks: [6, 5],
            oMarks: [1],
            strings: [
                [1, 2],
                [2, 3],
                [3, 4],
            ],
        },
    ];

    // 获取随机和弦索引
    const getRandomChordIndex = useCallback(() => {
        return Math.floor(Math.random() * chords.length);
    }, [chords.length]);
    
    const initDisplayChordList = useCallback(() => {
        const list = [];
        // 限制最多10个和弦
        for (let i = 0; i < Math.min(10, chords.length); i++) {
            list.push(chords[getRandomChordIndex()]);
        }
        setDisplayChordList(list);
    }, [chords, getRandomChordIndex]);
    // 播放控制函数
    const togglePlay = useCallback(() => {
        if (!isPlaying) {
            initDisplayChordList();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, initDisplayChordList]);

    useEffect(() => {
        togglePlay();
    }, []);
    return (
        <div style={{ maxHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ overflow: "scroll", border: "1px solid #5b5656ff", marginBottom: 20 }}>
                {/* 和弦显示区域 */}
                <div
                    style={{
                        padding: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "30px",
                        paddingBottom: "120px", // 为底部控制栏留出空间
                    }}
                >
                    {chords.map((chord, index) => (
                        <div
                            key={`${chord.title}-${index}`}
                            style={{
                                borderRadius: "8px",
                                padding: "5px",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <Chord title={chord.title} xMarks={chord.xMarks} oMarks={chord.oMarks} strings={chord.strings} />
                        </div>
                    ))}
                </div>
            </div>
            <div
                ref={scrollContainerRef}
                style={{
                    display: "flex",
                    width: "100%",
                    overflow: "hidden",
                    overflowY: "hidden", 
                    marginBottom: 20,
                    height: "300px",
                    paddingTop: "20px",
                    background: "linear-gradient(90deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    position: "relative",
                }}
            >
                {/* 使用CSS动画的滚动容器 */}
                <div
                    style={{
                        display: "flex",
                        animation: isPlaying ? `scroll-left ${100 / scrollSpeed}s linear infinite` : "none",
                        transform: isPlaying ? "translateX(0)" : "translateX(0)",
                    }}
                >
                    {/* 使用 useMemo 优化渲染多倍的和弦列表以实现无缝循环 */}
                    {useMemo(() => 
                        Array.from({ length: 3 }).flatMap((_, repeatIndex) =>
                            displayChordList.map((chord, index) => (
                                <div
                                    key={`${chord.title}-${repeatIndex}-${index}`}
                                    style={{
                                        marginRight: "10vw",
                                        flexShrink: 0,
                                        minWidth: "120px",
                                        filter: `hue-rotate(${index * 30}deg)`,
                                    }}
                                >
                                    <Chord title={chord.title} xMarks={chord.xMarks} oMarks={chord.oMarks} strings={chord.strings} />
                                </div>
                            ))
                        ), [displayChordList]
                    )}
                </div>
            </div>
            {/* 底部控制栏 */}
            <div
                style={{
                    background: "#f5f5f5",
                    borderTop: "1px solid #ddd",
                    padding: "15px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
                }}
            >
                {/* 播放/暂停按钮 */}
                <button
                    onClick={togglePlay}
                    style={{
                        background: isPlaying ? "#ff4757" : "#007acc",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    {isPlaying ? "暂停" : "播放"}
                </button>

                {/* 当前播放的和弦 */}
                <div
                    style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        minWidth: "100px",
                    }}
                >
                    {displayChordList.length < 0 && "未播放"}
                </div>

                {/* 和弦切换速度控制 */}
                {/* <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <span style={{ fontSize: "14px", minWidth: "80px" }}>切换速度:</span>
                    <input
                        type="range"
                        min="500"
                        max="5000"
                        step="100"
                        value={playSpeed}
                        onChange={(e) => setPlaySpeed(Number(e.target.value))}
                        style={{ flex: 1 }}
                    />
                    <span style={{ fontSize: "12px", minWidth: "80px", color: "#666" }}>{(playSpeed / 1000).toFixed(1)}秒/次</span>
                </div> */}

                {/* 滚动速度控制 */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <span style={{ fontSize: "14px", minWidth: "80px" }}>滚动速度:</span>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={scrollSpeed}
                        onChange={(e) => setScrollSpeed(Number(e.target.value))}
                        style={{ flex: 1 }}
                    />
                    <span style={{ fontSize: "12px", minWidth: "60px", color: "#666" }}>{scrollSpeed}px/s</span>
                </div>
            </div>
        </div>
    );
}
