import { io } from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_WS_URL}/chat`, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
