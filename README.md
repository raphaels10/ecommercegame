## WolfStore

A game-oriented e-commerce website project i'm currently working on, which will function as a marketplace, where users can register their products for sale and other users can buy it. 

To have access to the project, you must have Node.js and MongoDB installed in your machine. You will have to manually set the .env file in the backend folder. It must contain a secret key for the json webtokens and the password of your SMTP transport. You'll also have to set up your own SMTP transport in "backend/config/smtp.js" and change it accordingly in the files "backend/auth/forgotpass.js" and "backend/auth/signup.js". You can simply create a GMail/Hotmail account and use it as your transport if you wish to! 

Finally, you'll have to install the dependencies in both the frontend and backend folder, by simply typing a "npm install" or a "yarn add" in the terminal. 

## Current Features 

### `Authentication and validation`

The authentication system includes a Sign Up form, in which users must fill it out with their name, e-mail address, password and also upload a profile picture, which will be stored in a public Firebase Storage. Furthermore, to be able to Log In, you must confirm your email address, so make sure to check your e-mail, including the spam folder.


