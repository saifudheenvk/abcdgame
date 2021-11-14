import React, { useState, useEffect } from 'react'
import defaultImage from '../../../assets/puzzle.png'
import MapSidebar from '../../MapDashboard/MapSidebar'
import { Row, Col, message } from 'antd'
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Container } from '../../LearningPath/index'
import Confetti from 'react-confetti'
import GameActions from '../../../actions/Games/GameActions'
import ImagePuzzleGame from './ImagePuzzleGame'

const DEFAULT_PIECE_COUNT = 2;

const StyledPuzzle = styled(Col)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 1px solid #cdcdcd;
border-radius: 46px;
box-shadow: 17px 16px 32px rgba(0, 0, 0, 0.25);
height: 70vh;
background: #ffffff08;
& .piece >div{
    border:1px solid white !important;
  }
`;

const SolvedImage = styled.img`
width:100%;
height:100%;
opacity:0.6;
background-color:white;
`;

const PuzzleWrapper = styled.div`
width:${(props) => (props.size ? props.size + 'px' : "auto")};
height:${(props) => (props.size ? props.size + 'px' : "auto")};
background-color:${(props) => (props.solvedImg ? "white" : "#ffffff00")};
margin:3%;
box-shadow: 17px 16px 32px rgba(0, 0, 0, 0.25);
`;

const GameHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width : 200px;
    height : 60px;
    margin-bottom: 30px;
    border-radius : 25px;
    font-size : 30px;
    color : white;
    background: linear-gradient(180deg, #FFC700 0%, #FA00FF 100%);
`;

const SubHeading = styled.div`
font-size:20px;
text-align: center;
color:white;
margin:3%;
`;

const ImagePuzzle = ({ fromLearningPath }) => {
    const location = useLocation();
    const params = useParams();
    const [success, setSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [size, setSize] = useState(document.body.clientWidth < 1200 ? 300 : 400);
    const [puzzleData, setPuzzleData] = useState();

    const handlePuzzleDone = () => {
        setSuccess(true);
        setShowConfetti(true);
    }
    const preventDragHandler = (e) => {
        e.preventDefault();
    }
    const handleResize = (e) => {
        if (document.body.clientWidth < 1200)
            setSize(300);
        else
            setSize(400);
    }

    const fetchGameData = () => {
        GameActions.getGameDataById(params.gameDataId)
            .then((response) => {
                if (response.data && response.data.data) {
                    setPuzzleData(response.data.data.gameValues)
                } else {
                    message.error("Couldn't fetch game data");
                }
            })
            .catch(() => {
                message.error("Unable to fetch game data");
            });

    }

    useEffect(() => {
        if (fromLearningPath && fromLearningPath) {
            fetchGameData();
        }
        window.addEventListener("resize", handleResize);
    }, [])

    useEffect(() => {
        if (success) {
            setTimeout(() => { setShowConfetti(false); }, 6500)
        }
    }, [success])

    const renderPuzzle = () => {
        return (
            <ImagePuzzleGame
                image={puzzleData.image}
                level={puzzleData.Count}
                handlePuzzleDone={handlePuzzleDone}
                size={size}
            />
        )
    }

    const renderDefaultPuzzle = () => {
        return (
            <ImagePuzzleGame
                image={defaultImage}
                level={DEFAULT_PIECE_COUNT}
                handlePuzzleDone={handlePuzzleDone}
                size={size}
            />
        )
    }

    return (
        <Container>
            {showConfetti ? <Confetti gravity={0.2} numberOfPieces="400" /> : <></>}
            <Col span={2}>
                <MapSidebar />
            </Col>
            <Col span={1}></Col>
            <Col span={20}>
                <Row>
                    <GameHeading>
                        Puzzle
                    </GameHeading>
                </Row>
                <Row>
                    <StyledPuzzle span={11}>
                        {!success ? <SubHeading >Shuffle the pieces to form the Image as shown on the right side!</SubHeading> : <></>}
                        <PuzzleWrapper solvedImg={false} onDragStart={success ? preventDragHandler : () => { }}>
                            {puzzleData ? renderPuzzle() : !fromLearningPath ? renderDefaultPuzzle() : ""}
                        </PuzzleWrapper>
                    </StyledPuzzle>
                    <Col span={2}></Col>
                    <StyledPuzzle span={11}>
                        {/* Handle rewards here */}
                        {!success ?
                            <>
                                <SubHeading>Your Target Image is given below!</SubHeading>
                                <PuzzleWrapper size={size} solvedImg={true}>
                                    <SolvedImage src={puzzleData ? puzzleData.image : defaultImage} />
                                </PuzzleWrapper>
                            </>
                            : <></>}
                        {success ? <SubHeading>Congratulations! You have solved the puzzle!</SubHeading> : <></>}
                    </StyledPuzzle>
                </Row>
            </Col>
        </Container>
    )
}

export default ImagePuzzle
