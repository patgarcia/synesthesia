import React, { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

const SynesthesiaCanvas = ( { imgURL } ) => {

  const canvasRef = useRef(null);
  const [ ctxState, setCtxState ] = useState({});

  const startSound = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination()
    synth.triggerAttackRelease("C4", "8n");
  };

  const getPixelColor = () => console.log("PIXEL COLOR",ctxState.getImageData(50,50,1,1));




  

  useEffect(() => {

    const prepareSoundCanvas = (imgURL) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = function(){
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        ctx.drawImage(img, 0, 0)
        setCtxState(ctx);
      }
      img.src = imgURL;
      console.log(imgURL, canvasRef.current)
    }

    prepareSoundCanvas(imgURL)
  }, [imgURL])

  return (
    <div>
      <canvas onClick={ getPixelColor }  ref={canvasRef}></canvas>
      <button onClick={ startSound }>start sound</button>
    </div>
      
  );
};

export default SynesthesiaCanvas;