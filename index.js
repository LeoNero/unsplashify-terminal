#!/usr/bin/env node

'use strict';

const request = require('request');
const wallpaper = require('wallpaper');

const URL = 'https://unsplash.com/photos/';

let args = process.argv;

let photoId = args[2];
