import React from 'react'
import styled from 'styled-components'
import {Button} from 'antd'

// const Letter = styled.button` 
//     display : flex;
//     flex-direction : row;
//     align-items: center;
//     justify-content: center;
//     width : 40px;
//     height : 40px;
//     background-color: rgb(16, 49, 53);
//     color: white;
// `;

function LetterDisplay(props) {
    return (
        <>
            <Button type="primary" shape="circle" size={'large'} onClick={()=>{props.handleClick(props.letter)}}>{props.letter.toUpperCase()}</Button>
        </>
    )
}

export default LetterDisplay
