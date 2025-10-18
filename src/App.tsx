import { Chord } from "./components/Chord";

export default function App() {
    return (
        <div style={{ padding: "20px" }}>
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
        </div>
    );
}
