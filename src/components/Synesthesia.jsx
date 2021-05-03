import React, { useEffect, useState, useContext } from 'react';
import {SynesthesiaContext} from "./SynesthesiaContext";
import SynesthesiaCanvas from "./SynesthesiaCanvas";
import Spinner from "./Spinner";

const Synesthesia = ({ match }) => {

  const { kntxt } = useContext(SynesthesiaContext);
  const [ artObj, setArtObj ] = useState({});

  const artObjID = match.params.id;


  


  useEffect(() => {
    const getObj = async id => {
      let objDataJSON = await kntxt.metAPI.getObj(id);
      setArtObj(objDataJSON);
    }

    getObj(artObjID);
  }, [setArtObj, kntxt, artObjID]);

  return (
    <div className="synesthesia">
      { artObj !== {} ? (
        <div>
          <h1>{ artObj.title }</h1>
          <SynesthesiaCanvas imgURL={ artObj.primaryImage } />
        </div>
      )  : <Spinner /> }

    </div>
  );
};

export default Synesthesia;