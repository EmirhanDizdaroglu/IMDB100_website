# IMDb Web Application

This project is an IMDb-like web application developed using the Model-View-Controller (MVC) architectural pattern. The application allows users to browse movies, view movie details, add movies to their watchlist, rate and comment on movies, and perform search functionalities. It supports user registration and authentication via email/password and Google. The application is built using Node.js, Express.js, MySQL, React, and Firebase.

## Public GitHub Repository

The source code for this project can be found at: [IMDb Web Application GitHub Repository](https://github.com/EmirhanDizdaroglu/IMDB_webApp.git)

## Design

The project follows the MVC architectural pattern:

- **Model**: Represents the data and the business logic. In this application, MySQL is used to manage the data, and Sequelize ORM is used to interact with the database.
- **View**: Represents the UI components. React is used to create the user interface.
- **Controller**: Handles user input and updates the model and the view. Express.js is used to handle the routing and business logic.

## Data Model

The application uses the following database schema:

### Users Table

| Column   | Type    | Description                |
|----------|---------|----------------------------|
| user_id  | INT     | Primary key, auto-incremented |
| uid      | VARCHAR | Firebase UID               |
| email    | VARCHAR | User email                 |
| password | VARCHAR | User password (hashed)     |
| country  | VARCHAR | User country               |
| city     | VARCHAR | User city                  |

### Movies Table

| Column       | Type    | Description                |
|--------------|---------|----------------------------|
| movie_id     | INT     | Primary key, auto-incremented |
| title        | VARCHAR | Movie title                |
| summary      | TEXT    | Movie summary              |
| release_year | INT     | Year of release            |
| genre        | VARCHAR | Genre                      |
| duration     | INT     | Duration in minutes        |
| imdb_score   | FLOAT   | IMDb score                 |
| trailer_url  | VARCHAR | URL to the trailer         |

### Film_Actors Table

| Column        | Type    | Description                |
|---------------|---------|----------------------------|
| movie_id      | INT     | Foreign key referencing Movies |
| actor_id      | INT     | Foreign key referencing Actors |
| character_name| VARCHAR | Name of the character      |

### Actors Table

| Column   | Type    | Description                |
|----------|---------|----------------------------|
| actor_id | INT     | Primary key, auto-incremented |
| name     | VARCHAR | Actor name                 |

### Watchlist Table

| Column   | Type    | Description                |
|----------|---------|----------------------------|
| user_id  | INT     | Foreign key referencing Users |
| movie_id | INT     | Foreign key referencing Movies |

## Assumptions

- A movie can have multiple actors.
- A user can add multiple movies to their watchlist.
- User authentication is handled via Firebase for simplicity.
- The popularity of a movie is determined by a mix of ratings, comments, and views.

## Problems Encountered

- **Cross-Origin Resource Sharing (CORS) Issues**: Encountered issues with CORS policy while making API requests from the frontend to the backend. Resolved by configuring CORS in the backend.
- **Database Relations**: Ensuring the relationships between movies, actors, and watchlists were correctly established and queried.
- **Authentication**: Handling authentication via Firebase and ensuring secure user management and session handling.
- **Responsive Design**: Ensuring the application is responsive and provides a good user experience across different devices.
- **Localization**: Implementing i18n for language support and ensuring translations are correctly applied throughout the application.

## Video Presentation

A short video presenting the project can be found at: https://drive.google.com/file/d/1F1qNpG5MvyU6lV2XmJrCZDusHBgnq2is/view?usp=sharing

## Installation

### Prerequisites

- Node.js
- MySQL
- Firebase account
- express.js
- react.js

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/EmirhanDizdaroglu/IMDB_webApp.git

2. Navigate to the backend directory:
    cd IMDB_webApp/backend

3. Install the dependencies:
    npm install
4. Start the backend server:
    npm start

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd IMDB_webApp/frontend

2. Install the dependencies:
    npm install


3. Start the frontend development server:
    npm start

### Usage

- User Registration: Users can register using email and password or via Google authentication.
- Login: Users can log in using their registered email and password or via Google authentication.
- Browse Movies: Users can browse top-rated movies on the home page.
- Movie Details: Clicking on a movie redirects to the movie detail page, showing detailed information, trailer, and actors.
- Add to Watchlist: Logged-in users can add movies to their watchlist.
- Rate and Comment: Logged-in users can rate and comment on movies.

### Contact
For any queries or issues, please contact: 19070001019@stu.yasar.edu.tr
