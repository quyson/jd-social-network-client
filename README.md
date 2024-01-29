# JD Social Network (Client and Server README.md)

JD Social Network empowers users to connect, share, and engage seamlessly with friends from all around the globe. This web application utilizes a React frontend enhanced with Redux, an Express.JS backend server to handle MVC functionalities and user authentication and authorization, and a MongoDB non-relational database to store user, post, and comment information.

## Client
### Application Structure
1. Navbar: Top navigation bar offering easy access to essential features.
2. CreatePost/CreateComment: Component for creating new posts, including optional image attachments.
3. LikePost and LikeComment: Components responsible for handling likes on posts and comments.
4. AcceptFriend:Component facilitating the acceptance or deletion of friend requests.
5. Post/Comment: Modal component displaying detailed information about a specific post/comment.
6. Homebar: Sidebar component for quick navigation to home, profile, watch, marketplace, gaming, and feeds.
7. Profile: Component rendering user profiles, posts, and interactions.
8. Friendbar: Sidebar component displaying the user's friends.

## Server
This is the backend server for a social media platform implemented using Node.js, Express, and MongoDB. The server provides RESTful API endpoints for user authentication, post creation, comments, friend requests, notifications, and more.

## Application Structure
### Config
1. config/passport.js: Configuration file for Passport authentication strategies, including JWT strategies.
### Models
1. userModel.js: Defines the user schema for MongoDB.
2. postModel.js: Defines the post schema for MongoDB.
3. commentModel.js: Defines the comment schema for MongoDB.
### Controllers
1. authentication.js: Handles user authentication, signup, login, and logout.
2. profile.js: Manages user profiles, friend lists, and profile picture changes.
3. post.js: Handles post-related functionalities, such as creating posts, liking posts, and retrieving posts.
4. comment.js: Manages comments on posts, including creation and liking.
5. search.js: Provides functionality for searching users.
6. request.js: Handles friend requests, cancellations, and acceptances.
7. notifications.js: Manages user notifications.
8. routes/: Defines API routes using express.Router().
### Router
apiRouter.js: Aggregates all routes from different controllers.
### Entry Point
1. app.js: Main entry point for the application. Configures the Express app, connects to MongoDB, and sets up middleware.
### Technologies Used
Node.js: Server-side JavaScript runtime
Express: Web application framework for Node.js
MongoDB (Mongoose): Database for storing user information, posts, and comments
Passport: Authentication middleware for Node.js
JWT (JSON Web Token): Used for user authentication

### Features
1. User Authentication: Supports user signup, login, and logout with password hashing.
2. Profile Management: Allows users to update their profile information and change profile pictures.
3. Friendship System: Handles friend requests, cancellations, acceptances, and unfriending.
4. Posts and Comments: Users can create posts, comment on posts, and like posts and comments.
5. Notifications: Users receive notifications for friend requests, post comments, and likes.

### Key Components
#### Express Set Up:
1. express: Framework for building web applications.
2. mongoose: MongoDB object modeling for Node.js.
3. morgan: HTTP request logger middleware.
4. passport: Authentication middleware.
5. cors: Middleware for enabling Cross-Origin Resource Sharing.
6. session: Express session middleware for managing user sessions.
#### Authentication
User authentication is handled using Passport middleware.
Sessions are managed through the express-session middleware.
#### Database Connection:
Connects to MongoDB using mongoose.
Uses the dbURI and sessionSecret from environment variables.
#### Server Initialization:
Listens on port 8000 after successfully connecting to the database.
#### Middleware Configuration:
Configures middleware such as morgan for logging, express.json() and express.urlencoded() for handling request bodies, and cors for enabling cross-origin requests.
1. Session Handling:
Configures session management using express-session.
Uses a session secret from the environment variables.
2. Passport Configuration:
Initializes and configures Passport for user authentication.
Requires the passport and ./config/passport modules.
3. Routing:
Utilizes the apiRouter for handling various API endpoints.
All API routes are defined in the apiRouter module.
