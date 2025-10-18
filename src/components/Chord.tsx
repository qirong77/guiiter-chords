export function Chord(props: { title: string; xMarks: number[]; oMarks: number[]; strings: number[][] }) {
    return (
        <div style={{ width: 300, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: "26px", fontWeight: "bold", marginBottom: 20 }}>{props.title}</div>
            <ChordRow>
                <Cell showXLeft={props.xMarks.includes(6)} showOLeft={props.oMarks.includes(6)} />
                <Cell showXLeft={props.xMarks.includes(5)} showOLeft={props.oMarks.includes(5)} />
                <Cell showXLeft={props.xMarks.includes(4)} showOLeft={props.oMarks.includes(4)} />
                <Cell showXLeft={props.xMarks.includes(3)} showOLeft={props.oMarks.includes(3)} showORight={props.oMarks.includes(2)} />
                <Cell showXLeft={props.xMarks.includes(2)} showXRight={props.xMarks.includes(1)} showORight={props.oMarks.includes(1)} />
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
                    className="circle"
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
        </div>
    );
}
