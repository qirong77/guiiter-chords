export function Chord(props: { title: string; mark: string[]; strings: number[][] }) {
    return (
        <div style={{width:300,display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div style={{fontSize:'26px',fontWeight:'bold',marginBottom:20}}>{props.title}</div>
            <ChordRow>
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
            </ChordRow>
            <ChordRow>
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
            </ChordRow>
            <ChordRow>
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
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
function Cell() {
    return (
        <div className="cell" style={{ border: "1px solid black", width: "40px", height: "40px", position: "relative" }}>
            <div className="x" style={{
                position:'absolute',
                left:'-5px',
                top:'-20px',
                width:'10px',
                height:'10px'
            }}>x</div>
            <div className="o" style={{
                position:'absolute',
                right:'-5px',
                top:'-20px',
                width:'10px',
                height:'10px'
            }}>o</div>
            <div className="circle" style={{
                background:'black',
                position:'absolute',
                borderRadius:'50%',
                left:'0%',
                top:'50%',
                width:'10px',
                height:'10px',
                transform:'translate(-50%,-50%)'
            }}></div>
        </div>
    );
}
