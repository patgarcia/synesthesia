import React, { useState } from 'react';

const ArtObject = React.memo(({ obj }) => {

  const [ cardOpen, setCardOpen ] = useState(false);

  return (
    <div className={'art-obj-card' + ( cardOpen ? ' flip' : ' flop' )} onClick={() => setCardOpen(!cardOpen)}>
        <img draggable="true" alt={obj.title} src={obj.primaryImageSmall} />
    </div>
  );
});

export default ArtObject;
