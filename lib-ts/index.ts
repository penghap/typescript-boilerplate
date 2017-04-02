const express = require('express');

import { join } from 'path';

export const http_apps = [
    express.static(join(__dirname, '..', 'public')),
];
