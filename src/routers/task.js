
const { request } = require("express")
const express = require("express")

const router = express.Router()
const auth = require('../middleware/auth')

const Task = require("../models/task")

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id

    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status.send(e)
    }




})

// GET /tasks?completed=false/true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc

// limit skip - adding support for pagination

router.get("/tasks", auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.completed) {
        match.complete = req.query.completed === "true"
    }
    if (request.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1


    }

    try {
        // const tasks = await Task.find(match)
        // res.send(tasks)
        // ANOTHER WAY TO GET THE JOB DONE
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort

            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }


})

router.get("/tasks/:id", auth, async (req, res) => {
    _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        // I will be able to get the tasks which only i have created
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

})

router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "complete"]


    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates!" })
    }

    try {

        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })


        if (!task) {
            res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()


        res.send(task)

    } catch (e) {

        res.status(400).send(e)


    }



})

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send()

    }
})


module.exports = router