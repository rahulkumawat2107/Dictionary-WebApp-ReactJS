import React from 'react'
import ReactTooltip from 'react-tooltip';

function Word(props) {
    return (
        <span onMouseOver={(e) => props.getMeaning(e)}>{props.val} </span>
    )
}

export default Word
