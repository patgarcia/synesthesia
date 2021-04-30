import React, { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { SynesthesiaContext } from '../SynesthesiaContext';
import ArtObjects from './ArtObjects';
import Spinner from '../Spinner';

const DepartmentDetails = ({match}) => {

  const [ objIDs, setObjsIDs ] = useState([]);
  const [ deptsData, setDetptsData ] = useState([]);

  const {kntxt} = useContext(SynesthesiaContext);

  const slug = match.params.dept;  


  useEffect(() => { 
    setObjsIDs([]);

    // Get Department Names
    const getDepts = async () => {
      let depts = await kntxt.metAPI.getDepartments();
      setDetptsData(depts.departments);
    };
    getDepts();

    // Get Department Objects
    const getDeptObjs = async () => {
      let deptID = await kntxt.metAPI.getDeptObjsBySlug(slug);
      let deptObjIDs = await kntxt.metAPI.getDepartmentObjectIDs(deptID);
      setObjsIDs(await Promise.all(deptObjIDs));
    };
    getDeptObjs();

   } , [kntxt, slug]);


  return (
    <div>
      { deptsData.length ? (
          deptsData.filter( dept => dept.slug === slug)
          .map((dept, key) => (
            <h1 key={ key }>{dept.displayName}</h1>
          ))
      ) : <Spinner /> }

      {
        objIDs.length ? <ArtObjects ids={ objIDs } setids={ setObjsIDs } /> : <Spinner />
      }


    </div>
  );
};

export default DepartmentDetails;