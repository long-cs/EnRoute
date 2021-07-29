import React, {useState, useEffect} from 'react'
import CustomForm from './components/Form/CustomForm';
import Maps from './components/Map/Map';
import axios from "axios"
import './App.css';

function App() {
  const [startAddress, setStartAddress] = useState("")
  const [destination, setDestination] = useState("")
  const [polyline, setPolyline] = useState("")

  useEffect(() => {
    if (startAddress !== "") {
      axios
        .get(`/s?start=${startAddress}&end=${destination}`)
        .then((res) => setPolyline(res.data))
        .catch((err) => console.log(err))
    }}, [startAddress, destination]) 

  return (
    <div className="App">
      {startAddress === "" || destination === "" ?
        <CustomForm setStartAddress={setStartAddress} setDestination={setDestination}/>
      : <Maps startAddress={startAddress} destination={destination} polyline={polyline}/>}
    </div>
  );
}

export default App;
