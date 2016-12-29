#!/usr/bin/env node

'use strict';

const request = require('request');
const fs = require('fs');
const path = require('path');

let dir = path.join(__dirname, '/photos/');

const URL = 'https://unsplash.com/?photo=';

let args = process.argv;
let photoId = args[2];
let downloadURL = URL + photoId + '/download';

let totalBytes = 0;
let receivedBytes = 0;

checkIfFolderPhotosExists();
downloadPhoto();

function checkIfFolderPhotosExists() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

function downloadPhoto() {
  let stream = fs.createWriteStream(dir + photoId)
    .on('finish', () => {
      console.log("Download finished");
      setWallpaper();
    });

  let requestPhoto = request({
    method: 'GET',
    uri: downloadURL
  });

  requestPhoto.pipe(stream);

  requestPhoto.on('response', data => {
    totalBytes = parseInt(data.headers['content-length' ]);
  });

  requestPhoto.on('data', chunk => {
    receivedBytes += chunk.length;
    showDownloadProgress(receivedBytes, totalBytes);
  });

  requestPhoto.on('error', err => {
    console.log("Error while downloading: " + err);
  })
}

let oldPercentage = 0;

function showDownloadProgress(received, total) {
  let percentage = (received * 100) / total;
  let percentageRounded = Math.round(percentage);

  if (percentageRounded !== oldPercentage) {
    console.log(`Download in progress: ${percentageRounded}%`);
    oldPercentage = percentageRounded;
  }
}

function setWallpaper() {
  let exec = require('child_process').exec;
  let cmd = 'gsettings set org.gnome.desktop.background picture-uri file://' + path.join(dir, photoId);

  exec(cmd, (err, stdout, stderr) => {
    if (err instanceof Error) {
      throw err;
    } else {
      console.log('Wallpaper set!');
    }

    process.stderr.write(err);
    process.stdout.write(out);
  });
}

