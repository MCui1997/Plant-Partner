# Plant Partner

## Description

A website for plant connoisseurs everywhere!
Plant Partner is a place to buy and sell plants with a sign up and login to save user information and plants for sale or purchased. It will use the Trefle api to gather information and photos of the selected plant. All information will be saved to a database for future usage.

Collaborators: [Kinzito17](https://github.com/Kinzito17) and [Jaesenix](https://github.com/Jaesenix)

## Technologies and Features

Technologies
```
* Treffle API
* Wiki API
* Node.js
* Sequelize
* Passport.js
* Restful API's and jQuery
```
Features
```
* Users can purchase or sell plants
* Plants will then populate buy or sell history
* Wallet will update (Please keep in mind wallet balance cannot decreased under 100 or exceed 1000)
* Search function for more information on plants
* Recently sold function on index page
```

## User Story
```
AS A buyer
I WANT to search for specific plants
SO THAT I can browse and purchase them

AS A seller
I WANT to be able to post plants for sale
SO THAT I can sell them
```
## Installation and Usage for Local
1. Run `db/schema.sql` to create your database
2. Make sure to create a `.env` file and copy the contents of `.env.example` into it.
3. In the `.env` file replace the ???? for SESSION_SECRET and set your db credentials in LOCALDB_URL
it should look something like this
```
SESSION_SECRET=SomethingBesidesKeyboardCat
LOCALDB_URL=mysql://root:dbpassword@localhost:3306/Project2Dev
```

## Screenshots

1. Main Page 

![Alt text](/screenshots/main.PNG "Optional Title")

2. Singup Page

![Alt text](/screenshots/signup.PNG "Optional Title")

3. Sell Page

![Alt text](/screenshots/sell.PNG "Optional Title")

4. Shop Page

![Alt text](/screenshots/buy.PNG "Optional Title")
