# 🖥️ Instaclone

Instaclone is a full-stack application designed to mimic the popular social media app Instagram. Users can log in, follow users, make posts, like posts, reset their passwords and more. This application is built using the MERN stack (MongoDB, Express, React, Node.js) and includes user authentication for a personalized experience.

You can visit the deployed version [here.](https://instagramclone-frontend.onrender.com) (It may take up to two minutes load initially)

![Demo](/imgs/Instaclone_demo.gif)

## 🧠 Features

- **🔐 User Authentication:** Secure login and signup functionality using JWTs for user sessions.
- **🖼️ Post Management:** Users can post, view, and delete their own posts. They can also view, comment, and like other users' posts.
- **👥 User Management:** Users can search for specific people and can follow and unfollow other users.
- **☁️ Cloud Usage:** Using Google Cloud Services(GCS), users will receive confirmation emails when they create an account. To reset their password they will also receive a secure link to reset their password in their email. Photos are also managed through the GCS.
- **⚠️ Error Handling:** Provides meaningful feedback for failed operations such as invalid login credentials, missing fields in forms, and unauthorized actions.

## 🎨 Front End Details

The frontend is built using React and makes API calls to the backend for managing posts, comments, users, and user authentication. Key components include:

- **📝 Create Post Form:** Handles creating a new post, includes photos, title, and body.
- **🧭 Navigation Bar:** Provides seamless navigation across the app, with restricted access to certain features based on user authentication.
- **📬 Post:** Represents an individual post, complete with a title, body, and caption. 
- **🛡️ Authentication Context:** Used to manage user's logged in status globally
- **👥 Feed Page:** Used so users can see all posts from people they follow, ordered from most to least recent.
- **👤 Profile Page:** Gives a quick overview of a user. Displays the user's recent posts, total post count, and follower/following statistics.
- **🔍 Search Modal:** Allows users to search for specific people.
- **📷 Post Card:** Displays post details in a structured and visually appealing format

## 🤖 Backend Details:
The backend is built using Node.js and Express.js to create a RESTful API that connects to a MongoDB database responsible for CRUD operations.

### 🛡️ Authentication API Endpoints
- **POST** /api/auth/login: Authenticates a user by validating their email and password. If the credentials are correct, it returns a JWT for session management.
- **POST** /api/auth/signup: Creates a new user account by validating the provided email and password. The password is securely hashed before saving the user, and a JWT is returned upon successful registration.
- **POST** /api/auth/resetpassword: Sends an email to the requested email, that contains a link to a page for the user to reset their password
- **POST** /api/auth/newpassword: Given a new password, it hashes the raw password and updates it in the database for the specified user

### 📮 Post API Endpoints
- **POST** /api/posts/createpost: Creates a new post
- **GET** /api/posts/allposts: Retrieves all posts from all users
- **GET** /api/posts/followingposts: Retrieves posts only from followed users
- **GET** /api/posts/myposts: Retrieves posts from the authenticated user
- **PUT** /api/posts/like/:id: Likes a post
- **PUT** /api/posts/unlike/:id: Unlikes a post
- **PUT** /api/posts/comment/:id: Adds a comment to a post
- **DELETE** /api/posts/delete/:id: Deletes a post

### 👤 USER API Endpoints
- **GET** /api/users/:id: Retrieves user profile information
- **PUT** /api/users/follow/:id: Follows a user
- **PUT** /api/users/unfollow/:id: Unfollows a user
- **PUT** /api/users/updatepic: Updates an authenticated user's profile pic
- **POST** /api/users/searchusers: Searches for users by name

## 💻 Tech Stack
The code was built with the following tech stack
- **Frontend:** React, Javascript, HTML, CSS, Materialize
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Cloud Services:** Google Cloud Services
