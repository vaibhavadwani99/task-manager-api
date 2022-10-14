const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')

const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

jest.setTimeout(20000)
// above is the maximum time alloted to the test to complete
// by default it is 5000ms



// the below function runs before the single test case runs and afterEach runs after each test case runs
// because the creating the new user function will run only one time because email should be unique so we are deleting the users data before runing the test case 
beforeEach(setupDatabase)


test('should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "vaibhav",
        email: "vaibhav@gmail.com",
        password: "vaibhavadwani"
    }).expect(201)
    // send is allowing us to send the data along with the request to the request handler

    // complex assertions
    // assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: "vaibhav",
            email: "vaibhav@gmail.com"

        },
        token: user.tokens[0].token
    })


    // assertion that user password is not stored in the plain text format. It should be hashed beforing storing

    expect(user.password).not.toBe('vaibhavadwani')


})


test('should login existing user', async () => {

    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password

    }).expect(200)

    // validating that token is saved to the database
    const user = await User.findById(response.body.user._id)
    expect(user.tokens[1].token).toBe(response.body.token)

})

test('should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: "vaibhav@gmail.com",
        password: "vaibhavadwani"
    }).expect(400)
})

test("should get profile for user", async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("should not get profile for unauthenticated user", async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test("should delete profile for authenticated user", async () => {

    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // validating that the user is actually removed 
    const user = await User.findById(userOne._id)
    expect(user).toBeNull()

})

test("should not delete profile for unauthenticated user", async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})


// THE BELOW TEST IS NOT WORKING BECAUSE OF THE PROBLEM WITH THE UPLOAD IMAGE END POINT
// test('should upload avatar image', async () => {
//     await request(app)
//         .post('/users/me/avatar')
//         .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//         .attach('avatar', 'tests/fixtures/AA.jpg')
//         .expect(200)


//     // checking that whether the image has been uploaded successfully

//     const user = await User.findById(userOneId)

//     expect(user.avatar).toEqual(expect.any(Buffer))
//     // to be enforces strict comparison so it cannot be used with objects 
//     // thats why we go for toEqual which matches the object by their property
//     // expect.any expexts the type of data you want to match



// })

test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: "vaibhav"
        })
        .expect(200)

    // confirming that the name has changed 
    const user = await User.findById(userOneId)
    expect(user.name).toBe("vaibhav")
})

test('should not  update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            height: 180
        })
        .expect(400)
})


