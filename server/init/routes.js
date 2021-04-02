const express = require('express');
const category = require("./../app/http/routes/category");
const task = require("./../app/http/routes/task");

const cors = require('./../app/http/middleware/cors');
const error = require('./../app/http/middleware/error');
const trimmer = require('./../app/http/middleware/trim');

module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors);
    app.use(trimmer);

    //Routes
    app.use('/api/category', category);
    app.use('/api/task', task);

    //If not routes are match the execution will come here where we will mange the 404
    app.use((req, res, next) => {
        const error = new Error("<NOT_FOUND> Invalid");
        error.status = 404;
        next(error);
    });

    app.use(error);
}

