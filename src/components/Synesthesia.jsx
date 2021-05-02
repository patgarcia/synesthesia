import React, { useEffect, useState, useContext, useCallback } from 'react';
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
      console.log(objDataJSON);
      setArtObj(objDataJSON);
    }

    getObj(artObjID);
  }, [setArtObj, kntxt, artObjID]);

  return (
    <div className="synesthesia">
      <h1>X: { match.params.id }</h1>
      { artObj !== {} ? (
        <div>
          <SynesthesiaCanvas imgURL={ artObj.primaryImageSmall } />
        </div>
      )  : <Spinner /> }

    </div>
  );
};

export default Synesthesia;