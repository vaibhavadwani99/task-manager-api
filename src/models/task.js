
const mongoose = require('mongoose')




const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        // ref stands for the reference that is created between the user and the task model
    }
}, {
    timestamps: true
})

// created the schema and passed it to model

const Task = mongoose.model('Task', taskSchema)



// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     complete: {
//         type: Boolean,
//         default: false
//     },
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//         // ref stands for refernce that is creating the relationship between the user and the task model

//     }
// })



module.exports = Task