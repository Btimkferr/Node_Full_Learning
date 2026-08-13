import axios from 'axios';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'; 

const search = (searchTerm) =>{
    

    const request = axios.get(`${countryUrl}name/${searchTerm}`)
    return request.then(response =>response.data);

}


const getAll = () =>{
    const request = axios.get(`${countryUrl}/all`);
    return request.then(response => response.data);
}

export default {search,getAll}
