var express = require('express');
const chats = require('../models/chats');
const router = express();
var Chat = require('../models/chats');
path = require('path');

var chatroom = path.join(__dirname, '../views/chatroom.ejs')

router.get('/chatroom', (req, res, next) => {
    console.log("chatroom");

    Chat.find({}, function (err, chat) {
        if (err){
            console.log(err)
        }
        else{
            // res.render(chatroom, {username:data.username, chats:chat});
            return res.status(200).json(chat)
        }
    });
    
}
)

router.post('/chatroom', (req, res, next) => {
    var message = req.body.message;
    console.log(message);
    console.log(req.session.userId);
    var newChat = new Chat({
        message: message,
        sender: req.session.userId,
    });
    newChat.save(next);
    return res.redirect('/chatroom');
}
)

module.exports = router;