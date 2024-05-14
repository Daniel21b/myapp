const express = require("express");
const axios = require('axios');
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const databaseAndCollection = { db: "CMSC335_DB", collection: "campApplicants" };
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}` +
    `@atlascluster.izgsohy.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get("/", (request, response) => {
    response.render('index');
});

app.post("/processFlightBooking", async (request, response) => {
    const info = {
        name: request.body.name,
        email: request.body.email,
        age: request.body.age,
        ticketNumber: request.body.ticketNumber,
        accommodation: request.body.accommodation,
        flightProvider: request.body.flightProvider,
        nationality: request.body.nationality || null,
        species: request.body.species || null,
        flightClass: request.body.flightClass || null,
        reason: request.body.reason,
        spaceSuitSetting: request.body.spaceSuitSetting,
        cabinEnvironment: request.body.cabinEnvironment,
        specialRequests: request.body.specialRequests,
    };

    console.log('Received data:', info);

    await insertBooking(info);
    response.render("confirmation", { ...info });
});

async function createBookingsCards() {
    try {
        await client.connect();
        const cursor = client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).find({});
        const bookings = await cursor.toArray();

        console.log('Retrieved bookings:', bookings);

        let cardHtml = "<div class='card-container'>";
        bookings.forEach(booking => {
            cardHtml += `<div class='card'>
                            <h3>${booking.name || 'N/A'}</h3>
                            <p><strong>Email:</strong> ${booking.email || 'N/A'}</p>
                            <p><strong>Age:</strong> ${booking.age || 'N/A'}</p>
                            <p><strong>Nationality:</strong> ${booking.nationality || 'N/A'}</p>
                            <p><strong>Species:</strong> ${booking.species || 'N/A'}</p>
                            <p><strong>Class:</strong> ${booking.flightClass || 'N/A'}</p>
                            <p><strong>Flight Provider:</strong> ${booking.flightProvider || 'N/A'}</p>
                            <p><strong>Reason:</strong> ${booking.reason || 'N/A'}</p>
                         </div>`;
        });
        cardHtml += "</div>";

        return cardHtml;
    } catch (e) {
        console.error("Error in createBookingsCards:", e);
        return "Error generating cards: " + e.message;
    } finally {
        await client.close();
    }
}

app.post("/clear", async (request, response) => {
    await deleteAllBookings();
    response.redirect('/');
});

async function insertBooking(info) {
    try {
        await client.connect();
        const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(info);
        console.log('Data inserted successfully:', result.insertedId);
    } catch (e) {
        console.error('Error inserting data:', e);
    } finally {
        await client.close();
    }
}

async function deleteAllBookings() {
    try {
        await client.connect();
        console.log("Booking Database has been cleared");
        const result = await client.db(databaseAndCollection.db)
            .collection(databaseAndCollection.collection)
            .deleteMany({});
        console.log(`Deleted Bookings ${result.deletedCount}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// ISS Tracker Route
app.get('/tracker', async (req, res) => {
    const url = 'http://api.open-notify.org/iss-now.json';
    
    try {
        const response = await axios.get(url);
        const { latitude, longitude } = response.data.iss_position;
        res.render('tracker', { latitude, longitude });
    } catch (error) {
        console.error('Error fetching ISS location:', error);
        res.render('tracker', { latitude: null, longitude: null, error: 'Unable to retrieve ISS location' });
    }
});

const portNumber = process.argv.length === 3 ? process.argv[2] : 3002;
app.listen(portNumber, () => {
    console.log(`Web server started and running at http://localhost:${portNumber}`);
});
