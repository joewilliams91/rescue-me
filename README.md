# Rescue Me

## Description

Rescue Me is a responsive, Tinder-style mobile application designed to connect rescue dogs with potential dog owners, and built using React Native and Redux (front end), and Google Firebase/Cloud Functions (back end). Adopting Tinder's attractive swipe functionality, and combining it with algorithms developed for effectively matching a user's preferences/location with the database of available dogs, the application makes the task of looking for a new dog enjoyable and efficient. 

### Rescue Centre

The rescue centre signs up and provides some basic details about themselves, in addition to their location, the latter of which is important for our user algorithm (below). They then have the facility to add a dog, the input of which comprises a series of questions tailored for extracting information that is salient to a potential dog owner (are they good with children, are they good with dogs, exercise needs, etc), as well as photos/video. The centre can subsequently edit dog information, add more dogs and monitor their inbox. If they receive any messages, they can look at the user's profile before responding in real time chat.

### User

The user signs up and provides detais that can be easily mapped onto the aforementioned dog data (do they have children, do they have dogs, activity level, etc), as well a photo. The form also asks for the user's radius preferences which is integrated with their co-ordinates (obtained behind the scenes). This information is then used to invoke an algorithm on Google Cloud Functions, which will send back a list of dogs matching the user's criteria and within the user's chosen area. These dogs are then rendered one by one, allowing the user to swipe through and view individual dog profiles (like Tinder). 

The user has multiple options upon viewing each dog: they can donate (redirect to PayPal), like a dog (by swiping right) or super like a dog (by pressing the star button). Liking a dog will add that dog to the user's "liked dogs" list, allowing them to easily navigate to potential dogs' profiles with ease. From here they can also begin an instant chat conversation with the centre. The superlike function does exactly the same, but wil bring up the instant chat immediately.


## Getting Started

In order to view and interact with the code, the instructions below must be followed.

### Prerequisites

The following must be installed on your mobile device in order to run this project on that device:

- Expo

The following must be installed on your computer in order to run this project locally:

- Expo
- Node.js
- Node Package Manager (npm)
- git (a github account is also required)

## Installing

Fork and clone this repository. 

App.js contains the actual app, which comprises the main Stack Navigator. The user state is managed in the reducers and actions directories. The majority of the app has been broken down into individual, reusable components, which are saved in the Components directory. 

In order to generate the required dependencies to use the app, go to your terminal and install:

```
npm install
```

Once this is completed, you will be able to run a local development environment to interact with the app by entering 

```
npm start
```

or

```
expo start
```

in your terminal.

Enjoy!


## Authors

Team Rescue Me, Northcoders


## Acknowledgments

Everyone at Northcoders!





