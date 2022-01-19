# Clothing Shop
This website includs every little detail that a clothing shop needs:
from registering as a client to order delivery to your home. 
There is Admin and clients accounts in the system.

Landing page: 
Devide to three parts: info part, me part and login
The info part presents in real time all the orders that has been submitted and the amount of products that are still availlable in the website
The me part expliend about me and my store (my real story)
And a login page or pass to register page.
After log in the info page update with the last prusche or open cart info he have

Register page: 
Built with a few stages, some of the features you can find is checking in real time if ID is already exist in the DataBase and comparing passwornd with confirm password.

Store page:
Devide to two parts: cart and store
If the client already save a products from last visit its showing in the cart
The cart shows all the products photo name amount and price
For each produxt there is an option to delete prodcuts from the cart
There is a total price (whos every change get update) and an oprion to clean the cart 
The store is divided to catagories
In each catogry there is a few products
When a client choose to add a product to his cart he choose how many items he wantes and the adding in real time
There is also a search from any products from all catagorys

Order page:
Devide to two parts: checkout and order form
A last chance to the client to see and search (with marker) inside his checkout cart
He can come back to the store and countinue shopping
In the order page double click on the inputs fills the address of the client from the DataBase.
There is limitation for 3 deliverys in a day, so when the day full in deliverys the client cant choose this day.
There is a validation to credit card.
After saving order there is an option to download a recipt as text document
As an admin instead of store page there is a work page
Where the admin can search for products and see them devided to catagorey
He can add some new products or to edit the exist ones.

The website is sensitive to back button, where an log out is made there is not possible to forward store page and so
All The deisgn by me.

Front: Angular and Material

Back: NodeJS Express

DB: MySQL
