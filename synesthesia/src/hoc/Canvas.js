import React, {useRef,useEffect} from 'react';

const canvas = props => {
    const canvasRef = useRef(null);

    useEffect(()=> {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    })
    

    return (
        <canvas ref={canvasRef}{...props}></canvas>
    )
}


export default canvas;