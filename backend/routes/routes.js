const express = require('express');
const router = express.Router();
const verifyToken=require('../middleware/verifytoken')
const user_controller=require('../controllers/user.controller')
const chat_controller=require('../controllers/chat.controller')

router.post('/register',user_controller.register);
router.post('/login',user_controller.login);
router.post('/forgotpassword',user_controller.forgot)
router.post('/reset',verifyToken.checkToken, user_controller.reset)
router.post('/message',chat_controller.message)
router.get('/getAllUsers',user_controller.getAllUsers)
router.get('/getAllChats',chat_controller.getAllUsersChat)

module.exports=router;