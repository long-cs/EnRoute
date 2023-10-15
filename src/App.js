import React, {useState} from 'react'
import SearchForm from './components/Form/SearchForm';
import Results from './components/Results/Results'
import axios from "axios"
import './App.css';

function App() {
  const [startAddress, setStartAddress] = useState("")
  const [destination, setDestination] = useState("")
  const [showResults, setShowResults] = React.useState(false)
  const [polyline, setPolyline] = useState("")
  const [reset, setReset] = useState(true)

  function handleSearch(startLocation, endLocation, searchTerm) {
    setReset(true)
    if( !startLocation  && !endLocation) {
       // It got really annoying retyping start and stop, REMOVE LATER
      startLocation = 'Los Angeles'
      endLocation = 'Santa Monica'
    }
    
    setStartAddress(startLocation)
    setDestination(endLocation)
    setPolyline("");
    axios
    .get(`/s/query?start=${startLocation}&end=${endLocation}&desc=${searchTerm}`)
    .then((res) => {  
      setReset(false)
      setPolyline(res.data)
    })
    .catch((err) => {
      console.log(err)
      console.log(err.toJSON())
    })
    setShowResults(true)
  }

  return (
    <div className="App">
      <SearchForm handleSearch={handleSearch}/>
      {showResults ?
        <Results startAddress={startAddress} 
                  destination={destination} 
                  polyline={polyline}
                  reset={reset}/> 
        : null
      }
    </div>
  );
}

export default App;
