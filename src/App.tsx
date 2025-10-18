import { Chord } from "./components/Chord";

export default function App() {
    return (
        <div style={{ padding: "20px" }}>
            <Chord
                title="Am"
                mark={["x", "o", "", "", "o"]}
                strings={[
                    [2, 1], // 第2品第1弦（从左数第2根弦）
                    [2, 2], // 第2品第2弦
                ]}
            />
        </div>
    );
}
