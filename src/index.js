const express = require('express')
require('./db/mongoose')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("app is running at port " + port)
})



// registering the middleware
// parameter is the middleware function
// example function which can be ised in case of sitr maintenance
// app.use((req, res, next) => {

//     res.status(503).send("the site is under maintenance ...please try again sometime later")


//     // next is necessary to be called for the route handler to run

// })

app.use(express.json())
// above tells that whatever data is being received parse it and convert it into javascript object


// basic structure of router
// to use router you need to register it in express using app.use(router)
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('this is fromany other router')
// })
// app.use(router)


// express provides us with all the methods of http

app.use(userRouter)
app.use(taskRouter)
//
// without middleware: new request -> run route handler
//
// with middleware : new request -> do something(function that runs) -> run route handler


const jwt = require("jsonwebtoken")


// BASIC STRUCTURE OF HOW BCRYPT WORKS
// const myFunction = async () => {

//     const token = jwt.sign({ _id: 'abc123' }, "thisismynewcourse", { expiresIn: "7 days" })
//     console.log(token)

//     const data = jwt.verify(token, "thisismynewcourse")
//     console.log(data)





// }

// myFunction()


// WHAT DOES toJSON() FUNCTION IS DOING
// const pet = {
//     name: "mike"
// }


// pet.toJSON = function () {
//     return {}

// }

// console.log(JSON.stringify(pet))

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById("6344523b8ab3a4a521d950ee")
//     // await task.populate('owner')
//     // // the above will give u the user profile on the basis of owner id
//     // console.log(task.owner.toString())

//     const user = await User.findById('63444f19c5c30a6468f33e68')
//     await user.populate('tasks')
//     console.log(user.tasks)




// }

// main()

// HOW TO EORK WITH FILE UPLOADS----> BY SETTING UP MULTER
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//         // filesize is setting the limits to the file size...size is to be provided in bytes
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error("please upload a word document"))

//         }
//         // above rejects the file if pdf is not uploaded

//         cb(undefined, true)
//         // acceptance of the file uploaded


//     }
//     // dest contains the name of the folder where all of the files will be uploaded
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })

// })



