# Aapke Notes

Aapke notes is a notes taking web application that is built on MERN(MySQL,Express,Reactjs and Nodejs) stack with a wrapper of typescript on backend and frontend.
This application is built for those users who need to maintain notes of the tasks they need to done in a day, this application has a feature by virtue of which,
you can classify your note based on priority (High, Medium or low), so that it is easy for you to prioritize your tasks.

## Special Feature

I have used Text-To-Speech api for speaking up the notes for users who are not able to speak. 

## Folder Structure 
<img src="https://github.com/imyogeshgaur/aapke-notes/blob/master/folder_structure.PNG">

## Working of Project 

Step 1 : Create a database named as notesapp in MySQL database.

Step 2 : Create a .env file in the backend folder (see folder structure) with following credentials

```
  DB_URL = mysql://USERNAME:PASSWORD@localhost:3306/notesapp
  JWT_SECRET = YOUR_JWT_SECRET
  MAIL_ID = YOUR_OUTLOOK_ID
  MAIL_PASSWORD = YOUR_OUTLOOK_PASSWORD
  FRONTEND_URL = http://localhost:5173
```

Step 3 : Run the backend of the application by the following command
```
  cd backend 
  npm start or yarn start
```

Step 4 : Run the frontend of the application by the following command
```
  cd frontend 
  npm start or yarn start
```
