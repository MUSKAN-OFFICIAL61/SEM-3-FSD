import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(__dirname, "requests.json");

interface CampusRequest {
    id: number;
    studentName: string;
    email: string;
    category: string;
    description: string;
    priority: string;
}

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));


// ===============================
// READ DATA FROM JSON FILE
// ===============================

function getRequests(): CampusRequest[] {

    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }

    const data = fs.readFileSync(FILE, "utf-8");

    return JSON.parse(data);
}


// ===============================
// SAVE DATA TO JSON FILE
// ===============================

function saveRequests(requests: CampusRequest[]): void {

    fs.writeFileSync(
        FILE,
        JSON.stringify(requests, null, 2)
    );
}


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});


// ===============================
// GET ALL REQUESTS
// ===============================

app.get("/api/requests", (req, res) => {

    const requests = getRequests();

    res.json(requests);

});


// ===============================
// GET SINGLE REQUEST
// ===============================

app.get("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);

    const request = requests.find(
        item => item.id === id
    );

    if (!request) {

        return res.status(404).json({
            message: "Request not found"
        });

    }

    res.json(request);

});


// ===============================
// CREATE REQUEST
// ===============================

app.post("/api/requests", (req, res) => {

    const requests = getRequests();

    const newId =
        requests.length === 0
            ? 1
            : Math.max(...requests.map(item => item.id)) + 1;


    const newRequest: CampusRequest = {

        id: newId,

        studentName: req.body.studentName,

        email: req.body.email,

        category: req.body.category,

        description: req.body.description,

        priority: req.body.priority

    };


    requests.push(newRequest);

    saveRequests(requests);


    res.status(201).json(newRequest);

});


// ===============================
// UPDATE REQUEST
// ===============================

app.put("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);

    const index = requests.findIndex(
        item => item.id === id
    );


    if (index === -1) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    const updatedRequest: CampusRequest = {

        id: id,

        studentName: req.body.studentName,

        email: req.body.email,

        category: req.body.category,

        description: req.body.description,

        priority: req.body.priority

    };


    requests[index] = updatedRequest;

    saveRequests(requests);


    res.json(updatedRequest);

});


// ===============================
// DELETE REQUEST
// ===============================

app.delete("/api/requests/:id", (req, res) => {

    const requests = getRequests();

    const id = Number(req.params.id);


    const filteredRequests = requests.filter(
        item => item.id !== id
    );


    if (filteredRequests.length === requests.length) {

        return res.status(404).json({
            message: "Request not found"
        });

    }


    saveRequests(filteredRequests);


    res.json({
        message: "Request deleted successfully"
    });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});