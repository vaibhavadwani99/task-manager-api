const express = require("express")

const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')


const router = new express.Router()

const User = require('../models/user')



router.post("/users", async (req, res) => {
    const user = new User(req.body)
    // console.log(user)





    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })

    } catch (e) {

        res.status(400).send(e)



    }





})

router.post('/users/login', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })

    } catch (e) {

        res.status(400).send(e.message)

    }
})

router.post('/users/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => req.token !== token.token)
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send()

    }


})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)



})

// WE DONT NEED THE BELOW ROUTE BECAUSE OF THE ABOVE ROUTE

// router.get('/users/:id', async (req, res) => {
//     // req.params contain all the request parameters in this case this is id
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()

//         }
//         res.send(user)



//     } catch (e) {
//         res.status(500).send()

//     }




// })


router.delete("/users/me", auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()

        // }

        await req.user.remove()

        res.send(req.user)

    } catch (e) {

        res.status(500).send()

    }
})

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body)
    // object.keys will convert earch property of the object into an array of strings

    const allowedUpdates = ["name", "email", "password", "age"]

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" })
    }
    try {
        const user = req.user

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()


        // this complete thing is done because findByIdAndUpdate bypass middleware


        // new:true makes sure that we get the new user after applying the updates
        // validators:true makes sure that validators are run on the updated value
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })



        res.send(user)

    } catch (e) {
        res.status(400).send(e)

    }
})


const upload = multer({
    // dest: "avatar",

    limits: {

        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(JPG|JPEG|PNG)$/)) {
            return cb(new Error("file should be in jpg/jpeg/png format"))
        }

        cb(undefined, true)
    }
})



router.post('/users/me/avatar', auth, upload.single("avatar"), async (req, res) => {
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, heigth: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    // the above option is accessible only if the dest option is disabled above
    res.send()
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message })
})


router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined    // this is working.... the field is getting removed from the database
    // delete req.user.avatar ------> this is not working ..the field is not getting removed from the database(dont know why)

    await req.user.save()
    res.send()

})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()

    }
})






module.exports = router