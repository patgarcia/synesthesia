import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import linkSVG from  '../../static/link.svg'

const ArtObject = React.memo(({ obj, timeOffsetIndex }) => {
    const [cardOpen, setCardOpen] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [ hideCard, setHideCard ] = useState(true);

    useEffect(() => {
      setTimeout(() => setHideCard(false), timeOffsetIndex * 300);
    }, [setHideCard, timeOffsetIndex])

    return (
        // the 250 in the setTimeout represent half the time of the css animation flip
        <div
            key={ obj.objectID }
            className={'art-obj-card' + (hideCard ? '' : (cardOpen ? ' flip' : ' flop'))}
            onClick={() => {
                setCardOpen(!cardOpen);
                setTimeout(() => setShowInfo(!showInfo), 125);
            }}
            style={( hideCard ? {opacity: 0} : {})}
        >
            <img draggable="true" alt={obj.title} src={obj.primaryImageSmall} />
            {showInfo ? (
                <div className="art-obj-info">
                    <Link to={`/art-object/${ obj.objectID }`}><img id="link-icon" alt="Link icon" src={linkSVG} /></Link>
                    <h3>{obj.title}</h3>
                    <h4>{obj.objectDate}</h4>
                    <h5>{obj.culture}</h5>
                    <ul className="art-medium">
                        <li>
                            <strong>Medium:</strong> {obj.medium}
                        </li>
                        <li>
                            <strong>Classification</strong> {obj.classification}
                        </li>
                    </ul>
                    {obj.artistDisplayBio ? (
                        <ul>
                          <h4>{ obj.artistDisplayName }</h4>
                            <p className="artist-dates">( { obj.artistBeginDate } - { obj.artistEndDate })</p>
                            <p>{ obj.artistDisplayBio }</p>
                            <p>{ obj.artistNationality }</p>
                        </ul>
                    ) : (
                        ''
                    )}

                    {/* { Object.entries(obj).map(([key, val]) => <p><strong>{key}</strong>{val}</p>)} */}
                </div>
            ) : (
                ''
            )}
        </div>
    );
});

export default ArtObject;
