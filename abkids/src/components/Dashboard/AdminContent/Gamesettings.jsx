import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import GameActions from "../../../actions/Games/GameActions";
import { message, Col, Row, Empty } from "antd";
import addSvg from "../../../assets/add.svg";
import GameLevel from "./GameLevel";
import AddGameLevel from "./AddGameLevel";

const Title = styled.p`
  color: #ffff;
  font-weight: 600;
  font-size: 24px;
`;
const SettingsContainer = styled(Col)`
  height: fit-content;
  background-color: #fff;
`;

const ColumnHeading = styled.div`
  background-color: #b696eb;
  padding: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;
const ColumnData = styled.div`
  padding: 10px;
  color: #002fa8;
  border-bottom: 1px solid #b9a9d1;
  :hover {
    background-color: #e0d8ed;
  }
`;

const Levels = styled.div`
  overflow: scroll;
  max-height: 60vh;
`;

const LevelContent = styled.div`
  overflow: scroll;
  max-height: 60vh;
  padding: 10px;
`;

const AddImage = styled.img`
  height: 28px;
  position: absolute;
  right: 7px;
  cursor: pointer;
`;

const GameSettings = () => {
  const params = useParams();
  const [gameData, setGameData] = useState([]);
  const [levelContent, setLevelcontent] = useState();
  const [game, setGame] = useState();
  const [showModal, setShowModal] = useState(false);
  const fetchGameData = () => {
    GameActions.getgameData(params.gameId)
      .then((response) => {
        if (response.data.data) {
          setGameData(response.data.data);
          if (response.data.data.length) setLevelcontent(response.data.data[0]);
        } else {
          message.error("Couldn't fetch Game data");
        }
      })
      .catch(() => {
        message.error("Unable to fetch game data");
      });
  };

  const fetchSingleGame = () => {
    GameActions.getSingleGame(params.gameId).then((response) => {
      if (response.data.data) {
        setGame(response.data.data);
      } else {
        message.error("Couldn't fetch Game");
      }
    });
  };

  useEffect(() => {
    fetchSingleGame();
    fetchGameData();
  }, []);

  const onClickLevel = (level) => {
    setLevelcontent(level);
    console.log(level);
  };

  return (
    <div>
      {game && (
        <AddGameLevel
          nextLevel={gameData.length + 1}
          fetchGameData={fetchGameData}
          showModal={showModal}
          setShowModal={setShowModal}
          gameValues={game.requiredFields}
        />
      )}
      <Title>Game Settings</Title>
      <Row>
        <SettingsContainer span={6}>
          <ColumnHeading>
            Levels{" "}
            <AddImage
              onClick={() => {
                setShowModal(true);
              }}
              src={addSvg}
            />
          </ColumnHeading>
          <Levels>
            {gameData ? (
              gameData.map((level) => (
                <ColumnData key={level._id} onClick={() => onClickLevel(level)}>
                  Level {level.level}
                </ColumnData>
              ))
            ) : (
              <Empty />
            )}
          </Levels>
        </SettingsContainer>
        <Col span={1} />
        <SettingsContainer span={17}>
          <ColumnHeading>Data</ColumnHeading>
          <LevelContent>
            {levelContent && game ? (
              <GameLevel level={levelContent} types={game.requiredFields} />
            ) : (
              <Empty />
            )}
          </LevelContent>
        </SettingsContainer>
      </Row>
    </div>
  );
};

export default GameSettings;
