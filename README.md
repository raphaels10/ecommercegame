## WolfStore

A game-oriented e-commerce website project which will function as a marketplace, where users can register their products for sale and other users can buy it. 

### Initial setup 

To have access to the project, you must have Node.js and MongoDB installed in your machine. You will have to manually set the .env file in the backend folder. It must contain a secret key for the json webtokens and the password of your SMTP transport. You'll also have to set up your own SMTP transport in "backend/config/smtp.js". You can simply create a GMail/Hotmail account and use it as your transport if you wish to!

**Example of .env file:**

```
module.exports = {
    secret: "*#DIJ@Id29_swK6HuTNy#Pkz%_a",
    smtpPass: "my_email_pass"
} 
``` 


Finally, you'll have to install the dependencies in both the frontend and backend folder, by simply typing a "npm install" or a "yarn add" in the terminal.

To start the server, make sure mongoDB is running in your machine by simply typing "mongod" in the terminal, then navigate to the backend folder in your command prompt and do a **npm run dev**. To start the frontend application, navigate to the frontend folder in your command prompt and do a **npm start**. Make sure the ports **3000** and **3001** aren't in use in your local machine, since the applicaton will be running on them. 

It's important to note that the site is still in development stage, so there are some missing features.

### Current ongoing features 

### `Authentication and validation`

The authentication system includes a Sign Up form, in which users must fill it out with their name, e-mail address, password and also upload a profile picture, which will be stored in a public Firebase Storage. Furthermore, to be able to Log In, you must confirm your email address, so make sure to check your e-mail, including the spam folder. It also includes a form for recovering your password, that will send you an e-mail with a link to redefine your password. Users can also change their password, name and profile picture in the "My account" section.

After logging into the website, a json webtoken will be issued and stored in the cookies of the user to keep him logged in. A secondary token (this one isn't a JWT, just a random numerical token) will also be issued and stored in the Local Storage of the user, to prevent Cross-Site Request Forgery (CSRF) attacks. 

### `Registering a product`

Since the website will function as a Marketplace, an user can register his products for sale in the "Announce Product" section. The product register form must be filled out with the name of the game that the product belongs to, the name of the product, product description as well as the price and the available quantity of the product. The user also has the option to upload up to four pictures for his product. The pictures will also be stored in a public Firebase Storage.

### `Chat with other users`

You can start a conversation with other users by simply navigating to their profiles and sending them a message. When you start a conversation with someone, the chat window will be available in "My account > Messages" and it'll function as an AJAX Chat, sending requests to the server every 1.5 seconds to fetch new messages (i intend to turn it into a real-time websocket chat later).

### `Search for a specific product`

There's a search form in the navigation bar in which an user can search for a specific product. It will display all products in which its name matches with the searched text.

### `Filter product by game name`

In the navigation bar, you can filter the products according to the game they belong to.

### `Comment on a product`

Users can send comments to a product as well as reply to them.

### `Add product to cart` 

Users can add products to the cart as well as remove them. You can't add products from different vendors to the chart neither your own products. The Cart info is stored in the cookies for 24 hours, so if you add a product to the cart while logged off, it will still be there after you log in.

### `Edit and remove products`

You can edit your own products by simply navigating to their page. You can change every information from the product, except for the pictures. To delete a product, simply go to your profile and remove it by clicking on the trash can icon.



