import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Chord } from "./components/Chord";
import { ChordData } from "./chords/type";
import { chords_awbz } from "./chords/chords_awbz";
import { chords_basic } from "./chords/chords_basic";

// 定义和弦数据类型

const SPEED_KEY = "scrollSpeed";

const chords = chords_basic
export default function App() {
    const [displayChordList, setDisplayChordList] = useState<ChordData[]>([]);
    const [scrollSpeed, setScrollSpeed] = useState<number>(parseInt(window.localStorage.getItem(SPEED_KEY) || "30", 10)); // 滚动速度 (像素/秒)
    useEffect(() => {
        window.localStorage.setItem(SPEED_KEY, scrollSpeed.toString());
    }, [scrollSpeed]);
    // 滚动容器引用
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // 获取随机和弦索引

    const initDisplayChordList = useCallback(() => {
        const list = [...chords];
        for (let i = 1; i < 5; i++) {
            list.push(...chords);
        }
        const randomList = list.sort(() => 0.5 - Math.random());
        setDisplayChordList(randomList);
    }, []);
    useEffect(() => {
        initDisplayChordList();
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
                        animation: `scroll-left ${100 / scrollSpeed}s linear infinite`,
                        transform: "translateX(0)",
                    }}
                >
                    {/* 使用 useMemo 优化渲染多倍的和弦列表以实现无缝循环 */}
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
                                        }}
                                    >
                                        <Chord title={chord.title} xMarks={chord.xMarks} oMarks={chord.oMarks} strings={chord.strings} />
                                    </div>
                                ))
                            ),
                        [displayChordList]
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
                <button
                    onClick={initDisplayChordList}
                    style={{
                        background: "#007acc",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                    }}
                >
                    换一组
                </button>

                {/* 滚动速度控制 */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                    <span style={{ fontSize: "14px", minWidth: "80px" }}>滚动速度:</span>
                    <input
                        type="range"
                        min="0"
                        max="3"
                        step="0.05"
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
