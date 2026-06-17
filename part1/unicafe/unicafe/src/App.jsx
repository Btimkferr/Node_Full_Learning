import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Statistics = ({good,bad,total,neutral}) =>{
  if(total>0){
  return (
    <div>
      
      
        <h3>Statistics</h3>
      <table>
        <tbody>
        <StatisticLine text="Good:" value ={good} />
        <StatisticLine text='Neutral:' value ={neutral} />
        <StatisticLine text='Bad:' value ={bad} />
      
      
      
        <StatisticLine text='Average rating:' value ={(good/(good+bad))} />
        <StatisticLine text='Average Positive Rating:' value={(good/total *100).toString() + "%"} />
      </tbody>
      </table>
    </div>
  )}
  return(
    <div>
      <h3>Statistics</h3>
      <p>Please enter a rating first.</p>
    </div>
  )
}

const StatisticLine = ({text, value}) =>{
  return (

    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0);

  const goodClick = () => {
    const newGood= good+1;
    setTotal(bad+newGood+neutral);
    setGood(newGood);
  }
  const neutralClick = () =>{
    const newNeutral= neutral+ 1;
    setTotal(bad+good+newNeutral );
    setNeutral(newNeutral);
  }
  const badClick = () =>{
    const newBad= bad+1;
    setTotal(newBad+good+neutral);
    setBad(newBad);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={goodClick} text='Good'/>
      <Button onClick={neutralClick} text='Neutral'/>
      <Button onClick={badClick} text='Bad'/>

      
      
      
      <Statistics good={good} bad={bad} total={total} neutral={neutral} />

    </div>
  )
}

export default App