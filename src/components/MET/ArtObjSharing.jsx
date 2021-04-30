import React, { useEffect, useContext, useState } from 'react';
import {SynesthesiaContext} from '../SynesthesiaContext'
import ArtObject from './ArtObject';

const ArtObjSharing = ({ match }) => {

  const { kntxt } = useContext(SynesthesiaContext);
  const [ obj, setObj ] = useState({});

  useEffect(() => {
    const getObj = async id => {
      let objJSON = await kntxt.metAPI.getObj(id);
      setObj(objJSON);
    }
    getObj(match.params.id)
  })

  return (
    <>
      { obj ? <ArtObject obj={obj} /> : <h3>Object Loading...</h3> }
    </>
  );
};

export default ArtObjSharing;