import express from 'express'

const userRoutes = express.Router(); // Use Router instead of express()

userRoutes.post('/login', (req, res) => {
    console.log("logsfin bodysf  ", req.body)
    res.send(req.body)

})

export default userRoutes