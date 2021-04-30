import React, { useContext, useEffect, useState } from 'react';
import { SynesthesiaContext } from '../SynesthesiaContext';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import './MET.css';
import { slugify } from '../../Tools';
import memoizeOne from 'memoize-one';

const Departments = React.memo(({ toggleMenu, showingMenu }) => {

  const [ deptsData, setDetptsData ] = useState([]);
  const { kntxt } = useContext(SynesthesiaContext);

  useEffect(() => {
    const getDepts = async () => {
      let depts = await kntxt.metAPI.getDepartments()
      setDetptsData(depts.departments)
    };
    const memoGetDepts = memoizeOne(getDepts)
    memoGetDepts();
  }, [kntxt]);
  
  return (
    <div className="met-depts" onClick={ toggleMenu } style={ !showingMenu ? {top: -10000} : {}}>
      {
        deptsData.length ? deptsData.map(
          dept => <Link key={dept.departmentId} to={"/d/"+slugify(dept.displayName)}>{dept.displayName}</Link>
          ) : <Spinner />
      }
    </div>
  );
});



export default Departments;