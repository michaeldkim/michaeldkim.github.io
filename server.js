// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import fetch from 'node-fetch';
import express from 'express';
import dotenv from 'dotenv';
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const dbSettings = {
  filename: './tmp/database.db',
  driver: sqlite3.Database
};

async function databaseInitialize(datab) {
  try {
    const db = await open(datab);
    console.log('Success');
  } catch (e) {
    console.log('Error loading Database');
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    console.log('Form data in res.body', req.body);

    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    console.log('data from fetch', json);
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
