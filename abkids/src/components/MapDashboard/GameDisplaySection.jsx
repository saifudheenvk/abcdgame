import React, {useState, useEffect} from 'react'
import MapSidebar from './MapSidebar'
import {Row,Col} from "antd"
import GameContent from './GameContent'
import styled from "styled-components";
import MissingLetterGame from '../Games/MissingLetters/MissingLetterGame'
import ImagePuzzle from '../Games/Puzzle/ImagePuzzle'
import Confetti from 'react-confetti';

const MapDashboardPageLayout = styled(Row)`
  margin-top: 28px;
  height: calc(100% - 96px);
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
`;

function GameDisplaySection() {
    const [showConfetti, setShowConfetti] = useState(false);
    return (
        <MapDashboardPageLayout>
            {showConfetti?<Confetti gravity={0.2} numberOfPieces="400" /> :<></>}
            <Col span={2}>
                <MapSidebar />
            </Col>
            <Col span={1} />
            <Col span={21}>
                {
                window.location.href.includes("missing-letter")?
                <MissingLetterGame setShowConfetti={setShowConfetti} />
                :
                <GameContent />
                }
            </Col>
        </MapDashboardPageLayout>
    )
}

export default GameDisplaySection
