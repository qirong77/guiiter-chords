import { useState, useEffect, useRef } from "react";
import { Chord } from "./components/Chord";

// 定义和弦数据类型
interface ChordData {
    title: string;
    xMarks: number[];
    oMarks: number[];
    strings: [number, number][];
}

export default function App() {
    // 状态管理
    const [currentChordIndex, setCurrentChordIndex] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playSpeed, setPlaySpeed] = useState<number>(2000); // 播放速度(毫秒)
    const [displayChordList, setDisplayChordList] = useState<ChordData[]>([]);

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
    const getRandomChordIndex = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * chords.length);
        } while (newIndex === currentChordIndex && chords.length > 1);
        return newIndex;
    };
    const initDisplayChordList = () => {
        setDisplayChordList([]);
        const list = [];
        for (let i = 0; i < 10; i++) {
            list.push(chords[getRandomChordIndex()]);
        }
        setDisplayChordList(list);
    };
    // 播放控制函数
    const togglePlay = () => {
        if (!isPlaying) {
            initDisplayChordList();
        }
        setIsPlaying(!isPlaying);
        if (!isPlaying && currentChordIndex === -1) {
            setCurrentChordIndex(getRandomChordIndex());
        }
    };

    // 自动播放效果
    useEffect(() => {
        let interval: number;

        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentChordIndex(getRandomChordIndex());
            }, playSpeed);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, playSpeed, currentChordIndex]);
    useEffect(() => {
        setDisplayChordList((v) => {
            return [...v, chords[currentChordIndex]].filter(Boolean);
        });
    }, [currentChordIndex]);

    // 自动滚动到最新的和弦
    useEffect(() => {
        if (scrollContainerRef.current && displayChordList.length > 0) {
            // 滚动到最右侧（最新的和弦）
            scrollContainerRef.current.scrollTo({
                left: scrollContainerRef.current.scrollWidth,
                behavior: "smooth",
            });
        }
    }, [displayChordList]);
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 300, overflow: "scroll", border: "1px solid #5b5656ff", marginBottom: 20 }}>
                {/* 和弦显示区域 */}
                <div
                    style={{
                        flex: 1,
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
                                border: currentChordIndex === index ? "3px solid #007acc" : "1px solid transparent",
                                borderRadius: "8px",
                                padding: "5px",
                                background: currentChordIndex === index ? "#f0f8ff" : "transparent",
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
                    overflow: "scroll",
                    overflowY: "hidden", // 只允许水平滚动
                    scrollbarWidth: "thin", // Firefox 细滚动条
                    padding: "10px 0",
                    background: "#fafafa",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                }}
            >
                {displayChordList.map((chord, index) => (
                    <div
                        key={`${chord.title}-${index}`}
                        style={{
                            marginRight: 8,
                            flexShrink: 0, // 防止和弦被压缩
                            opacity: index === displayChordList.length - 1 ? 1 : 0.7, // 最新的和弦高亮
                            transform: index === displayChordList.length - 1 ? "scale(1.05)" : "scale(1)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Chord title={chord.title} xMarks={chord.xMarks} oMarks={chord.oMarks} strings={chord.strings} />
                    </div>
                ))}
            </div>
            {/* 底部控制栏 */}
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
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
                    {currentChordIndex >= 0 ? `当前: ${chords[currentChordIndex].title}` : "未播放"}
                </div>

                {/* 速度控制 */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <span style={{ fontSize: "14px", minWidth: "60px" }}>速度:</span>
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
                </div>
            </div>
        </div>
    );
}
