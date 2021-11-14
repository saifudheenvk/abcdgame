import React from "react";
import Dashboard from "../components/Dashboard";
import Map from "../components/MapDashboard/Map";
import LearningPath from "../components/LearningPath/index";
import AdminContent from "../components/Dashboard/AdminContent";
import ChildContent from "../components/Dashboard/ChildContent";
import ParentContent from "../components/Dashboard/ParentContent";
import ImagePuzzle from "../components/Games/Puzzle/ImagePuzzle";
import GameDisplaySection from "../components/MapDashboard/GameDisplaySection";
import GameSettings from "../components/Dashboard/AdminContent/Gamesettings";
import LearningPathSettings from '../components/Dashboard/AdminContent/LearningPathSettings';

const ProtectedPaths = [
  {
    url: "/dashboard/parent",
    role: "parent",
    component: (
      <Dashboard content={<ParentContent />} correntItem="Dashboard" isParent={true} />
    ),
  },
  {
    url: "/dashboard/parent/item1",
    role: "parent",
    component: <Dashboard content={<div>Item1</div>} correntItem="Item1" />,
  },
  {
    url: "/dashboard/parent/item2",
    role: "parent",
    component: <Dashboard content={<div>Item2</div>} correntItem="Item2" />,
  },
  {
    url: "/dashboard/parent/item3",
    role: "parent",
    component: <Dashboard content={<div>Item3</div>} correntItem="Item3" />,
  },
  {
    url: "/dashboard/kids/:id",
    role: "parent",
    component: <Dashboard content={<ChildContent />} correntItem="Dashboard" isParent={false} />,
  },
  {
    url: "/dashboard/kids/:id/item1",
    role: "parent",
    component: <Dashboard content={<div>Item1</div>} correntItem="Item1" />,
  },
  {
    url: "/dashboard/kids/:id/item2",
    role: "parent",
    component: <Dashboard content={<div>Item2</div>} correntItem="Item2" />,
  },
  {
    url: "/dashboard/kids/:id/item3",
    role: "parent",
    component: <Dashboard content={<div>Item3</div>} correntItem="Item3" />,
  },
  {
    url: "/dashboard/kids/:id/map",
    role: "parent",
    component: <Map />,
  },
  {
    url: "/dashboard/kids/:id/learningpath",
    role: "parent",
    component: <LearningPath />,
  },
  {
    url: "/dashboard/kids/:id/map/gamedashboard",
    role: "parent",
    component: <GameDisplaySection />,
  },
  {
    url: "/dashboard/kids/:id/map/gamedashboard/missing-letter",
    role: "parent",
    component: <GameDisplaySection />,
  },
  {
    url: "/dashboard/kids/:id/map/gamedashboard/puzzle",
    role: "parent",
    component: <ImagePuzzle fromLearningPath={false} />,
  },
  {
    url: "/dashboard/kids/:id/learningpath/puzzle/:gameDataId",
    role: "parent",
    component: <ImagePuzzle fromLearningPath={true} />,
  },
  {
    url: "/dashboard/kids/:id/learningpath/missing-letter/:gameDataId",
    role: "parent",
    component: <GameDisplaySection fromLearningPath={true} />,
  },
  {
    url: "/dashboard/admin",
    role: "admin",
    component: <Dashboard content={<AdminContent />} correntItem="Games" />,
  },
  {
    url: "/dashboard/admin/game/:gameId",
    role: "admin",
    component: <Dashboard content={<GameSettings />} correntItem="Games" />,
  },
  {
    url: "/dashboard/admin/learningpath",
    role: "admin",
    component: (
      <Dashboard
        content={<div><LearningPathSettings /></div>}
        correntItem="Learning Path"
      />
    ),
  },
  {
    url: "/dashboard/admin/userlist",
    role: "admin",
    component: (
      <Dashboard
        content={<div>UsersList&Details</div>}
        correntItem="UsersList&Details"
      />
    ),
  },
  {
    url: "/dashboard/kids/:id/games/puzzle",
    role: "parent",
    component: <ImagePuzzle fromLearningPath={false} />,
  },
];

export default ProtectedPaths;
