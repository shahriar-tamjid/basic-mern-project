# Basic MERN Project

### Introduction
This project is for understanding the fundamentals of a MERN application. In this README.md file I have listed all the steps I took to build a very simple MERN application which can perfrom CRUD operations.

### Steps

1. Created server.js file and wrote ```console.log("Hello from Node.js");```
2. Opened the terminal and wrote: ```node server.js``` --> that gave us the output

3. wrote: ```npm init -y``` --> That created a package.json which will keep track of all dependencies
4. Install Express.js --> ```npm install express```

5. After setting up basic web server if we go to terminal and type: ```node server.js``` then our teminal won't stop running
6. Now in the browser if we go to ```localhost:3000``` we will see our welcome message
7. If we go to ```localhost:3000/admin``` then we will see the welcome message for admins
8. So this is already the "E" and "N" of the "MERN" stack

9. We would use MongoDB locally on our machine
10. To do so we will need "Docker Desktop" (Note: We don't need to know anything about to docker in order to use it for managing our MongoDB)

11. Create a new file in root directory named "docker-compose.yml" and paste some boilerplate code there
12. Here we are telling docker that we are going to use MongoDB for data storage and our username and password will be "root"

13. To tell docker to spin-up a MongoDB database we need to open the terminal and type: ```docker compose up -d``` ... This will create a MongoDB databse into our system. We can use that database with MongoDB Compass
14. To stop the database we can type: ```docker compose stop```
15. To start the database we can type: ```docker compose start```
16. We can also use the GUI application to do the same

17. Open the MongoDB Compass and it will ask for a connection URL. There we need to paste ```mongodb://root:root@localhost:27017/``` ... This means we are connecting to the local instance of MongoDB with username and password into the default port
18. Once we are connected to the database we will get 3 default databases ```admin``` , ```config``` and ```local``` ... Let's create our own database named "BasicMernApp" and give it a document name "cats"
19. Now fill up the documents with some random data

20. To connect MongoDB to the app we need to install MongoDB driver: ```npm install mongodb```
21. To connect MongoDB from then Node application we need to pass the connection string as the parameter of the MongoClient which is ```mongodb://root:root@localhost:27017/BasicMernApp?&authSource=admin```

22. We need to restart the server for every changes that we make. It's a tidious task. So to automate this we need to ```npm install nodemon``` This will automatically restart the server with each change that we make
23. To setup nodemon we need to go to ```package.json``` and inside ```scripts``` we need to type the name of our server and necessary command to run that. For example we can type: ```"ourserver": "nodemon server.js"```
24. Now we can just go to the terminal and type ```npm run ourserver``` and then nodemon will automatically restart the server for us anytime we save a change

25. To get the ejs template engine we need to go to terminal and type: ```npm install ejs```

26. To setup React for client side we need a bunch of packages to install. So go to terminal and type:
```
npm install react react-dom @babel/core @babel/preset-react babel-loader webpack webpack-cli webpack-node-externals npm-run-all
```
27. Among all these packages ```webpack``` is the tool that converts React syntax to plain JavaScript
28. How do we tell webpack to do what we need to do? --> We need to create ```webpack.config.js``` file in the root directory. And by pasting some boilerplate code there will do the job
29. Just like ```nodemon``` tracks changes into our server-side file and restarts the server whenever there is a change, the ```webpack``` will also monitor our client-side file and retranspile the browser whenever there is a change
30. To setup webpack we need to go to ```package.json``` and inside ```scripts``` we need to type the name of our webpack and necessary command to run that. For example we can type: ```"ourwebpack": "webpack --watch"```
31. Instead of running our client side and server side separately we can establish a command which can run them both at once. We need to go to the ```scripts``` section of the ```package.json``` file and type: ```"project": "run-p ourserver ourwebpack"```
32. Now we can just go to the terminal and type ```npm run project``` and then both nodemon and webpack will start running
