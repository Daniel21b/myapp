# Fly Me to the Moon atribute to Frank Sinatra


## Overview
Fly Me to the Moon is a web application that allows users to book flights to the moon. Users can enter their details, choose their flight preferences, and confirm their bookings. The application uses Express.js for the backend, MongoDB for data storage, and EJS for templating.

#liveServer
https://myapp-8hx7.onrender.com/

youtubedemo
https://youtu.be/NCPOx-bVtuI

##
Daniel Berhane

UID: 120206849



## Api used
'http://api.open-notify.org/iss-now.json'



## Features
- User can fill out a form to book a flight to the moon.
- User details are stored in a MongoDB database.
- Users can view a confirmation page with their booking details.
- Admin can clear the booking database.
- Real-time ISS tracker integration.

## Prerequisites
- Node.js
- MongoDB
Additional Libraries: body-parser, dotenv, mongodb, axios

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/myapp.git
    cd myapp
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add your MongoDB credentials:
    ```env
    MONGO_DB_USERNAME=yourMongoDBUsername
    MONGO_DB_PASSWORD=yourMongoDBPassword
    MONGO_DB_NAME=CMSC335_DB
    ```

## Running the Application

1. Start the server:
    ```sh
    node app.js
    ```

2. Open your browser and navigate to:
    ```
    http://localhost:3002
    ```

## Project Structure

- `app.js`: Main server file.
- `views/`: EJS templates for rendering HTML pages.
- `public/`: Static files (CSS, JavaScript).
- `public/styles/`: CSS files for styling.
- `.env`: Environment variables (not included in the repository).

## Usage

### Booking a Flight

1. Navigate to the home page.
2. Fill out the flight booking form with your details.
3. Submit the form to see your booking confirmation.

### Viewing Bookings

- The confirmation page will display your booking details along with a table of all bookings.

### Clearing the Database

- Navigate to the appropriate admin route 

### ISS Tracker

- Navigate to `/tracker` to view the real-time location of the ISS.

## Troubleshooting

### Common Errors

- **Database Connection Error**: Ensure your MongoDB credentials are correct and the MongoDB server is running.
- **Form Submission Error**: Ensure all required form fields are filled out.
- **Undefined Data Fields**: Ensure all expected fields are included in the form and route handler.

## Logging

- The application logs received data and any errors during database insertion.
- Check the server console for logs to troubleshoot issues.

##  over the summer  Improvements

- Add user authentication.
- Improve form validation.
- Add more detailed error handling and user feedback.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
