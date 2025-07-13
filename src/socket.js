import { io } from "socket.io-client";

// cambia si tu backend está en otro host
// const socket = io("https://back-buteko-do-cunhado.onrender.com"); 

const socket = io(`${import.meta.env.VITE_API_URL}`); // cambia si tu backend está en otro host

export default socket;
