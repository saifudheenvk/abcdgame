import React from 'react'
import { Tabs } from 'antd';
import styled from 'styled-components';
import LearningPathTable from './LearningPathTable'

const { TabPane } = Tabs;

const LearningPathContainer = styled.div`
.ant-tabs{
    background-color:white;
    }
    .ant-table-thead > tr > th{
        color: white;
        background-color:#9D6DEB;
    } 
    .ant-table{
        background-color:#9D6DEB;
        color:white;
    }
    .tr.ant-table-row:hover{
        background-color:#825CEF;
    }
`;



const LearningPathSettings = () => {
    const GRADES = ["Pre KG", "KG", "First", "Second"]
    return (
        <LearningPathContainer>
            <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: "80vh" }}>
                {GRADES.map(i => (
                    <TabPane tab={i} key={i}>
                        <LearningPathTable grade={i}/>
                    </TabPane>
                ))}
            </Tabs>
        </LearningPathContainer>
    )
}

export default LearningPathSettings
