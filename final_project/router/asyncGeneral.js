const express = require('express');
const axios = require('axios');
const public_users_async = express.Router();

const BASE_URL = "http://localhost:5000/"
// Get the book list available in the shop
public_users_async.get('/', async function (req, res) {
    //Write your code here

    try {
        const response = await axios.get(BASE_URL);
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports.general = public_users_async;
