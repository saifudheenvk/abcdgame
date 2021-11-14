import React from 'react'
import styled from "styled-components";
import {Col} from "antd"
import { useHistory, useLocation } from "react-router-dom";
import jigsawPuzzle from "../../assets/jigsaw-puzzle.svg"
import missingLetter from "../../assets/missingletter.svg"
import alphabetTrace from "../../assets/alphabet-trace.svg"


const MapOutlineContent = styled(Col)`
  border: 1px solid #cdcdcd;
  border-radius: 46px;
  background: #ffffff08;
  box-shadow: 17px 16px 32px rgba(0, 0, 0, 0.25);
  display : flex;
  justify-content: space-around;
  align-items : flex-start;
  flex-wrap: wrap;
//   height: 80vh;
height:100%;
//   height: calc(100% - 10px);
`;

const CastleDisplay1 = styled.img`
    padding-top:20px;
    width : 30%;
    height : 30%;
    // padding-right : 20px;
`
const CastleDisplay2 = styled.img`
    width : 30%;
    height : 30%;
    padding-top:20px;
`
const CastleDisplay3 = styled.img`
    width : 30%;
    height : 30%;
    padding-top:20px;
`
function GameContent() {

    const history = useHistory();
    const location = useLocation();


    const onClickMissingLetter = () => {   
        console.log("history", history);
        console.log("location", location.pathname);
        history.push(`${location.pathname}/missing-letter`);
    }

    const onClickPuzzle = () => {   
        console.log("history", history);
        console.log("location", location.pathname);
        history.push(`${location.pathname}/puzzle`);
    }

    return (
        <MapOutlineContent>
            <CastleDisplay1  src={missingLetter} onClick={onClickMissingLetter}></CastleDisplay1>
            <CastleDisplay2  src={jigsawPuzzle} onClick={onClickPuzzle}></CastleDisplay2>
            <CastleDisplay3  src={alphabetTrace} ></CastleDisplay3>
        </MapOutlineContent>
    )
}

export default GameContent
