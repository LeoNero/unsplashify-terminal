#!/usr/bin/env node

'use strict';

const request = require('request');
const wallpaper = require('wallpaper');
const fs = require('fs');

const URL = 'https://unsplash.com/?photo=';

let args = process.argv;

let photoId = args[2];

request.get(URL + photoId).on('error', function(err) {
    console.log(err);
  }).pipe(fs.createWriteStream(photoId + '.png'));

