import { useState, useEffect, useRef } from "react";
import { Chord } from "./components/Chord";

// 定义和弦数据类型
interface ChordData {
    title: string;
    xMarks: number[];
    oMarks: number[];
    strings: [number, number][];
}
const SPEED_KEY = 'scrollSpeed';
export default function App() {
    // 状态管理
    const [currentChordIndex, setCurrentChordIndex] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playSpeed, setPlaySpeed] = useState<number>(2000); // 播放速度(毫秒)
    const [displayChordList, setDisplayChordList] = useState<ChordData[]>([]);
    const [scrollPosition, setScrollPosition] = useState<number>(0); // 滚动位置
    const [scrollSpeed, setScrollSpeed] = useState<number>(parseInt(window.localStorage.getItem(SPEED_KEY) || "30", 10)); // 滚动速度 (像素/秒)
    useEffect(()=>{
        window.localStorage.setItem(SPEED_KEY, scrollSpeed.toString());
    },[scrollSpeed])
    // 滚动容器引用
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();
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
        setScrollPosition(0);
        const list = [];
        // 创建更多和弦来支持连续滚动
        for (let i = 0; i < 20; i++) {
            list.push(chords[Math.floor(Math.random() * chords.length)]);
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

    // 连续滚动动画
    useEffect(() => {
        let lastTime = 0;
        
        const animate = (currentTime: number) => {
            if (lastTime === 0) lastTime = currentTime;
            const deltaTime = currentTime - lastTime;
            
            if (isPlaying && scrollContainerRef.current) {
                setScrollPosition(prev => {
                    const newPosition = prev + (scrollSpeed * deltaTime / 1000);
                    // 计算单个列表的总宽度（包括间距）
                    const singleListWidth = displayChordList.length * (120 + 30); // 120px宽度 + 30px间距
                    // 当滚动到一半时重置到开始，实现无缝循环
                    return newPosition >= singleListWidth ? newPosition - singleListWidth : newPosition;
                });
            }
            
            lastTime = currentTime;
            
            if (isPlaying) {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };
        
        if (isPlaying && displayChordList.length > 0) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }
        
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isPlaying, scrollSpeed, displayChordList.length]);

    // 应用滚动位置
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollPosition;
        }
    }, [scrollPosition]);
    useEffect(()=>{
      togglePlay()
    },[])
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
                                // border: currentChordIndex === index ? "3px solid #007acc" : "1px solid transparent",
                                borderRadius: "8px",
                                padding: "5px",
                                // background: currentChordIndex === index ? "#f0f8ff" : "transparent",
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
                    overflow: "hidden", // 隐藏滚动条，实现无缝效果
                    overflowY: "hidden",
                    marginBottom: 20,
                    height:'300px',
                    paddingTop:'20px',
                    background: "linear-gradient(90deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)",
                    border: "1px solid #e0e0e0",
                    borderRadius: "8px",
                    position: "relative",
                }}
            >
                {/* 渲染两倍的和弦列表以实现无缝循环 */}
                {[...displayChordList, ...displayChordList].map((chord, index) => {
                    const actualIndex = index % displayChordList.length;
                    
                    return (
                        <div
                            key={`${chord.title}-${index}`}
                            style={{
                                marginRight: '10vw',
                                flexShrink: 0,
                                minWidth: "120px", // 确保每个和弦有固定宽度
                                filter: `hue-rotate(${actualIndex * 30}deg)`,
                            }}
                        >
                            <Chord 
                                title={chord.title} 
                                xMarks={chord.xMarks} 
                                oMarks={chord.oMarks} 
                                strings={chord.strings} 
                            />
                        </div>
                    );
                })}
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
                    {currentChordIndex >= 0 ? `当前: ${chords[currentChordIndex].title}` : "未播放"}
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
                        min="50"
                        max="500"
                        step="5"
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
