import { ChordData } from "./type";

export const chords_song1: ChordData[] = [
    {
        title: "C9",
        xMarks: [6],
        oMarks: [3, 1],
        strings: [
            [2, 4], 
            [3, 2], 
            [3, 5], 

        ],
    },
    {
        title: "Em7/B",
        xMarks: [],
        oMarks: [6, 3, 2, 1],
        strings: [
            [2, 4], // 第2品第4弦
            [4, 5], // 第4品第5弦
        ],
    },
    {
        title: "Em7/bB",
        xMarks: [],
        oMarks: [6, 3, 2, 1],
        strings: [
            [1, 4], // 第1品第4弦
            [3, 5], // 第3品第5弦
        ],
    },
    {
        title: "Am7",
        xMarks: [6],
        oMarks: [5, 3, 2, 1],
        strings: [
            [2, 4], // 第2品第4弦
        ],
    },
    {
        title: "Dm7",
        xMarks: [5, 6],
        oMarks: [4, 3],
        strings: [
            [1, 1], // 第1品第1弦
            [2, 2], // 第2品第2弦
        ],
    },
    {
        title: "Gsus4",
        xMarks: [6, 5],
        oMarks: [4, 3, 2],
        strings: [
            [3, 1], // 第3品第1弦
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
        title: "E7",
        xMarks: [],
        oMarks: [6, 5, 3, 2, 1],
        strings: [
            [1, 4], // 第1品第4弦
        ],
    },
];