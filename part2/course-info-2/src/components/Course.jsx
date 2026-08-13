const Header = ({title}) => <h1>{title}</h1>



const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises ={part.exercises} />)}
    
  </div>
)

const Part = ({name, exercises, id}) => (
  <p >
    {name} {exercises}
  </p>
)

const Course = ({course}) =>{
  
  return (

    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    
    </div>

  )

}

const Total = ({parts}) =>{
  let total = parts.reduce((sum, part) =>{
    return sum + part.exercises;
  }, 0)
  return( 
    <p><b>Total of {total} exercises </b></p>
  )
}

export default Course