import { useState, useEffect, use } from 'react';
import axios from 'axios';
import comms from './services/phoneAccess';
import Notification from './components/Notification';

const Person = ({person,delAction}) =>{
  return (
    <div>
      <p key={person.id}>{person.name} Num: {person.number} <button onClick ={() => delAction(person.id,person.name)} >Delete</button></p>
      
    </div>
  )
}
const Persons = ({persons,filter,delAction}) =>{
  return(
    <div>
        {persons.map(person =>{
          if(person.name.toLowerCase().includes(filter.toLowerCase())){
            return(
            <Person key={person.id} person={person} delAction={delAction}/>
            
          );
          }
        })}
      </div>

  )
}



const AddPerson = ({newNumber,newName,persons,setNewName,setNewNumber,setPersons,notifyMessage,setNotifyMessage,positiveNotification,setPositiveNotifcation}) =>{
  const addName = (e)=>{
    e.preventDefault();
    console.log("adding name");
    const existingPerson =persons.find(person=>person.name === newName || person.number === newNumber)
    if(existingPerson){
      
      if(window.confirm(`${newName} is already in your phonebook. Would you like to update the number?`)){
        const updatedPerson = {...existingPerson, number:newNumber}
        comms.update(existingPerson.id, updatedPerson).then(
          returnedPerson => {
            setPersons(persons.map(person=> person.id === existingPerson.id ? returnedPerson : person));
            setNotifyMessage(`Successfully updated ${updatedPerson.name}'s number`);
            setNewName('');
            setPositiveNotifcation(true);
            setNewNumber(''); 
              setTimeout(() =>{
            setNotifyMessage(null);
            }, 5000);
          }
        ).catch(
          error=>{
            setPositiveNotifcation(false);
            setNotifyMessage(`Error:${error} updating person`);
            setTimeout(() =>{
              setNotifyMessage(null);
            }, 5000);
          }
        )
      }
    }else{
      let newPersons = {
        name:newName,
        number:newNumber
      };
      comms.create(newPersons).then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson));
        setPositiveNotifcation(true);
        setNotifyMessage(`Successfully added ${newPersons.name}`);
        setTimeout(() =>{
          setNotifyMessage(null);
        }, 5000);
        setNewName('');
        setNewNumber('');
      })
      
  }
  }

  const handleNameChange = (e)=>{
    e.preventDefault();
    setNewName(e.target.value);
  }
  const handleNumberChange = (e)=>{
    e.preventDefault();
    setNewNumber(e.target.value);
  }

  return(
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input  value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({filter,setFilter}) =>{
  const handleFilterChange = (e) =>{
    e.preventDefault()
    
    setFilter(e.target.value);
  }

  return (
    <div>
      Filter search<input value={filter} onChange={handleFilterChange}></input>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [positiveNotification, setPositiveNotifcation] = useState(true);

  

  const hook = () =>{
  
  comms.getAll().then(returnedPeople => {
    console.log(returnedPeople);
    setPersons(returnedPeople);
  });

  }
  useEffect(hook,[]);

  const delAction = (id,name) =>{
    
    if(window.confirm(`Are you sure you want to delete ${name}`)){
      
      comms.deletePerson(id).then(response=>{
        const tempPersons = (persons.filter(p => p.id != id));
        setPersons(tempPersons);
        console.log(response.data);
        setPositiveNotifcation(true);
        setNotifyMessage(`Successfully deleted ${name}`);
        setTimeout(() =>{
          setNotifyMessage(null);
        }, 5000);

     }) 
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notifyMessage} positive={positiveNotification}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>Add a new person to your phonebook</h2>
      <AddPerson newName={newName} newNumber={newNumber} persons={persons} setNewName={setNewName} 
      setPersons = {setPersons}setNewNumber={setNewNumber} notifyMessage={notifyMessage} 
      setNotifyMessage={setNotifyMessage} positiveNotification={positiveNotification} setPositiveNotifcation={setPositiveNotifcation}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} delAction={delAction} />
    </div>
  )
}
export default App