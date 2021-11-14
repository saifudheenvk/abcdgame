import React from 'react'
import Game from './Game'
import {Col} from "antd"
import styled from "styled-components";

const GameOutlineContent = styled(Col)`
  display : flex;
  flex-direction : column;
  border: 1px solid #cdcdcd;
  border-radius: 46px;
  background: #ffffff08;
  box-shadow: 17px 16px 32px rgba(0, 0, 0, 0.25);
  text-align: center;
//   justify-content: ;
  align-items : center;
  flex-wrap: wrap;
//   height: 80vh;
    height:100%;
//   height: calc(100% - 10px);
    gap:10%;
`;


const GameHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width : 500px;
    height : 103px;
    border-radius : 25px;
    font-size : 30px;
    color : white;
    background: linear-gradient(180deg, #FFC700 0%, #FA00FF 100%);
`

const Description = styled.div`
    color : white;
    font-size : 20px;
`;


function MissingLetterGame({setShowConfetti}) {
    return (
        <GameOutlineContent span ={21}>
             <GameHeading>Missing Letter Game</GameHeading>
             <Description>The game will generate a word for you and you'll have to guess what the missing letters are.</Description>
             <Game setShowConfetti={setShowConfetti}/>

        </GameOutlineContent>
       
    )
}

export default MissingLetterGame