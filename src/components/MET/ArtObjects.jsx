import React, { useState, useContext, useEffect } from 'react';
import memoizeOne from 'memoize-one';
import ArtObject from './ArtObject';
import {SynesthesiaContext} from '../SynesthesiaContext';
import Spinner from '../Spinner';

const ArtObjects = ({ ids }) => {
  const cuttoff = 10;

  const [ metObjs, setMetObjs ] = useState([]);
  const [ idsState, setIdsState ] = useState(ids);
  const { kntxt } = useContext(SynesthesiaContext);

  async function getObjs(){
    let [ tempIds, restIds ] = [idsState.slice(0, cuttoff), idsState.slice(cuttoff)];
    let objs = await kntxt.metAPI.getObjs(tempIds);
    setMetObjs([...metObjs, ...objs]);
    setIdsState(restIds)
  }

  useEffect(() => {
    getObjs(cuttoff)
  },[]);


  return (
    <div className="art-objects-container">
      {
        metObjs.length ? metObjs.map(obj => <ArtObject obj={obj} key={obj.id} />) : <Spinner />
      }
      { idsState.length ? <button onClick={getObjs}>GET { idsState.length < cuttoff ? idsState.length : cuttoff } MORE</button> : <button className="all-done">ALL DONE</button>}
    </div>
  );
};

export default ArtObjects;