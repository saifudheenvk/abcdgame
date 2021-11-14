import React, { useEffect, useState } from "react";
import stars from "../../assets/stars.svg";
import levelNotCompletedStars from '../../assets/levelNotCompletedStars.svg'
import castle from "../../assets/castle.svg";
import Round from "./SvgComponents/Round.jsx";
import styled from "styled-components";
import { renderToStaticMarkup } from "react-dom/server";
import { Row, Col, message } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import MapSidebar from '../MapDashboard/MapSidebar'
import AnimEvent from 'anim-event';
import ChildActions from '../../actions/Child/ChildActions'
import LearningPathActions from '../../actions/LearningPath/LearningPathActions'
const LeaderLine = require('react-leader-line');

const CardContainer = styled.div`
  background-image: url("data:image/svg+xml,${(props) => props.image}");
  background-size: 69% 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 120px;
  width: 120px;
  position:absolute;
  z-index: 1;
  top:${(props) => props.top ? props.top : 0};
  left:${(props) => props.left ? props.left : 0};
  @media (max-width:1300px){
    height:100px;
    width:100px;
  }
  @media (max-width:1100px){
    height:90px;
    width:90px;
  }
`;

export const Container = styled(Row)`
  padding: 28px 0px 30px 29px;
`;

const StartImage = styled.img`
  height: 60px;
  @media (max-width:1300px){
    height:50px;
  }
  @media (max-width:1100px){
    height:45px;
  }
`;

export const LearningPathContainer = styled(Col)`
  border: 1px solid #cdcdcd;
  border-radius: 46px;
  box-shadow: 17px 16px 32px rgba(0, 0, 0, 0.25);
  height: 80vh;
  background: #ffffff08;
`;

const CastleImage = styled.img`
position: absolute;
top:27%;
left:2%;
z-index: 1;
height: 180px;
@media (max-width:1300px){
  height: 150px;
}
`;

