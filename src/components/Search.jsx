import React, { useState } from 'react';


//https://collectionapi.metmuseum.org/public/collection/v1/search?q=m&artistOrCulture=true&hasImages=true
const Search = () => {

  const handleFocus = ev => ev.target.placeholder = '';

  const randMsg = msgArr => msgArr[Math.floor(Math.random() * msgArr.length)];

  const blurMessages = [
    "Who is your favorite artist?",
    "Think of a culture...",
    "Name a paiting you like",
  ]

  const [searchMsg, setSearchMsg ] = useState(randMsg(blurMessages))

  const handleBlur = ev => {
    if(!ev.target.value) {
      let prevMsg = ev.target.placeholder;
      let newMsg = randMsg(blurMessages);
      while(prevMsg === newMsg){
        newMsg = randMsg(blurMessages);
      }
      ev.target.placeholder = newMsg;
    };
  }

  return (
    <div className="search-area">
      <input type="text" 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        // onChange={ handleChange } 
        placeholder={ searchMsg ? searchMsg : '' } />
    </div>
  );
};

export default Search;