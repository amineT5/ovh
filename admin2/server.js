const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the directory containing server.js
app.use(express.static(path.join(__dirname, '/')));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'aminfordevelopment12?',
    database: 'patientDB'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.post('/api/patients', (req, res) => {
    const { patientId, name, cin, telephone, address, dob, dateConsultation } = req.body;
    const query = 'INSERT INTO patients (patientId, name, cin, telephone, address, dob, dateConsultation) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [patientId, name, cin, telephone, address, dob, dateConsultation], (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
});

app.get('/api/patients', (req, res) => {
    const query = 'SELECT * FROM patients';
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
});

app.delete('/api/patients/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM patients WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(204).send();
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
