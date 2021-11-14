import React from 'react'
import styled from "styled-components";

const MapCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  height: 150px;
  border-radius: 20px;
  background-color: #fff;
  @media (min-width: 1000px) {
    height: 140px;
  }
  @media (min-width: 1600px) {
    height: 179px;
  }
`;

const MapContentContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-right:5%;
margin-left:-20px;
height:100%
`;

const Description = styled.p`
  margin-bottom: 0px;
  color:#825cef;
  font-size:15px;
  font-weight:bold;
  text-align: center;
  padding-bottom:20px
`;

const Mountain = styled.img`
  height: inherit;
  margin-left: -25px;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
`;

const MapCard = ({ image, type, typeImage }) => {

    return (
        <MapCardContainer>
          <Mountain src={image} alt="image" ></Mountain>
            
            <MapContentContainer>
              <Image src={typeImage} alt="image"></Image>
                
              <Description>{type}</Description>
            </MapContentContainer>
        </MapCardContainer>
    )
}

export default MapCard
