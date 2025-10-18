export function Chord(props: { title: string; xMarks: number[]; oMarks: number[]; strings: number[][] }) {
    // strings 数组格式: [品格号, 弦号] 
    // 例如: [2, 3] 表示第2品第3弦按下
    const fretMap = new Map<string, boolean>();
    props.strings.forEach(([fretNum, stringNum]) => {
        fretMap.set(`${fretNum}-${stringNum}`, true);
    });

    // 辅助函数：检查指定位置是否有按弦
    const hasFingerAt = (fretNum: number, stringNum: number): boolean => {
        return fretMap.has(`${fretNum}-${stringNum}`);
    };

    // 渲染品格行
    const renderFretRow = (fretNumber: number) => {
        const cells = [];
        // 从第6弦到第1弦排列，每个 Cell 显示两根弦的状态
        // Cell 的 leftDot 对应左边的弦，rightDot 对应右边的弦
        for (let stringNum = 6; stringNum >= 2; stringNum--) {
            const leftDot = hasFingerAt(fretNumber, stringNum);
            const rightDot = hasFingerAt(fretNumber, stringNum - 1);
            
            // 只在第一品格显示 x 和 o 标记
            const showXLeft = fretNumber === 1 ? props.xMarks.includes(stringNum) : false;
            const showOLeft = fretNumber === 1 ? props.oMarks.includes(stringNum) : false;
            const showXRight = fretNumber === 1 ? props.xMarks.includes(stringNum - 1) : false;
            const showORight = fretNumber === 1 ? props.oMarks.includes(stringNum - 1) : false;

            cells.push(
                <Cell 
                    key={`${fretNumber}-${stringNum}`}
                    showXLeft={showXLeft} 
                    showOLeft={showOLeft} 
                    showXRight={showXRight} 
                    showORight={showORight}
                    leftDot={leftDot}
                    rightDot={rightDot}
                />
            );
        }
        return cells;
    };

    return (
        <div style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: "bold", marginBottom: 20 }}>{props.title}</div>
            <ChordRow>
                {renderFretRow(1)}
            </ChordRow>
            <ChordRow>
                {renderFretRow(2)}
            </ChordRow>
            <ChordRow>
                {renderFretRow(3)}
            </ChordRow>
        </div>
    );
}
function ChordRow({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="row"
            style={{
                display: "flex",
            }}
        >
            {children}
        </div>
    );
}
function Cell(props: { showXLeft: boolean; showOLeft: boolean; showXRight: boolean; showORight: boolean; leftDot?: boolean; rightDot?: boolean }) {
    const leftText = props.showXLeft ? "x" : props.showOLeft ? "o" : "";
    const rightText = props.showXRight ? "x" : props.showORight ? "o" : "";
    return (
        <div className="cell" style={{ border: "1px solid black", width: "40px", height: "40px", position: "relative" }}>
            <div
                className="left"
                style={{
                    position: "absolute",
                    left: "-5px",
                    top: "-20px",
                    width: "10px",
                    height: "10px",
                }}
            >
                {leftText}
            </div>
            <div
                className="right"
                style={{
                    position: "absolute",
                    right: "-5px",
                    top: "-20px",
                    width: "10px",
                    height: "10px",
                }}
            >
                {rightText}
            </div>
            {props.leftDot && (
                <div
                    className="circle-left"
                    style={{
                        background: "black",
                        position: "absolute",
                        borderRadius: "50%",
                        left: "0%",
                        top: "50%",
                        width: "10px",
                        height: "10px",
                        transform: "translate(-50%,-50%)",
                    }}
                ></div>
            )}
            {props.rightDot && (
                <div
                    className="circle-right"
                    style={{
                        background: "black",
                        position: "absolute",
                        borderRadius: "50%",
                        right: "0%",
                        top: "50%",
                        width: "10px",
                        height: "10px",
                        transform: "translate(50%,-50%)",
                    }}
                ></div>
            )}
        </div>
    );
}
