import React, {useState, useEffect, useRef} from 'react'
import SearchForm from './components/Form/SearchForm';
import Results from './components/Results/Results'
import axios from "axios"
import './App.css';

function App() {
  const [startAddress, setStartAddress] = useState("")
  const [destination, setDestination] = useState("")
  const [showResults, setShowResults] = React.useState(false)
  const [polyline, setPolyline] = useState("")

  function handleSearch(startLocation, endLocation, searchTerm) {
    setStartAddress(startLocation)
    setDestination(endLocation)
    setShowResults(true)
  }

  useEffect(() => {
    if (startAddress !== "") {
      axios
        .get(`/s?start=${startAddress}&end=${destination}`)
        .then((res) => setPolyline(res.data))
        .catch((err) => console.log(err))
    }}, [startAddress, destination]) 

  return (
    <div className="App">
      <SearchForm handleSearch={handleSearch}/>
      {showResults ?
        <Results startAddress={startAddress} 
                  destination={destination} 
                  polyline={polyline}/> 
        : null
      }
    </div>
  );
}

export default App;
