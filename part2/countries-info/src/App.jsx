import { useState, useEffect } from 'react';
import axios from 'axios';
import gets from './services/countryCommands';

const Countries = ({countryList}  ) =>{
  const [countryInfo, setCountryInfo] = useState([]);

  useEffect(() => {
    if( countryList.length ===1){
      gets.search(countryList[0]).then(result =>{setCountryInfo(result)})
    } else{
      setCountryInfo(null);
    }

  },[countryList])

  if(countryList.length===1 && countryInfo){
    
      
      return(
        <div>
          <h1>{countryInfo.name.common}</h1>
          <p>Capital: {countryInfo.capital}</p>
          <p>Area: {countryInfo.area}km²</p>
          <h3>Languages</h3>
          <ul>
            
            {Object.keys(countryInfo.languages).map(key =>{
              
              console.log(countryInfo.languages[key]);
              return(<li key={key}>{countryInfo.languages[key]}</li>)
            })}
            
            
          </ul>
          <img src={countryInfo.flags.png}></img>
        </div>
        
      )
    
    
  }else if(countryList.length >10){
    return(
      <div>
        <p>Too many matches, be more specific</p>
      </div>
    )
  }else if(countryList.length >0){
    return(
      <div>{countryList.map(c => <p>{c}</p>)}</div>
    )
  }else{
    return(
      <p>Enter a value first</p>
    )
  }

  
  
}



const Country = (country) =>{
  return (
    <p>{country.name}</p>
  )
}

const App = () => {
  const [countryNameList, setCountryNameList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  

  const onSearchChange = (event) => {
      console.log("search");
      event.preventDefault();
      setSearchTerm(event.target.value);
      //let response = gets.search(searchTerm);
      searchAction(event.target.value);
    }

  useEffect(() =>{
    

    gets.getAll()
    .then(fullList => {
      setCountryNameList(fullList.map(country => country.name.common))
      
    })
  },[])

  const searchAction = (sTerm) =>{
    
    let tempResults  = countryNameList.filter(x => x.toLowerCase().includes(sTerm));
    setCountryList(tempResults);
    console.log(countryList);

    
  }
  
  

  return (
    <div>
      <label>Search Countries:</label>
      <input onChange={onSearchChange} type="text"></input>
      <Countries countryList = {countryList}></Countries>
      <p></p>
    </div>
  )
}

export default App
