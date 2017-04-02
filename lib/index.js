"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path_1 = require("path");
exports.http_apps = [
    express.static(path_1.join(__dirname, '..', 'public')),
];
