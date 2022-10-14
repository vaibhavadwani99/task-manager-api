const request = require('supertest')
const { text } = require('express')
const Task = require('../src/models/task')
const app = require('../src/app')

const { userOneId, userOne, setupDatabase, taskThree } = require('./fixtures/db')


beforeEach(setupDatabase)


test('should create task for user', async () => {

    const response = await request(app)
        .post('/tasks')
        .set('Authorizaton', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "complete the work"

        })
        .expect(201)


})


test("should get tasks for a user", async () => {
    const response = await request(app)
        .get('/tasks')
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // checking the length of response it should be 2 
    expect(response.body.length).toBe(2)
})


test("second not delete other user task", async () => {
    await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(404)
    // making sure that above task is in the database 
    const task = Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})