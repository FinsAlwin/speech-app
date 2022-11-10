export const BASE_URL = window.location;

// export const SOCKET_URL = "ws://localhost:8080/ws";

export const SOCKET_URL =
  "ws://ec2-3-108-64-255.ap-south-1.compute.amazonaws.com:8080/ws";

export const socket = new WebSocket(
  "ws://ec2-3-108-64-255.ap-south-1.compute.amazonaws.com:8080/ws"
);
