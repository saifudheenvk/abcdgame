import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { message, Row, Col } from "antd";
import ChildCard from "./ChildCard";
import MapCard from "./MapCard";
import GameCard from "./GameCard";
import adventure from "../../assets/adventure.svg";
import map from "../../assets/map.svg";
import learnigPath from "../../assets/learningPath.svg";
import gameImage from "../../assets/game1.svg";
import ChildActions from "../../actions/Child/ChildActions";
import { avatar } from "../../utils/Avatars";

const StyledCol = styled(Col)`
  //   margin-bottom: 32px;
  padding-right: 10px;
  padding-left: 10px;
`;
const StyledRow = styled.div`
  //   margin-bottom: 32px;
  padding-top: 1%;
  padding-bottom: 1%;
  display: flex;
  background-color: #8482ff;
  box-shadow: inset 8px 4px 19px rgba(0, 0, 0, 0.25);
  overflow-x: auto;
`;

const RecentGameStyling = styled.h2`
  padding-top: 15%;
  padding-bottom: 1%;
  color: white;
  font-weight: bold;
`;

const ChildContent = ({ setRewards }) => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  console.log("Params", params.id);
  const [data, setData] = useState([]);

  const getChildData = () => {
    ChildActions.getChildrenById(params.id)
      .then((response) => {
        console.log("child data ", response.data.data[0]);
        if (response.data.data) {
          setData(response.data.data[0]);
        } else {
          message.error("Couldn't fetch particular child data");
        }
      })
      .catch(() => {
        message.error("Unable to fetch particular child data");
      });
  };

  useEffect(() => {
    getChildData();
  }, []);

  const onClickMap = () => {
    console.log("history", history);
    console.log("location", location.pathname);
    history.push(`${location.pathname}/map`);
  };
  const onClickLearningPath = () => {
    history.push(`${location.pathname}/learningpath`);
  };
  const onClickPuzzle = () => {
    console.log("You clicked");
    history.push(`${location.pathname}/games/puzzle`);
  };

  return (
    <>
      {data ? setRewards(data.reward) : <></>}
      <Row gutter={[32, 16]}>
        <StyledCol xl={4} lg={5} xxl={4}>
          <ChildCard
            childId={params.id}
            isPlus={false}
            item={data}
            image={data.image && avatar[data.image]}
          />
        </StyledCol>
        <StyledCol xl={7} lg={8} xxl={6} onClick={onClickMap}>
          <MapCard image={adventure} type="Your Map" typeImage={map} />
        </StyledCol>
        <StyledCol xl={7} lg={8} xxl={6} onClick={onClickLearningPath}>
          <MapCard
            image={adventure}
            type="Learning Path"
            typeImage={learnigPath}
          />
        </StyledCol>
      </Row>

      {/* <h2 style={{paddingTop:"15%",paddingBottom:"1%",color:"white" }}>Recent Games</h2> */}
      <RecentGameStyling>Recent Games</RecentGameStyling>

      <StyledRow gutter={[32, 16]}>
        <StyledCol md={10} xl={7} lg={7} xxl={6} onClick={onClickPuzzle}>
          <GameCard gameImage={gameImage} gameName="Jigsaw Puzzle" />
        </StyledCol>
        <StyledCol md={10} xl={7} lg={8} xxl={6}>
          <GameCard gameImage={gameImage} gameName="Jigsaw Puzzle" />
        </StyledCol>
        <StyledCol md={10} xl={7} lg={8} xxl={6}>
          <GameCard gameImage={gameImage} gameName="Jigsaw Puzzle" />
        </StyledCol>
        <StyledCol md={10} xl={7} lg={8} xxl={6}>
          <GameCard gameImage={gameImage} gameName="Jigsaw Puzzle" />
        </StyledCol>
        <StyledCol md={10} xl={7} lg={8} xxl={6}>
          <GameCard gameImage={gameImage} gameName="Jigsaw Puzzle" />
        </StyledCol>
      </StyledRow>
    </>
  );
};

export default ChildContent;
