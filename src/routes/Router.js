import { lazy } from "react";
import { Navigate } from "react-router-dom";

const FullLayout = lazy(() => import("../layouts/FullLayout.js"));
const UserVideoCall = lazy(() => import("../components/UserVideoCall"));
const User3dCall = lazy(() => import("../components/User3dCall"));
const UserHomeScreen = lazy(() => import("../screens/home/UserHomeScreen"));
const Login = lazy(() => import("../screens/login"));
const VideoSession = lazy(() => import("../screens/videoSession"));
const TwoDsession = lazy(() => import("../screens/twoDsession"));

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <UserHomeScreen /> },
      { path: "/normal", exact: true, element: <UserVideoCall /> },
      { path: "/3dcall", exact: true, element: <User3dCall /> },
      { path: "/video-sessions", exact: true, element: <VideoSession /> },
      {
        path: "/video-sessions/:sessionId",
        element: <TwoDsession />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default ThemeRoutes;
