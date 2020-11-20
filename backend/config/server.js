const express = require('express')
const app = express()

const Product = require('../database/products')

const login = require('../auth/login')
const signup = require('../auth/signup')
const validatetoken = require('../auth/validatetoken')
const verifyaccount = require('../auth/verifyaccount')
const forgotpass = require('../auth/forgotpass')
const changepass = require('../auth/changepass')
const logout = require('../auth/logout')
const userdata = require('../auth/userdata')

const addproduct = require('../products/addproduct')
const getproducts = require('../products/getproducts')
const getproduct = require('../products/getproduct')
const editproduct = require('../products/editproduct')
const deleteproduct = require('../products/deleteproduct')
const addcomment = require('../products/comments/addcomment')

const sendmessage = require('../messages/sendmessage')
const conversationmessage = require('../messages/conversationmessage')

const finduser = require('../user/finduser')
const changeuserinfo = require('../user/changeuserinfo')

const emailticket = require('../other/emailticket')

const cors = require('./cors')

const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cors)
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.post('/login', login)
app.post('/signup', signup)
app.get('/logout', logout)
app.post('/validateToken', validatetoken)
app.post('/forgotPass', forgotpass)
app.post('/changePass', changepass)
app.get('/confirm/:token', verifyaccount)
app.post('/products', addproduct)
app.put('/products', editproduct)


app.get('/products', getproducts)
app.get('/products/:id', getproduct)
app.delete('/products/:id', deleteproduct)
app.post('/addcomment', addcomment)
app.post('/userdata', userdata)
app.post('/sendmessage', sendmessage)
app.post('/conversationmessage/:id', conversationmessage.post)
app.get('/conversationmessage/:id', conversationmessage.get)

app.post('/contactus', emailticket)

app.post('/finduser', finduser)
app.post('/changeuserinfo', changeuserinfo)



app.listen(3001, () => {
    console.log("Escutando a porta 3001")
})

