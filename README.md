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
10. Open MongoDB Compass and click on ```Connect``` without giving any connection string to it. This will show us some pre-built databases which we can avoid
11. We can create our database from the ```+``` sign below and name it as ```BasicMernApp``` and we can also give it a collection. Let's name it as ```cats``` then we can add some data to that collection
12. To connect MongoDB to the app we need to install MongoDB driver: ```npm install mongodb```
13. When we are working locally with MongoDB the connection string will be ```mongodb://localhost:27017/DB_NAME```

14. We need to restart the server for every changes that we make. It's a tidious task. So to automate this we need to ```npm install nodemon``` This will automatically restart the server with each change that we make
15. To setup nodemon we need to go to ```package.json``` and inside ```scripts``` we need to type the name of our server and necessary command to run that. For example we can type: ```"ourserver": "nodemon server.js"```
16. Now we can just go to the terminal and type ```npm run ourserver``` and then nodemon will automatically restart the server for us anytime we save a change

17. To get the ejs template engine we need to go to terminal and type: ```npm install ejs```

18. To setup React for client side we need a bunch of packages to install. So go to terminal and type:
```
npm install react react-dom @babel/core @babel/preset-react babel-loader webpack webpack-cli webpack-node-externals npm-run-all
```
19. Among all these packages ```webpack``` is the tool that converts React syntax to plain JavaScript
20. How do we tell webpack to do what we need to do? --> We need to create ```webpack.config.js``` file in the root directory. And by pasting some boilerplate code there will do the job
21. Just like ```nodemon``` tracks changes into our server-side file and restarts the server whenever there is a change, the ```webpack``` will also monitor our client-side file and retranspile the browser whenever there is a change
22. To setup webpack we need to go to ```package.json``` and inside ```scripts``` we need to type the name of our webpack and necessary command to run that. For example we can type: ```"ourwebpack": "webpack --watch"```
23. Instead of running our client side and server side separately we can establish a command which can run them both at once. We need to go to the ```scripts``` section of the ```package.json``` file and type: ```"project": "run-p ourserver ourwebpack"```
24. Now we can just go to the terminal and type ```npm run project``` and then both nodemon and webpack will start running

25. To fetch and send data from React application we can go to terminal and type: ```npm install axios```
26. Link the CSS stylesheet from ```Bootstrap``` in the ```admin.ejs``` file
27. Create a new file ```my-custom.css``` in the ```public``` folder and attach it to the ```admin.ejs```
28. Style the UI of admin page using React in two files ```CatCard.js``` and ```CreateNewForm.js```

29. Whenever we need to send files to the database we need to use a package named ```Multer``` To install it go to the terminal and type: ```npm install multer```
30.  To cleanup data we need a package called ```Sanitize HTML``` To install it go to the terminal and type: ```npm install sanitize-html```

31. To upload images we need to instruct the system to make a folder into the ```public``` directory and resize the image before storing there. To do so we will be needing two packages called ```fs-extra``` and ```sharp```
32. ```fs-extra``` is a package to manage files and folders in Node app and ```sharp``` is a package to resize images. To install them go to the terminal and type: ```npm install fs-extra sharp```
