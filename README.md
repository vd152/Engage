# Classroom Extended

Classroom Extended is a student engagement portal developed by [@vd152](https://github.com/vd152/) under Microsoft Engage 2021 program.

Live app: [https://engage.vidhiangrish.com](https://engage.vidhiangrish.com/)

## Problem Statement

Build a functional prototype of a platform that gives students an array of digital academic and social tools to stay engaged with their studies, peers and broader university community during pandemic. 

## Video Demo

Click [here](https://youtu.be/EgdZdPX9SrI) to open the web application.

## Features

- User Authentication and session storage with JWT tokens
- Vaccination Certificate Verification (only for India)
- Class scheduler with preference for mode of class
- Discussion forum
- Admin panel to modify user role permission and forum moderation

## Tech Stack

**Server:** NodeJs, ExpressJs

**Client:** ReactJs

**Database:** MongoDB

## Agile Methodology

### Documentation: [Doc](https://docs.google.com/document/d/1_7bkD1yZgsSdIDACvUz7A3E76T4yFxrCCwsoc970z-k/edit?usp=sharing)

### Brief: 
* I divided the 3-week program into four sprints. Each sprint consists of 5-6 days.
* In the first sprint, I researched on the problem statement and decided the major features of the application i.e. Class Scheduler and Online Forum Community.
* I completed the flow of my application and decided the models that my application will contain in the first week itself.
* In the second sprint, I started making the web application, beginning with the application initialization, router setup, models creations, and user authentication. I also began creating the UI of the application and the admin panel.
* In the third sprint, I implemented the Group and Scheduler features along with setting up permissions for the user roles.
* In the final sprint, I integrated the vaccine certification verification provided by COWIN India and implemented the Forum post, likes and comments features.

## Run Locally

Clone project
```bash
  git clone https://github.com/vd152/Engage.git
```

Go to the project directory

```bash
  cd Engage
```

Install backend dependencies

```bash
  npm install
```

Install frontend dependencies

```bash
  cd ./client/
  npm install
```
Create .env file in project root

```bash
  MONGO_URI=your_mongo_uri
  JWT_SECRET=your_secret
```

Start the development by running following in project root in different terminals

```bash
  npm start
  npm run client
```

## License
[MIT](https://choosealicense.com/licenses/mit/)