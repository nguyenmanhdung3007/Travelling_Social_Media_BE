const express = require('express');
const router = express.Router();

const userRouter = require('./user')
const postRouter = require('./post')
const vacationRouter = require('./vacation')
const albumRouter = require('./album')

router.use('/post', postRouter)
router.use('/vacation', vacationRouter)
router.use('/user', userRouter)
router.use('/album', albumRouter)

module.exports = router;