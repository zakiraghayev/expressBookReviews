const express = require('express');
const axios = require('axios');
const public_users_async = express.Router();

const BASE_URL = "http://localhost:5000"

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

function asyncHandler(fn) {
    return function(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}


public_users_async.get('/', asyncHandler(async function (req, res) {
    const response = await axiosInstance.get('/');
    res.status(200).json(response.data);
}));

public_users_async.get('/isbn/:isbn', asyncHandler(async function (req, res) {
    const { isbn } = req.params;
    const response = await axiosInstance.get(`/isbn/${isbn}`);
    res.status(200).json(response.data);
}));

public_users_async.get('/author/:author', asyncHandler(async function (req, res) {
    const { author } = req.params;
    const response = await axiosInstance.get(`/author/${author}`);
    res.status(200).json(response.data);
}));

public_users_async.get('/title/:title', asyncHandler(async function (req, res) {
    const { title } = req.params;
    const response = await axiosInstance.get(`/title/${title}`);
    res.status(200).json(response.data);
}));


module.exports.general = public_users_async;
