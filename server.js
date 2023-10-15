const mongoose = require('mongoose');
const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const fs = require("fs")
const port = 3000
const path = require("path")
const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Load the service account key JSON file
const key = require('/Users/aadityaprajapat/Downloads/World wide education/world-wide-education-402106-4dfa1ae95edb.json');
const { time } = require('console');
const { file } = require('googleapis/build/src/apis/file');

// Initialize the Google Sheets API with the service account credentials
const client = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);

app.use(express.static('Expeses'))
app.use(express.static('Serving files'))
app.use(express.static('Login page'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Login page/Desktop1.html"))
})
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "Serving files/Desktop1.html"))
})
app.get("/f51f05c3be8d61bec0cfeb64259bb04fa3d01cb9", (req, res) => {
    res.sendFile(path.join(__dirname, "Expeses/LogInPage.html"))
})
app.get("/2R9tYqP5xMn3WbK7cZjDvF6hJ8LsXgH4V1QpTlGf", (req, res) => {
    res.sendFile(path.join(__dirname, "Serving files/Desktop1.html"))
});

try {

    function givetime() {
        const currentTime = new Date();
        const currentMonth = currentTime.getMonth()
        const currentyear = currentTime.getFullYear()
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentDate = currentTime.getDate();
        if (currentMinutes < 9) {
            return time = `${currentMonth}/${currentDate}/${currentyear}   ${currentHour}:0${currentMinutes}`
        }
        else {
            return time = `${currentMonth}/${currentDate}/${currentyear}   ${currentHour}:${currentMinutes}`
        }
        return time
    }

    app.post('/receive-data', (req, res) => {
        const receivedData = req.body; // Access data sent from the frontend
        console.log('Received data:', receivedData);

        const spreadsheetId = '1l0QkQdk80OU5ok8dhstkj5Fpkgf7YdA8Tmc0ihAIecY';

        if (receivedData.Batch == "Delhi police") {
            file1 = "DP";
        }
        else {
            file1 = "SSC";
        }

        const sheetName = file1

        async function writeToGoogleSheets() {
            try {
                await client.authorize();
                const sheetsAPI = google.sheets({ version: 'v4', auth: client });


                const data = [
                    [receivedData.Name, receivedData.Payment, receivedData.Batch, receivedData.Amount]
                ];

                await sheetsAPI.spreadsheets.values.append({
                    spreadsheetId,
                    range: `${sheetName}!A1`, // Starting cell
                    valueInputOption: 'RAW',
                    insertDataOption: 'INSERT_ROWS',
                    resource: {
                        values: data,
                    },
                });

                console.log('Data sent to Google Sheets.');
            } catch (error) {
                console.error('Error sending data to Google Sheets:', error);
            }
        }

        writeToGoogleSheets();
    });


    app.post('/receive-user', (req, res) => {
        const receivedData = req.body;
        console.log(receivedData)
        if (receivedData.User == "User1" && receivedData.Passward == "WorldWide123" && receivedData.page == "Fees-entries") {
            res.json({ message: '/2R9tYqP5xMn3WbK7cZjDvF6hJ8LsXgH4V1QpTlGf', Userstatus: "User1" });
        }
        else if (receivedData.User == "User2" && receivedData.Passward == "WorldEducation123" && receivedData.page == "Fees-entries") {
            res.json({ message: '/2R9tYqP5xMn3WbK7cZjDvF6hJ8LsXgH4V1QpTlGf', Userstatus: "User2" });
        }
        else if (receivedData.User == "User1" && receivedData.Passward == "WorldWide123" && receivedData.page == "Expenses") {
            res.json({ message: '/f51f05c3be8d61bec0cfeb64259bb04fa3d01cb9', Userstatus: "User1" });
        }
        else if (receivedData.User == "User2" && receivedData.Passward == "WorldEducation123" && receivedData.page == "Expenses") {
            res.json({ message: '/f51f05c3be8d61bec0cfeb64259bb04fa3d01cb9', Userstatus: "User2" });
        }
        else if (receivedData.User == "User1" && receivedData.Passward == "WorldWide123" && receivedData.page == "Please select only one check box!") {
            res.json({ message: receivedData.page, Userstatus: "User1" });
        }
        else if (receivedData.User == "User2" && receivedData.Passward == "WorldEducation123" && receivedData.page == "Please select only one check box!") {
            res.json({ message: receivedData.page, Userstatus: "User2" });
        }
        else if (receivedData.User == "User1" && receivedData.Passward == "WorldWide123" && receivedData.page == "Please select one check box!") {
            res.json({ message: receivedData.page, Userstatus: "User1" });
        }
        else if (receivedData.User == "User2" && receivedData.Passward == "WorldEducation123" && receivedData.page == "Please select one check box!") {
            res.json({ message: receivedData.page, Userstatus: "User2" });
        }
        else {
            res.json({ message: 'NotDone' });
        }
    });


    app.post('/backend-endpoint', (req, res) => {
        const requestData = req.body;
        console.log(requestData)
        if (requestData.Amount == "55555" && requestData.Remark == "") {
            res.json({ message: 'Pass done' });
        }
        else {

            const spreadsheetId = '1uaFtQnV3slywT9owD6bZUbWfFGUfjtiubYEWmkv6Zjs';

            // The name of the target sheet within the Google Sheet
            const sheetName = 'Sheet1';
            // Data to send to Google Sheets



            async function writeToGoogleSheets() {
                try {
                    await client.authorize();
                    const sheetsAPI = google.sheets({ version: 'v4', auth: client });

                    

                    const data = [
                        [requestData.Name, requestData.Amount, requestData.Remark]
                    ];

                    await sheetsAPI.spreadsheets.values.append({
                        spreadsheetId,
                        range: `${sheetName}!A1`, // Starting cell
                        valueInputOption: 'RAW',
                        insertDataOption: 'INSERT_ROWS',
                        resource: {
                            values: data,
                        },
                    });

                    console.log('Data sent to Google Sheets.');
                } catch (error) {
                    console.error('Error sending data to Google Sheets:', error);
                }
            }

            writeToGoogleSheets();
        }
    });


    app.post('/backend-name', (req, res) => {
        const requestData = req.body;
        console.log(requestData)

        async function Aadi() {
            await mongoose.connect('mongodb+srv://user1:Worldwide123@worldwideeducation.zrfilnx.mongodb.net/zBackend', { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("We are connected to the server ")

            const kittySchema = new mongoose.Schema({
                Name: String,
            }, { versionKey: false });


            const Kitten = mongoose.model("Name", kittySchema)
            mongoose.models = {}


            const harrykitty = await new Kitten({ Name: requestData.Name });


            const kittens = await Kitten.insertMany(harrykitty);
            console.log(kittens);

        }
        (async () => {
            await Aadi().catch(err => console.log(err));
            mongoose.connection.close();
        })();

    });


    app.post('/backend-getname', (req, res) => {
        async function Aadi() {
            await mongoose.connect('mongodb+srv://user1:Worldwide123@worldwideeducation.zrfilnx.mongodb.net/zBackend', { useNewUrlParser: true, useUnifiedTopology: true });
            console.log("We are connected to the server ")


            const kittySchema = new mongoose.Schema({
                name: String,
                rollno: Number,
                class: String
            }, { versionKey: false });;

            const Kitten = mongoose.model('names', kittySchema);
            mongoose.models = {}


            // const harrykitty = new Kitten({ name: "Aaditya", rollno: 10, class: "9A" });


            const kittens = await Kitten.find({});
            return kittens
        }
        (async () => {
            const a = await Aadi().catch(err => console.log(err));
            mongoose.connection.close();
            res.json(a)
        })();


    });
} catch (error) {
    console.log(error)
}


app.listen(port, () => {
    console.log('The file is running on http://localhost:3000');
});