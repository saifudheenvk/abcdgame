import React from 'react'
import styled from "styled-components";
import playButton from "../../assets/playButton.svg"


const GameCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  height: 150px;
  border-radius: 20px;
  background-color: #fff;
  padding-top:10px;
  
  @media (min-width: 1000px) {
    height: 140px;
  }
  @media (min-width: 1600px) {
    height: 179px;
  }
`;

const GameCardTitle = styled.p`
  margin-bottom: 0px;
  color:#FFB800;
  font-size:25px;
  font-weight:bold;
  text-align: center;
`;

const PlayButton = styled.img`
  height: 40%;
  width: 40%;
  position: absolute;
  top : 24%;
  left : 31%;
`;

const GameImage = styled.img`
  height: 75%;
  width: 75%;
`;

const GameCard = ({gameImage, gameName}) => {
    return (
        <GameCardContainer >              
            <PlayButton src={playButton} alt="play-button"></PlayButton> 
            <GameImage src={gameImage} alt="game-image"></GameImage>
            <GameCardTitle>
                {gameName}
            </GameCardTitle>
        </GameCardContainer>
    )
}

export default GameCard
