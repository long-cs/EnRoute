import React, {useState} from 'react'
import SearchForm from './components/Form/SearchForm';
import Results from './components/Results/Results'
import axios from "axios"
import './App.css';

function App() {
  const [startAddress, setStartAddress] = useState("")
  const [destination, setDestination] = useState("")
  const [showResults, setShowResults] = React.useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [polyline, setPolyline] = useState("")

  function handleSearch(startLocation, endLocation, searchTerm) {
    if( !startLocation  && !endLocation) {
       // It got really annoying retyping start and stop, REMOVE LATER
      startLocation = 'Los Angeles'
      endLocation = 'Santa Monica'
    }
    

    setStartAddress(startLocation)
    setDestination(endLocation)
    setSearchTerm(searchTerm)
    axios
    .get(`/s/query?start=${startLocation}&end=${endLocation}&desc=${searchTerm}`)
    .then((res) => {  
      setPolyline(res.data)
    })
    .catch((err) => console.log(err))
    setShowResults(true)
  }

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
