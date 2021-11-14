import React, { useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import maptitle from "../../assets/maptitle.svg";
import castle from "../../assets/castle.svg"
import forest from "../../assets/forest.svg";
import fairyland from "../../assets/fairyland.svg"
import LeaderLine from "react-leader-line"
import AnimEvent from 'anim-event';
import { Col } from "antd";

const MapOutlineContent = styled(Col)`
  border: 1px solid #cdcdcd;
  border-radius: 46px;
  background: #ffffff08;
  box-shadow: 17px 16px 32px rgba(0, 0, 0, 0.25);
//   height: 80vh;
height:100%;
//   height: calc(100% - 10px);
`;
// const MapOutlineContent = styled.div` 
//     background-image: url(${props => props.img});
//     height: calc(100% - 0px);
// `;
const MapHeadDisplay = styled.img` 
    display: block;
    margin-left: auto;
    margin-right: auto;
    // position: absolute;
    // top: -5%;
    // left: 40%;
    
    // margin-top: -30px;
    // text-align: center;
`;

const CastleDisplay1 = styled.img` 
    position: absolute;
    top: 15%;
    left: 10%;
    z-index: 1;
`;

const CastleDisplay2 = styled.img` 
    position: absolute;
    top: 2%;
    left: 65%;
    z-index:1
    
`;

const CastleDisplay3 = styled.img` 
    position: absolute;
    top: 60%;
    left:60%;
    z-index: 1;
`;

const CastleDisplay4 = styled.img` 
    position: absolute;
    top: 50%;
    left:20%;
    z-index: 1;
`;


function MapContent() {

    const history = useHistory();
    const location = useLocation();


    const onClickCastleButton = () => {   
        console.log("history", history);
        console.log("location", location.pathname);
        history.push(`${location.pathname}/gamedashboard`);
    }

    useEffect(() => {
        let start1 = document.getElementById("A")
        let end1 = document.getElementById("B")
        var lines = [];
        var line1 = new LeaderLine(
            LeaderLine.pointAnchor(start1, {
                x: 100,
                y: 150,
            }),
            LeaderLine.pointAnchor(end1, {
                x: 100,
                y: 100,
            }),
            {
                dash: { len: 30, gap: 8 },
                size: 6,
                startPlug: 'behind',
                endPlug: 'behind',
                color: 'rgba(255, 255, 255, 1)',
                // endSocket:"bottom"
            }
        )
        line1.setOptions({
            startSocket: "right",
            endSocket: "left"
        })
        lines.push(line1);

        let start2 = document.getElementById("B")
        let end2 = document.getElementById("C")
        var line2 = new LeaderLine(
            LeaderLine.pointAnchor(start2, {
                x: 200,
                y: 150,
            }),
            LeaderLine.pointAnchor(end2, {
                x: 200,
                y: 150,
            }),
            {
                dash: { len: 30, gap: 8 },
                size: 8,
                startPlug: 'behind',
                endPlug: 'behind',
                color: 'rgba(255, 255, 255, 1)',
            }
        )
        line2.path = "arc";
        line2.setOptions({
            startSocket: "right",
            endSocket: "right"
        })
        lines.push(line2);

        let start3 = document.getElementById("C")
        let end3 = document.getElementById("D")
        var line3 = new LeaderLine(
            LeaderLine.pointAnchor(start3, {
                x: 200,
                y: 150,
            }),
            LeaderLine.pointAnchor(end3, {
                x: 200,
                y: 150,
            }),
            {
                dash: { len: 30, gap: 8 },
                size: 8,
                startPlug: 'behind',
                endPlug: 'behind',
                color: 'rgba(255, 255, 255, 1)',
            }
        )
        // line3.path = "arc";
        line3.setOptions({
            startSocket: "left",
            endSocket: "right"
        })
        lines.push(line3);
        var listener = AnimEvent.add(function () {
            lines.map(line => line.position());
        });
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
    }, [])
    return (
        <MapOutlineContent>
            <MapHeadDisplay src={maptitle} ></MapHeadDisplay>
            <CastleDisplay1 id="A" src={castle} ></CastleDisplay1>
            <CastleDisplay2 id="B" src={forest} ></CastleDisplay2>
            <CastleDisplay3 id="C" src={fairyland} ></CastleDisplay3>
            <CastleDisplay4 id="D" src={castle} onClick={onClickCastleButton}></CastleDisplay4>
        </MapOutlineContent>
    )
}

export default MapContent