const LearningPath = () => {
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  console.log("Params", params.id)
  const [child, setChild] = useState([])
  const [learningPathData, setLearningPathData] = useState([])

  const getChildData = () => {
    ChildActions.getChildrenById(params.id)
      .then((response) => {
        console.log("child data ", response.data.data[0])
        if (response.data.data) {
          setChild(response.data.data[0]);
        } else {
          message.error("Couldn't fetch particular child data");
        }
      })
      .catch(() => {
        message.error("Unable to fetch particular child data");
      });
  };

  const getLearningPathByGrade = () => {
    if (child.grade) {
      LearningPathActions.getLearningPathByGrade(child.grade)
        .then((response) => {
          console.log("Response", response.data.data);
          if (response.data && response.data.data)
            setLearningPathData(response.data.data);
          else
            message.error("Couldn't get Learning Path");
        })
        .catch(() => {
          message.error("Unable to fetch Learning Path");
        })
    }
  }

  const handleClick = (item) => {
    console.log("Item", item);
    if (item.gameDataId.gameId.name === "Jigsaw Puzzle")
      history.push(`${location.pathname}/puzzle/${item.gameDataId._id}`)
    else if (item.gameDataId.gameId.name === "Missing Letter")
      history.push(`${location.pathname}/missing-letter/${item.gameDataId._id}`)
  }

  useEffect(() => {
    getLearningPathByGrade();
  }, [child])

  useEffect(() => {
    var lines = [];
    if (learningPathData) {
      for (var i = 0; i < learningPathData.length; i++) {
        if (i === 0) {
          lines.push(new LeaderLine(
            LeaderLine.pointAnchor(document.getElementById("CastleImage"), {
              x: 100,
              y: 130
            }),
            LeaderLine.pointAnchor(document.getElementById(i + 1), {
              x: 50,
              y: 60
            })
            , {
              color: '#fff', dash: { len: 30, gap: 8 },
              size: 6, endPlug: "behind", startSocket: "top", endSocket: "left"
            }
          ))
        }
        else {
          var line = new LeaderLine(
            LeaderLine.pointAnchor(document.getElementById((i).toString()), {
              x: 60,
              y: 60
            })
            ,
            LeaderLine.pointAnchor(document.getElementById((i + 1).toString()), {
              x: 60,
              y: 60
            }),
            {
              color: '#fff', dash: { len: 30, gap: 8 }, size: 6, endPlug: "behind"
            })
          elements[i].inwards ? line.setOptions({ endSocket: elements[i].inwards }) : line.setOptions({})
          elements[i - 1].outwards ? line.setOptions({ startSocket: elements[i - 1].outwards }) : line.setOptions({})
          lines.push(line);
        }
      }
      var listener = AnimEvent.add(function () {
        lines.map(line => line.position());
      })
      window.addEventListener('scroll', listener, true);

      return () => {
        console.log("cleaned up");
        const test = document.getElementsByClassName("leader-line")
        console.log("cleaned up", test);
        while (test.length > 0) {
          test[0].parentNode.removeChild(test[0]);
        }
        window.removeEventListener("scroll", listener, true);
      };
    }
  }, [learningPathData])

  useEffect(() => {
    getChildData();
    // var lines = [];

    // for (var i = 0; i < learningPathData.length; i++) { //To be changed as number of levels
    //   if (i === 0) {
    //     lines.push(new LeaderLine(
    //       LeaderLine.pointAnchor(document.getElementById("CastleImage"), {
    //         x: 100,
    //         y: 130
    //       }),
    //       LeaderLine.pointAnchor(document.getElementById(i + 1), {
    //         x: 50,
    //         y: 60
    //       })
    //       , {
    //         color: '#fff', dash: { len: 30, gap: 8 },
    //         size: 6, endPlug: "behind", startSocket: "top", endSocket: "left"
    //       }
    //     ))
    //   }
    //   else {
    //     var line = new LeaderLine(
    //       LeaderLine.pointAnchor(document.getElementById((i).toString()), {
    //         x: 60,
    //         y: 60
    //       })
    //       ,
    //       LeaderLine.pointAnchor(document.getElementById((i + 1).toString()), {
    //         x: 60,
    //         y: 60
    //       }),
    //       {
    //         color: '#fff', dash: { len: 30, gap: 8 }, size: 6, endPlug: "behind"
    //       })
    //     elements[i].inwards ? line.setOptions({ endSocket: elements[i].inwards }) : line.setOptions({})
    //     elements[i - 1].outwards ? line.setOptions({ startSocket: elements[i - 1].outwards }) : line.setOptions({})
    //     lines.push(line);
    //   }
    // }
    // var listener = AnimEvent.add(function () {
    //   lines.map(line => line.position());
    // })
    // window.addEventListener('scroll', listener, true);

    // return () => {
    //   console.log("cleaned up");
    //   const test = document.getElementsByClassName("leader-line")
    //   console.log("cleaned up", test);
    //   while (test.length > 0) {
    //     test[0].parentNode.removeChild(test[0]);
    //   }
    //   window.removeEventListener("scroll", listener, true);
    // };
  }, [])

  //Position of the nodes is set here
  const elements = [
    { top: "10%", left: "20%" },
    { top: "18%", left: "35%" },
    { top: "17%", left: "53%" },
    { top: "9%", left: "70%", outwards: "right" },
    { top: "30%", left: "85%", inwards: "top", outwards: "bottom" },
    { top: "65%", left: "84%", outwards: "bottom" },
    { top: "72%", left: "67%", inwards: "right", outwards: "left" },
    { top: "70%", left: "50%", outwards: "left", inwards: "auto" },
    { top: "50%", left: "35%", inwards: "right", outwards: "left" },
    { top: "65%", left: "20%" }
  ]

  // Hard coding for now, to be changed while integrating
  const isLevelCompleted = [true, true, true, true, true, true, false, false, false, false];

  return (
    <Container>
      <Col span={2}>
        <MapSidebar />
      </Col>
      <Col span={1} />
      <LearningPathContainer span={20}>
        <CastleImage
          id="CastleImage"
          src={castle}>
        </CastleImage>
        {learningPathData.map((element, index) => (
          <CardContainer
            id={index + 1}
            top={elements[index].top}
            left={elements[index].left}
            image={encodeURIComponent(
              renderToStaticMarkup(
                <Round
                  number={index + 1}
                  isLevelCompleted={isLevelCompleted[index]} //To be changed
                />)
            )}
            onClick={() => handleClick(element)}
          >
            <StartImage
              src={isLevelCompleted[index] ? stars : levelNotCompletedStars}  //To be changed
            />
          </CardContainer>
        ))}
      </LearningPathContainer>
    </Container>
  );
};

export default LearningPath;
