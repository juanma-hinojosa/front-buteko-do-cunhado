import { io } from "socket.io-client";

const socket = io("https://back-buteko-do-cunhado.onrender.com"); // cambia si tu backend está en otro host

export default socket;
