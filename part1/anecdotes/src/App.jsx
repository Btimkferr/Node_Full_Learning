import { useState } from 'react'

const Button = ({onClick, text}) =>{
  return (
    <button onClick={onClick}>{text}</button>
  )
}


const TopAnecdote = ({anecdotes, topAnecdote,votes})=>{
  if(topAnecdote==-1){
    return(
      
      <div>
      <h2>Most Popular Anecdote:</h2>
      <p>Most popular will display here once you vote!</p>
    </div>
    )
  }
  return(
    <div>
        <h2>Most Popular Anecdote:</h2>
        <p>{anecdotes[topAnecdote]}</p>
        <p>This anecdote has {votes[topAnecdote]} votes.</p>
    
      </div>
    
  )
}
  



const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const tempVotes = Array(anecdotes.length).fill(0);
  const [votes, setVotes] = useState(tempVotes);
  const [topAnecdote,setTopAnecdote] = useState(-1);
  const [selected, setSelected] = useState(0);
  const [currentVotes, setCurrentVotes] = useState(selected);
  const [currentTopVotes, setCurrentTopVotes] = useState(-1);

  
  

  const checkTop = ()=>{
    
    var newTop = votes.indexOf(Math.max(...votes));
    console.log(newTop);
    if (newTop != votes[topAnecdote]){
      setTopAnecdote(newTop);
      setCurrentTopVotes()
    }
    
    
  }

  const voteAction = () =>{
    let newVotes = votes;
    console.log(newVotes);
    newVotes[selected] = newVotes[selected] +1;
    setVotes(newVotes);
    setCurrentVotes(newVotes[selected]);
    checkTop();
    

  }
  const nextAnecdote = () =>{
    let ranNum = Math.floor(Math.random(  )*anecdotes.length);
    console.log(ranNum);
    setCurrentVotes(votes[ranNum]);

    setSelected(ranNum);
  }
   
  

  return (
    <div>
      <div>
        <h1>Current Anecdote:</h1>
        <p>{anecdotes[selected]}</p>
        <p>This anecdote has {currentVotes} votes</p>
        <Button onClick = {voteAction} text='Vote' />
        <Button onClick = {nextAnecdote} text='Next Anecdote' />
      </div>
      <TopAnecdote anecdotes={anecdotes} votes={votes} topAnecdote={topAnecdote}/>
    </div>
  )
}

export default App