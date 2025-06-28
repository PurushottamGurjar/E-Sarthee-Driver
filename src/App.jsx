import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {io} from "socket.io-client"
import './App.css'

 const socket=io("https://e-sarthee.onrender.com");
function App() {
  const [isSharing, setIsSharing]=useState(false);
  const [watchId, setWatchId] = useState(null);

const HandleStartLocation = () => {
  setIsSharing(true);
  console.log("yes your location started");

  if (navigator.geolocation) {
    const id = navigator.geolocation.watchPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        socket.emit("driver-location", { latitude, longitude });
      },
      (error) => {
        console.log("yes some error occurred while sending the location", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
      }
    );

    setWatchId(id);
  }
};

const HandleStopLocation = () => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    console.log("Location sharing stopped.");
  }
  setIsSharing(false);
};

 

  return (
    <>
      <h1>Hi welcome to the E-Sarthee Driver's page .</h1>
      <div className="controls">
        {!isSharing && <button className='control-buttons' onClick={HandleStartLocation}  >Start sharing location </button>}
        {isSharing && <button className='control-buttons' onClick={HandleStopLocation} > Stop sharing the location </button>}
      </div>
    </>
  )
}

export default App
