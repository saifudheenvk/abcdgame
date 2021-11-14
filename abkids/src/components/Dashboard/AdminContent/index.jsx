import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Row, Col } from "antd";
import defaultImage from "../../../assets/adventure.svg";
import GameActions from "../../../actions/Games/GameActions";
import { useHistory } from "react-router-dom";

const CardContainer = styled(Card)`
  background-color: #fff;
  border-radius: 20px;
  height: 150px;
  background-image: url(${(props) => props.image});
  background-size: 50% 75%;
  background-repeat: no-repeat;
  background-position: left;
  & .ant-card-body {
    height: 100%;
    text-align: right;
    position: relative;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 20px;
  color: #825cef;
  position: absolute;
  margin: 20px;
  right: 0;
  bottom: 0;
`;

const AdminContent = () => {
  const history = useHistory();
  const [games, setGames] = useState([]);
  const onClickGame = (game) => {
    console.log(game);
    history.push(`/dashboard/admin/game/${game._id}`);
  };

  useEffect(() => {
    GameActions.getAllGames().then((response) => {
      if (response.data.data) {
        setGames(response.data.data);
      }
    });
  }, []);

  return (
    <Row gutter={[32, 32]}>
      {games.map((game) => (
        <Col sm={24} lg={8} xxl={6} key={game._id}>
          <CardContainer onClick={() => onClickGame(game)} image={defaultImage}>
            <Title>{game.name}</Title>
          </CardContainer>
        </Col>
      ))}
    </Row>
  );
};

export default AdminContent;
