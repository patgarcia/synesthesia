import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Spinner from './Spinner'


const Intro = () => {

  const [ images, setImages ] = useState(null);
  const [ readyToFetch, setReadyToFetch ] = useState(null);

  const randImg = listLength => Math.floor(Math.random() * listLength);

  useEffect(()=> {
    if(!readyToFetch){
      fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=false&hasImages=true&departmentId=11&q=‎a")
      .then(res => res.json())
      .then(res => { return setImages(res.objectIDs)})
      setReadyToFetch(r => !r)
    }

  }, [readyToFetch])

  return (
    <div className="intro">
      <h2>This is an experimental gallery that uses art data from
      The Metropolitan Museum of Art. </h2>
      
      <p>Use the department menu in the
      top right to browse the gallery and click on the art cards to 
      reveal more information. To begin the synesthetic experience
      just click on the <b>𝄞</b> located on the flipside of each card.
      </p>
      <hr></hr>
      <h3>{ images ? "Jump directly to the experience with a random image" : "Selecting a random image..."}</h3>
      { images ? 
      (<Link to={`/s/${ images[randImg(images.length)] }`}>
        <button>Experience Synesthesia 𝄞</button>
      </Link>) : <Spinner />
      }
      

    </div>
  );
};

export default Intro;