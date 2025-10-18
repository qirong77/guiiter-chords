export function Chord(props: { title: string; xMarks: number[]; oMarks: number[]; strings: number[][] }) {
    return (
        <div style={{ width: 250, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: "bold", marginBottom: 20 }}>{props.title}</div>
            {/* 第一格处理左右，其他格只处理右 */}
            <ChordRow>
                <Cell
                    showXLeft={props.xMarks.includes(6)}
                    showXRight={props.xMarks.includes(5)}
                    showOLeft={props.oMarks.includes(6)}
                    showORight={props.oMarks.includes(5)}
                    leftDot={props.strings.some(([fret, string]) => fret === 1 && string === 6)}
                    rightDot={props.strings.some(([fret, string]) => fret === 1 && string === 5)}
                />
                <Cell
                    showXLeft={false}
                    showXRight={props.xMarks.includes(4)}
                    showOLeft={false}
                    showORight={props.oMarks.includes(4)}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 1 && string === 4)}
                />
                <Cell
                    showXLeft={false}
                    showXRight={props.xMarks.includes(3)}
                    showOLeft={false}
                    showORight={props.oMarks.includes(3)}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 1 && string === 3)}
                />
                <Cell
                    showXLeft={false}
                    showXRight={props.xMarks.includes(2)}
                    showOLeft={false}
                    showORight={props.oMarks.includes(2)}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 1 && string === 2)}
                />
                <Cell
                    showXLeft={false}
                    showXRight={props.xMarks.includes(1)}
                    showOLeft={false}
                    showORight={props.oMarks.includes(1)}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 1 && string === 1)}
                />
            </ChordRow>
            <ChordRow>
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={props.strings.some(([fret, string]) => fret === 2 && string === 6)}
                    rightDot={props.strings.some(([fret, string]) => fret === 2 && string === 5)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 2 && string === 4)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 2 && string === 3)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 2 && string === 2)}
                />
                <Cell
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 2 && string === 1)}
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                />
            </ChordRow>
            <ChordRow>
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={props.strings.some(([fret, string]) => fret === 3 && string === 6)}
                    rightDot={props.strings.some(([fret, string]) => fret === 3 && string === 5)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 3 && string === 4)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 3 && string === 3)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 3 && string === 2)}
                />
                <Cell
                    showXLeft={false}
                    showOLeft={false}
                    showXRight={false}
                    showORight={false}
                    leftDot={false}
                    rightDot={props.strings.some(([fret, string]) => fret === 3 && string === 1)}
                />
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
function Cell(props: { showXLeft: boolean; showOLeft: boolean; showXRight: boolean; showORight: boolean; leftDot: boolean; rightDot?: boolean }) {
    const leftText = props.showXLeft ? "x" : props.showOLeft ? "o" : "";
    const rightText = props.showXRight ? "x" : props.showORight ? "o" : "";
    return (
        <div className="cell" style={{ border: "1px solid black", width: "26px", height: "38px", position: "relative" }}>
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
                    className="circle"
                    style={{
                        background: "black",
                        position: "absolute",
                        borderRadius: "50%",
                        left: "0%",
                        top: "50%",
                        width: "16px",
                        height: "16px",
                        transform: "translate(-50%,-50%)",
                    }}
                ></div>
            )}
            {props.rightDot && (
                <div
                    className="circle"
                    style={{
                        background: "black",
                        position: "absolute",
                        borderRadius: "50%",
                        right: "0%",
                        top: "50%",
                        width: "16px",
                        height: "16px",
                        transform: "translate(50%,-50%)",
                    }}
                ></div>
            )}
        </div>
    );
}
