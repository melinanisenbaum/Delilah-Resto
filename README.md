# Delilah-Resto
 Proyecto 3 ACAMICA. BackEnd

Used technology
Node.js
Nodemon Library
Express Library
Sequelize Library
Json Web Token (JWT)
MySQL
Postman
Swagger

Step 1: Clone Project:
Clone repository from https://github.com/melinanisenbaum/Delilah-Resto.git

Open terminal and run: mkdir delilah_resto git clone https://github.com/melinanisenbaum/Delilah-Resto.git

Step 2: Install dependencies detailed in package.json as "dependencies"
In the root directory where the project was cloned run from the terminal:
npm install

Step 3: Set environment variables
Open file config.js located inside the folder config of the cloned project and create your .env file
Replace all variables by your mysql and jwt secret configuration
Step 4: Create the database
Install mySQLWorkbench, create a local instance and add your environment variables to your .env file.
Copy the db.sql file from the database folder to create your database.

Step 5: Start the server
From the terminal located at the root of the project, execute:
npm run dev to start your server and conect to your database.

Step 6: Query the API
Open Postman and click this file to open my collection https://www.getpostman.com/collections/7e36150c15adf330790f
Make the desired queries
default user: username: mnis, passwd: 12345678;
default admin: username: being, passwd kufvhsufgvd;
API documentation
To view the API documentation, you can open the file spec.yaml located in the root directory of the project.