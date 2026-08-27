require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const Person = require('./models/person');
const app = express()

morgan.token('body', getBody = (req) => {
    return JSON.stringify(req.body);
})

app.use(express.json()); 
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons=>{
        response.json(persons);
    })
})

app.get('/info',(request,response) => {
    

    const curTime = new Date();
    Person.countDocuments({}).then(numberOfPeople=>{
        response.send(`<p>Phonebook has info for ${numberOfPeople} people</p>
            <p>${curTime}</p>`)
    })
    

})

app.get('/api/persons/:id', (request,response) => {
    const id = request.params.id;
    Person.findById(id).then(person=>{
        response.json(person);
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(result=>{
        response.status(204).end();
    }).catch(error=>next(error));

})

const generateId = () => {
    let valid = false;
    while(!valid){
        const idAttempt = Math.floor(Math.random() * 10000);
        console.log(idAttempt);
        if (phonebook.filter(person => person.id===idAttempt)){
            return idAttempt;
        }
    }
}

app.post('/api/persons', (request, response,next) => {
    const body = request.body;
    console.log("hi");
    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson=>{
        response.json(savedPerson);
    }).catch(error => next(error));
    
})

app.put('/api/persons/:id', (request,response,next) => {
    const {name, number} = request.body;

    Person.findById(request.params.id).then(person=>{
        if(!person){
            return response.status(404).end();
        }
        person.name = name;
        person.number = number;
        

        return person.save().then(updatedPerson => {
            response.json(updatedPerson);
        }).catch(error => next(error));
        
    })
})


const errorHandler = (error, request, response, next)  => {
  console.error(error.message);
   if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    console.log(error.name);
    return response.status(400).json({ error: error.message })
  }

  next(error);
}

app.use(errorHandler);

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "Unknown endpoint"});
}
app.use(unknownEndpoint);




const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})