import React, { useEffect, useContext, useState } from 'react';
import {SynesthesiaContext} from '../SynesthesiaContext'
import ArtObject from './ArtObject';

const ArtObjSharing = ({ match }) => {

  const { kntxt } = useContext(SynesthesiaContext);
  const [readyToFetch , setReadyToFetch ] = useState(true);
  const [ obj, setObj ] = useState(null);

  // replace readyToFetch with proper hook logic
  useEffect(() => {
    const getObj = async id => {
      let objJSON = await kntxt.metAPI.getObj(id);
      setObj(objJSON);
      setReadyToFetch(false);
      console.log(objJSON);
    }
    if(readyToFetch) getObj(match.params.id)
  })

  return (
    <>
      { obj ? <ArtObject obj={obj} /> : <h3>Object Loading...</h3> }
    </>
  );
};

export default ArtObjSharing;