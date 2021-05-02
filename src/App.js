import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import { SynesthesiaContext } from './components/SynesthesiaContext.jsx';
import './App.css';
import { slugify, getQueryParamStr, asciiLower } from './Tools';

function App() {

  const [ paintingData, setPaintingData ] = useState({});
  const [ metDepts,  setMetDepts ] = useState([]);
  const [ multiRes, setMultiRes ] = useState(new Set());

  // API TOOLS

    // MET API Structure
    const metAPI = {
      url: 'https://collectionapi.metmuseum.org/public/collection/v1/',
      endpoints: [ 'objects', 'object', 'departments', 'search' ],
      getURL: function(endpoint, queryParams){
        let queryParamStr = getQueryParamStr(queryParams);
        return this.url + endpoint + (queryParamStr ?  '?' + queryParamStr : '')
      },
      callEndpoint: async function(enpoint, queryParams=null){
        console.log("FETCHING: %s", this.getURL(enpoint, queryParams))
        return fetch(this.getURL(enpoint, queryParams))
          .then(res => res.json())
          .then(res => res)
      },
      getDepartments: async function(stateObjSetter){
        let res = await this.callEndpoint('departments');
        res.departments.forEach(dept => {
          let slug = slugify(dept.displayName);
          dept.slug = slug;
        });
        return res;
      },
      getDepartmentObjectIDs: async function(deptKey){
        let dataSetPromiseArr = [];
        asciiLower().forEach( async (letter, i) => {
          dataSetPromiseArr.push(
            this.callEndpoint('search', 
            {isHighlight: true, departmentId:deptKey, hasImages:true, q:letter}
          ));
        })
        return Promise.all(dataSetPromiseArr).then(
          values => {
            let dataSetArr = [];
            let objIDset = new Set();
            values.forEach( res => {
              if(res.objectIDs){
                res.objectIDs.forEach((e,j) => {
                  if(!objIDset.has(e)) {
                    dataSetArr.push(e );
                  }
                  objIDset.add(e);
                })
              }
            })
            return dataSetArr;
          }
        )
      },
      getObj: async function(objId){
        let res = await this.callEndpoint(`objects/${objId}`);
        return res
      },
      getObjs: async function(objsIDArr){
        let objs = await Promise.all(objsIDArr.map(async objID => await kntxt.metAPI.getObj(objID)))
        return objs
      },
      getDeptObjsBySlug: async function(slug){
        let depts = await this.callEndpoint('departments');
        let dept = depts.departments.filter(dept => {
          let deptSlug = slugify(dept.displayName);
          return deptSlug === slug
        }).pop();
        return dept.departmentId
        
      }
    }

  const kntxt = {
    ...{ metAPI },
    ...{ paintingData, setPaintingData },
    ...{ metDepts,  setMetDepts },
    ...{ multiRes, setMultiRes },
  }

  return (
    <SynesthesiaContext.Provider value={{ kntxt }}>
      <div className="App">
        <Header />
        <Route path="/" component={ Main } />
      </div>
    </SynesthesiaContext.Provider>
  );
}

export default App;
