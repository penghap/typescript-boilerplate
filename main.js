/**
 * Entrypoint for node.js app @ heroku
 */
"use strict";

if (require.main !== module) {
    throw "this file is not available for import export";
}

const lib = require('./lib');

const express = require('express');

const root_app = express();

const port = process.env.PORT || 5000;
// TODO we can add wss apps as well. see https://stackoverflow.com/questions/34808925/

for (const app of lib.http_apps) {
    root_app.use(app);
}

root_app.listen(port, () => {
    console.log(`Node app is running on port ${port}`);
});
