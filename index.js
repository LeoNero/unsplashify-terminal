#!/usr/bin/env node

'use strict';

const request = require('request');
const wallpaper = require('wallpaper');
const fs = require('fs');
const path = require('path');

let dir = path.join(__dirname, '/photos/');

const URL = 'https://unsplash.com/?photo=';

let args = process.argv;
let photoId = args[2];
let downloadURL = URL + photoId + '/download';

let stream = fs.createWriteStream(dir + photoId)
  .on('info', info => {
  
  })
  .on('data', data => {
  
  })
  .on('finish', () => {
  
  });

request.get(downloadURL)
  .pipe(stream)
  .on('error', err => {
    console.log('Erro ao fazer download: ' + err);
  });

