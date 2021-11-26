# Classroom Extended

is a student engagement portal developed by [@vd152](https://github.com/vd152/) under Microsoft Engage 2021 program.

## Problem Statement

Build a functional prototype of a platform that gives students an array of digital academic and social tools to stay engaged with their studies, peers and broader university community during pandemic. 

## Demo

Click [here]() to open the web application.

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