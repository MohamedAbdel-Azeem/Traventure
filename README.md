
<p align="center">
<img src="client/src/assets/logocolored.png" width="400" />
  

</p>


# Traventure
## Table of Contents  
1. [Motivation](#-motivation)
2. [Build Status](#-build-status)
3. [Code Style](#-code-style)
4. [Tech and Frameworks used](#%EF%B8%8F-tech-and-frameworks-used)
5. [Features](#-features--screenshots)
6. [Code Examples](#-code-examples)
7. [Installation](#%EF%B8%8F-installation)
8. [API Reference](#-api-reference)
9. [Tests](#-tests)
10. [How to Use](#-how-to-use)
11. [Contribute](#-contribute)
12. [Credits](#-credits)
13. [License](#-license)

---

## Motivation  
Welcome to Traventure, an all-in-one travel platform designed to make vacation planning effortless and exciting! Whether you're dreaming of exploring historic landmarks, unwinding on relaxing beaches, or embarking on family-friendly adventures, our app brings everything together to create the perfect trip. With features tailored to simplify planning and enhance your travel experience, we’re here to turn your dream destinations into reality.

---

## Build Status  

- Still under development and not deployed yet
- Regular updates planned to add new features and improvements.  
- No known issues as of now.  
---

## Code Style  

We follow a consistent code style using **Prettier** 

The  full team uses **Prettier**  as its linter which automatically works when saving (ctrl + s)


---

## Tech and Frameworks used  
- NodeJs
- Express
- ReactJs
- MongoDB
- Mongoose
- TypeScript
- Prettier



---

## Features

### User Registration 

- Register as a tourist/tourguide/seller/advertiser with essential details
 

### User Authentication 

- Login and logout securely

### Administrator Functions

- Add another administrator
- Accept or reject tour guides and advertisers and sellers.
- View documents uploaded by Tourguide, Advertisers or sellers


### Account Management:

- Change password. 
- Reset forgotten password via email. 
- Edit/update email or affiliation.

### Seller Functions

- Add a new product
- View sales


### Tourist Functions

- Access the shop
- View available Itineraries, activities, bookings, hotels and flights

Activities management
 - Filter activities by date,budged,tag or language
 - Sort activities by price 



### Iterinary management


- Tour Guide can create/read/update/delete an itinerary 
- Tourists can view and filter itineraries based on various criteria


### Wallet management

- Receive a refund in the wallet for canceled appointments.
- View the amount in the wallet.

---

## Code Examples  





---

## Installation  





---

## API Reference  


<details>
<summary> Activity Endpoint </summary>

`POST /add` -Add a new activity

`GET /` -Get all activities

`GET /:username`  -Get activities of a certain advertiser

`DELETE /delete/:id`   -Delete activity by its ID

`PUT /update/:id`   -Update activity by its ID

`PATCH /toggleInappropriate/:id`  - Updates a certain field (toggleInappropriate) in an activity 

</details>

<details> 
<summary> Admin Endpoint </summary>

`POST /add`  -Creates a new admin

`GET /all`   -Get all users

`POST /add/governer`  -Creates a new governer 

`DELETE /delete/user/:username/:type`  -Deletes user

`GET /externalSellers` -Gets all sellers

`GET /revenues`  -Gets all revenues

`GET /numberofusers`  -Gets the number of users

</details> 


<details> 
<summary> Advertiser Endpoint </summary>

`POST /add`  -create a new advertiser
`GET /:username`  -get an advertiser by username
`PATCH /update/:username`  -change username of a user
`GET /revenue/:username`   -get revenue of a certain advertiser
`GET /numstats/:username`  -get statistics of a certain advertiser
</details> 

<details>
<summary>Auth Endpoint</summary>

`POST /auth` -Checks permission of a user by verifying the access token
</details> 

<details>
<summary>Booking Endpoint</summary>
`POST /add`  -Create a new booking

`GET /:username`   -Get all bookings of a user

`GET /getHotels/:username`  -Get hotel bookings of a user

`DELETE /cancel/:booking_id`  -Cancel  booking by its ID

`POST /addFlight/:username`  -Create a new flight booking for a user

`POST /addHotel/:username`  -Create a new hotel booking for a user

</details> 

<details>
<summary>Category Endpoint</summary>

`POST /add`  -Create a new category
`GET /`   -Get all categories
`DELETE /delete/:id`   -Delete a category by ID
`PUT /update/:id`   -Update a category by ID
</details>

<details>
<summary>ChangePassword Endpoint</summary>

`PATCH /changePassword`   -Updates a user's password
</details>

<details>
 <summary>Complaint Endpoint</summary>

`POST /add`  -Create a new complaint

`PATCH  /update/:complaintId`  -Update a complaint by its ID

`GET /`  -Get all complaints

`GET /:complaintID`   -Get a complaint by its ID
</details>

<details>
<summary>Current_user Endpoint</summary>
`GET /me/:username` -Get the current user's username
</details>

<details>
<summary> Feedback Endpoint </summary>

`POST /rateItinerary/:itineraryId` -Add  new rating for an itinerary

`POST /rateTourGuide/:tourGuideUserId`  -Add new rating for a tourguide

`POST /rateActivity/:ActivityId`  -Add new rating for an activity

`GET /canfeedback`   -Checks if a tourist can provide feedback for a tourguide

`GET /showTourGuideReviews/:tourGuideUserId`  -Gets reviews of a certain tourguide by ID

`GET /showActivityReviews/:ActivityId`  -Gets reviews of a certain activity by its ID

`GET /showItineraryReviews/:itineraryId` -Gets reviews of a certain itinerary by its ID
</details>

<details>
<summary> Governer Endpoint</summary>

`POST /add/HistoricalTag`  -Adds  new historical tag
</details>

<details>
<summary>historicalTags Endpoint</summary>
`POST /add`  -Creates a new historical tag
</details>

<details>
<summary> Itinerary Endpoint </summary>
`POST /add`  -Creates a new itinerary

`GET /`  -Gets all itineraries

`GET /:username`  -gets itinerary of a specific user

`GET /get/:itinerary_id`  -gets itinerary by its ID

`PATCH  /update/:id`  -updates an existing itinerary based on its ID

`DELETE /delete/:id`  -deletes an itinerary

`PATCH /toggleActivation/:id`  -toggles the activation status of an itinerary by its ID

`PATCH /toggleInappropriate/:id`  -toggles the "inappropriate" status of an itinerary based on its ID
</details>

<details>
<summary> Places Endpoint</summary>
`GET /`  -gets all places

`GET /:id`  -gets a place by its ID

`POST /add` -Adds a new place

`PATCH /update/:id` -updates a place based on its ID

`DELETE /delete/:id`  -deletes a place
</details>

<details>
<summary> preferenceTags Endpoint </summary>
`POST /add`  -Adds a new preference tag
`GET /`  -gets all preference tags
`DELETE /delete/:id`  -deletes a preference tag by its ID
`PUT /update/:id`  -updates a preference tag by its ID
</details>

<details>
<summary> Product Endpoint </summary>
`POST /add` -Adds a new product

`GET /`  -gets all products

`PATCH /update/:id` -updates a product by its ID

`PATCH /archive/:id`  -Archives a product based on its ID

`PATCH /feedback/:productid`  -Updates feedback for a product based on its ID
</details>

<details>
<summary> PromoCodes Endpoint </summary>
`GET /use/:name`  -uses promo code by its name

`GET /check/:name`  -checks if promo code is still in use by its name
</details>

<details>
<summary> purchase Endpoint </summary>
`POST /buy`   -Adds product to user's cart

`GET /tourist/:touristUsername`  -Gets all the purchases made by a specific tourist

`GET /seller`  -Gets sales information for a seller

`POST /deliver`  -Marks a purchase as delivered

`POST /cancel`  -Used to cancel a purchase
</details>


<details>
<summary> RequestDelete Endpoint </summary>

`DELETE /deleterequestdelete`   -Deletes a user's account deletion request
</details>

<details>
<summary> ReviewDoc Endpoint </summary>
`GET /pendingusers`   -gets all pending users

`PATCH /acceptuser`   -updates the status of a user whether accepted or rejected
</details>

<details>
<summary> Seller Endpoint </summary>
`POST /add`  -create a new seller user

`GET /:username`  -Gets a certain seller

`PATCH /update/:username`  -Update a certain seller by his username
</details>

<details>
<summary> TourGuide Endpoint </summary>

`POST /add`  -create a new tourguide user

`GET /username`  -gets a certain tourguide

`PATCH /update/:username`   -updates a tourguide by his username

`GET /revenue/:username`  -get revenues of a tourguide by his username

`GET "/userstats/:username`  -get stats of users interacting with a tourguide's itinerary
</details>

<details>
<summary> Tourist Endpoint </summary>
`POST /add`  -create a new tourist user

`GET /upcoming` -get all upcoming activities

`GET /:username`  -get a certain tourist's user profile

`PATCH /update/:username`  -update a user

`GET /bookings/:username`  -get all bookings of a certain tourist

`GET /upcoming/:username`  -get all upcoming activities of a certain tourist

`GET /complains/:username`  -get all complaints of a certain tourist

`GET /bookmarks/:username`  -get bookmarks of a certain tourist by his username

`PATCH /updateWallet/:username`  -update a tourist's wallet by his username

`PATCH /bookmark_activity/:username`  -bookmark an activity for a certain tourist

`PATCH /bookmark_itinerary/:username`   -bookmark an itinerary for a certain tourist

`POST /wishlist/:username`  -Add to a wishlist of a tourist

`GET /promo_code/get/:username`  -get promo codes used by a tourist 

`PATCH /promo_code/use/:username` -update the status of a promo code for a specific tourist

`GET /skipTutorial/:username` -gets the status of whether a specific tourist has skipped a tutorial

`PATCH /skipTutorial/:username`  -allows a user to mark their tutorial as "skipped".
</details>

---

## Tests  
We  use Postman to manually test all our api references by making sure the response is as expected.

Here are examples of testing one of our endpoints using Postman:

![Adding a new admin user 1](client/src/assets/addnewadmintest.png)  

![Getting count of users](client/src/assets/getcountuserstest.png)  

---

## How to Use  






---

## Contribute  
We welcome contributions to Traventure. All you need to do is:

1- Fork the repo

2- Create a new branch (git checkout -b my-new-feature)

3- Make changes

4- Commit your changes (git commit -am 'Add some feature')

5- Push to the branch (git push origin my-new-feature)

6- Create a new Pull Request

7- Wait for your PR to be reviewed and merged

---

## Credits  
### Docs 

[Tailwind docs](https://v2.tailwindcss.com/docs)

[Jwt docs](https://jwt.io/introduction)

[React docs](https://legacy.reactjs.org/docs/getting-started.html)

[Prettier docs](https://prettier.io/docs/en/)


### Youtube Videos



---

## License  
The software is open source under the Apache 2.0 License.



[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
