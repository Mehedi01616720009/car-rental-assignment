# A complete express typescript with mongoose project

# First setup steps of this project locally

1. clone the github repository "https://github.com/Mehedi01616720009/car-rental-assignment.git"
2. run "npm install" command
3. create a ".env" file in root directory and store { NODE_ENV, PORT, DATABASE_URL, ACCESS_SECRET, BCRYPT_SALT_ROUNDS }
4. create a dist folder in root directory
5. run "npm run build" command
6. run "npm run start" command

===========================
Project Descriptions
===========================

This application contains a simple car rental management system's APIs. This application uses express, typescript, mongoose for building api. There is a signup and signin api for authentication and get token for access others routes. I have not create refresh token. There is get only access token. Every routes are also binded by authorize guard for user access authorization. There is a car management api that serves create, update, return car from buyer user and soft delete to only admin user. And get route for all users. Additionally there is a booking route that serves get route for only admin. And create bookings and get my bookings for buyer users. There are two layers of validations. Zod library used for 1st layer validations. this serve a same type of response for creating friendly environment for frontend developer and also for banckend developer to understand the application. And there has also implemented global error handler for manage all errors in one centered point.

===========================
Additional Attachments
===========================

#This application comply with this ER Diagram: https://drive.google.com/file/d/1qN1FyY-WRTSR3W50iuQf88T6eRgpgNxS/view?usp=sharing

#This application also comply with this Documentations: https://docs.google.com/document/d/1ZwI30F8_5pL9RNA4ZZuo6OQvxeHnFf6B7KYz5A-M3Nc/edit?usp=sharing
