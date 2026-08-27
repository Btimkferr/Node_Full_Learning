const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log("Connecting to...",url);

mongoose.connect(url, {family:4}).then(result=>{
    console.log("Connected");
}).catch(error=>{
    console.log("error connecting :", error.message);
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,

    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v){
                if(/^\d{3}-\d/.test(v) || /^\d{2}-\d/.test(v)){
                    return  true;
                }
                return false;
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User Phone number required']
    },
})

const opts = {runValidators:true};

personSchema.set('toJSON',{
    transform: (document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);


