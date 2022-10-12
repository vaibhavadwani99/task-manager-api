

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)

// callback function would be called once we connect to the database
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {

    if (error) {
        return console.log("unable to connect to database")
    }

    const db = client.db(databaseName)

    // INSERTING THE DOCUMENT


    // db.collection('users').insertMany([{
    //     name: "vishal",
    //     age: 12
    // }, {
    //     name: "saurabh",
    //     age: "20"
    // }], (error, result) => {
    //     if (error) {
    //         return console.log("could not insert users")
    //     }
    //     console.log(result)
    // })

    // FINDING THE DOCUMENT

    // find one requires 2 function first is object and second is function
    // object is used to specify the search criterisa

    // db.collection('users').findOne({ _id: new ObjectID("633eb5751f6f7807cc4e7bf4") }, (error, user) => {

    //     if (error) {
    //         return console.log("unable to fetch")
    //     }

    //     console.log(user)


    // })
    // unlike findOne find does not take call back function as the second argument rather it returns a cursor and cursoe is the pointer to that data in the database

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })
    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     console.log(count)
    // })


    // UPDATING THE DOCUMENT
    // db.collection('users').updateOne({
    //     _id: new ObjectID("633eb5751f6f7807cc4e7bf4")
    // }, {
    //     $inc: {
    //         age: 1
    //         // increments the age by 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // update many 
    // db.collection('users').updateMany({
    //     age: 27
    // }, {
    //     $set: {
    //         age: 28
    //     }
    // }).then((data) => {
    //     console.log(data)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // DELETE THE DOCUMENTS
    db.collection('users').deleteMany({
        age: 28
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })







})
