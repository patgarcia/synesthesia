import React, { useEffect, useRef, useState } from 'react';
import { RGBAToHSLA } from '../Tools';
import * as Tone from 'tone';

const SynesthesiaCanvas = ( { imgURL } ) => {

  const [color, setColor] = useState(null);
  const [ mouse, setMouse ] = useState(null)
  const [synth, setSynth ] = useState(null)

  // https://stackoverflow.com/a/43881141/5727431
  const proxy = process.env.REACT_APP_PROXY;

  const canvasRef = useRef(null);
  const colorSquareRef = useRef(null);
  const [ ctxState, setCtxState ] = useState({});

  const startSound = async () => {
    await Tone.start();
    
    const synthObj = new Tone.FMSynth().toDestination();
    setSynth(synthObj)
  };


  const getPixelColor = (ev) => {
    let {pageX:x, pageY:y} = ev;
    
    if(canvasRef.current.offsetParent){
      const { offsetLeft, offsetTop } = canvasRef.current;
      x -= offsetLeft;
      y -= offsetTop;
    }
    const [r, g, b, a] = ctxState.getImageData(x,y,1,1).data;
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    const [h] = RGBAToHSLA(r, g, b, a);
    const soundFreq = h * 1.23 + 440;
    synth.triggerAttackRelease(1 + soundFreq, "1n");
    setMouse({x,y})
  };
  

  useEffect(() => {

    const prepareSoundCanvas = (imgURL) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function(){
        const proportionedHeight = (this.naturalHeight * window.innerWidth) / this.naturalWidth
        canvas.width = window.innerWidth;
        canvas.height = proportionedHeight;
        ctx.drawImage(img, 0, 0, canvas.width, proportionedHeight)
        setCtxState(ctx);
      }
      img.src = proxy + imgURL;
    }

    if(imgURL) prepareSoundCanvas(imgURL)
  }, [imgURL, proxy])

  return (
    <div>
      <div ref={colorSquareRef} className="color-square" style={color ? {background: color, top: mouse.y + 150 - window.scrollY, left: mouse.x + 40 -  window.scrollX  } : {}}></div>
      <canvas id="synth-canvas" onMouseMove={ getPixelColor }  ref={canvasRef}></canvas>

          <div className="modal" style={ synth ? {display: 'none'} : {}}>
            <p>Click start and move your mouse over the image to experience the sound of each color.</p>
            <button onClick={ startSound }>Start Synesthesia</button>
          </div>
      
    </div>
      
  );
};

export default SynesthesiaCanvas;