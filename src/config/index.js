export const BASE_URL = "https://main.druq7cgf4v9f.amplifyapp.com";

// export const SOCKET_URL = "ws://localhost:8080/ws";

export const SOCKET_URL =
  "ws://ec2-3-108-64-255.ap-south-1.compute.amazonaws.com:8080/ws";

export const socket = new WebSocket("wss://gosocket.herokuapp.com/ws");
