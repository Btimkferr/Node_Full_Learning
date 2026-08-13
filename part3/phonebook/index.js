const morgan = require('morgan');
const express = require('express');
const app = express()

morgan.token('body', getBody = (req)=>{
    return JSON.stringify(req.body);
})

app.use(express.json()); 
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

app.get('/api/persons', (request, response) =>{
    response.json(phonebook);
})

app.get('/info',(request,response) =>{
    let numberOfPeople = phonebook.length;
    const curTime = new Date();
    let responsePhrase = `<p>Phonebook has info for ${numberOfPeople} people</p>
    <p>${curTime}</p>`;
    response.send(responsePhrase);

})

app.get('/api/persons/:id', (request,response) =>{
    const id = request.params.id;
    const person = phonebook.find(p => p.id===id);
 
    if(person){
        response.json(person);
    }else{
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) =>{
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id!== id);

    response.status(204).end();
})

const generateId = () =>{
    let valid = false;
    while(!valid){
        const idAttempt = Math.floor(Math.random() * 10000);
        console.log(idAttempt);
        if (phonebook.filter(person => person.id===idAttempt)){
            return idAttempt;
        }
    }
}

app.post('/api/persons', (request, response) =>{
    const body = request.body;
    if (!body){
        return response.status(400).json({
            error: 'Body is missing'
        })
    }else if(!body.name || !body.number){
        return response.status(400).json({
            error: 'One or more fields are missing'
        })
    } else if(phonebook.find(person => person.name === body.name)){
        console.log(body.name)
        
        return response.status(400).json({
            error: 'Person already exists in phonebook'
        })

    } else if(phonebook.find(person => person.number === body.number)){
        return response.status(400).json({
            error: 'Number already in phonebook'
        })

    }
    const newID = generateId();

    

    const person = {
        id: newID,
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(person);
    response.json(person);
})





const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`);
})