import React, { useState, useEffect } from "react";
import styled from "styled-components";
import addSvg from "../../../assets/add.svg";

const Title = styled.p`
  color: #002fa8;
  font-weight: 600;
  font-size: 17px;
`;

const ValuesTitle = styled.p`
  color: #002fa8;
  font-size: 16px;
  margin-bottom: 0px;
`;

const GameImage = styled.img`
  height: 300px;
  margin-left: 28%;
`;
const DataContainer = styled.div`
  padding: 10px;
`;

const GameLevel = ({ level, types }) => {
  return (
    <div>
      <Title>Level {level.level}</Title>
      <ValuesTitle>Game values:</ValuesTitle>
      <DataContainer>
        {Object.keys(level.gameValues).map((key) => {
          const currentType = types.find((t) => t.fieldName === key).fieldType;
          return (
            <>
              <p>
                {key.charAt(0).toUpperCase() +
                  key.substring(1).replace(/([a-z])([A-Z])/g, "$1 $2")}
                : {currentType !== "image" ? level.gameValues[key] : ""}
              </p>
              {currentType === "image" && (
                <GameImage
                  src={level.gameValues[key]}
                />
              )}
            </>
          );
        })}
      </DataContainer>
    </div>
  );
};

export default GameLevel;
