const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

require('dotenv').config();

const PORT = process.env.PORT || 9000;

const users = [
    {
        username: 'user1',
        password: 'password1'
    },
    {
        username: 'user2',
        password: 'password2'
    },
    {
        username: 'user3',
        password: 'password3'
    }
]

app.get('/api/users', (req, res) => {
    res.status(200).json({users: users});
})

app.post('/api/register', (req, res) => {
    const {username, password} = req.body;
    if(username && password){
        users.push({username, password});
        res.status(201).json({username, password});
    }else{
        res.status(400).json({message: 'Please input a username and a password'});
    }
})

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    if(username && password){
        const possibleUsers = users.filter(user => user.username === username && user.password === password)
        if(possibleUsers.length > 0){
            res.status(200).json({username, password});
        }else{
            res.status(404).json({message: 'User with that username and password was not found'});
        }
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})