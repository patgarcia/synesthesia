import React, { useState, useContext, useEffect } from 'react';
import ArtObject from './ArtObject';
import {SynesthesiaContext} from '../SynesthesiaContext';
import Spinner from '../Spinner';

function useOnScreen(options){
  const [ ref, setRef ] = useState(null);
  const [ visible, setVisible ] = useState(false);

  useEffect(() => { 
    const observer = new IntersectionObserver(([ entry ]) => {
      setVisible(entry.isIntersecting)
    }, options )

    if(ref) {
      observer.observe(ref);
    }

    return () => {
      if(ref){
        observer.unobserve(ref)
      }
    }

  }, [ref, options]);

  return [setRef, visible]
}

const ArtObjects = ({ ids }) => {


  const [ setRef, visible ] = useOnScreen({ rootMargin: "-100px"})

  const cuttoff = 10;

  const [ metObjs, setMetObjs ] = useState([]);
  const [ idsState, setIdsState ] = useState(ids);
  const [ readyToFetch, setReadyToFetch ] = useState(true);
  const { kntxt } = useContext(SynesthesiaContext);

  useEffect(() => {
    const getObjs = async() => {
      if(idsState.length){
        let [ tempIds, restIds ] = [idsState.slice(0, cuttoff), idsState.slice(cuttoff)];
        let objs = await kntxt.metAPI.getObjs(tempIds);
        console.log(objs[0]);
        setMetObjs([...metObjs, ...objs]);
        setIdsState(restIds)
        setReadyToFetch(true);
      }
      else{ console.log("trying to run fetch but no ids avail") }
    };
    if(visible && readyToFetch) {
      setReadyToFetch(false);
      getObjs()
    }
  }, [visible, idsState, kntxt, metObjs, readyToFetch]);


  return (
    <div className="art-objects-container">
      {
        metObjs.length ? metObjs.map((obj, i) => <ArtObject  key={ i } obj={ obj } timeOffsetIndex={ i % cuttoff } />) : ''
      }
      <p ref={ setRef } id="sentinel" key="sentinel">⎯⎯⎯⎯⎯⎯ { idsState.length ? idsState.length +  " Art" : "No" } Objects Left To Load ⎯⎯⎯⎯⎯⎯</p>
      { idsState.length && !readyToFetch ? <Spinner /> : ''}
    </div>
  );
};

export default ArtObjects;