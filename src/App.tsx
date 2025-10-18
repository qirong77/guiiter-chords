import { Chord } from "./components/Chord";

export default function App() {
    return (
        <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "30px" }}>
            {/* Em 和弦 */}
            <Chord
                title="Em"
                xMarks={[]}
                oMarks={[6, 3, 2, 1]}
                strings={[
                    [2, 4], // 第2品第4弦
                    [2, 5], // 第2品第5弦
                ]}
            />
            {/* E 和弦 */}
            <Chord
                title="E"
                xMarks={[]}
                oMarks={[6, 2, 1]}
                strings={[
                    [1, 3], // 第1品第3弦
                    [2, 4], // 第2品第4弦
                    [2, 5], // 第2品第5弦
                ]}
            />

            {/* Am 和弦 */}
            <Chord
                title="Am"
                xMarks={[6]}
                oMarks={[2, 1]}
                strings={[
                    [1, 2],
                    [2, 3], // 第2品第3弦
                    [2, 4], // 第2品第4弦
                ]}
            />
            {/* A 和弦 */}
            <Chord
                title="A"
                xMarks={[6]}
                oMarks={[2, 1]}
                strings={[
                    [2, 2],
                    [2, 3], // 第2品第3弦
                    [2, 4], // 第2品第4弦
                ]}
            />
            <Chord
                title="Dm"
                xMarks={[5, 6]}
                oMarks={[4]}
                strings={[
                    [1, 1], // 第1品第1弦
                    [2, 3], // 第2品第3弦
                    [3, 2], // 第3品第2弦
                ]}
            />
            <Chord
                title="D"
                xMarks={[5, 6]}
                oMarks={[4]}
                strings={[
                    [2, 1], // 第1品第1弦
                    [2, 3], // 第2品第3弦
                    [3, 2], // 第3品第2弦
                ]}
            />
            {/* G 和弦 */}
            <Chord
                title="G"
                oMarks={[ 2, 3, 4]}
                xMarks={[]}
                strings={[
                    [2, 5], // 第2品第5弦
                    [3, 6], // 第3品第6弦
                    [3, 1], // 第3品第1弦
                ]}
            />
            {/* C 和弦 */}
            <Chord
                title="C"
                xMarks={[6]}
                oMarks={[1, 3]}
                strings={[
                    [1, 2], // 第1品第2弦
                    [2, 4], // 第2品第4弦
                    [3, 5], // 第3品第5弦
                ]}
            />

            <Chord
                title="Fmaj7"
                xMarks={[6,5]}
                oMarks={[1]}
                strings={[
                    [1, 2], 
                    [2, 3], 
                    [3, 4], 
                ]}
            />
        </div>
    );
}
