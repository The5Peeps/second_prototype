const express = require('express');
const Datastore = require('nedb');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Starting server at ${port} ');
});


//use express logic to set up server
//access anything in "public" directory
//serve static content of index.html
app.use(express.static('public'));

//understand incoming data as json
app.use(express.json({ limit: '1mb' }));


//create new database in local server
const database = new Datastore('database.db');
//create database.db file in project folder
database.loadDatabase();



 //using fetch API to POST/GET data to/from database.db
 // '/api' is name of address to receive/return data
app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    //if no error, respond with data 
    //data is usable only as json
    response.json(data);
  });
});


//method to post user data into db
app.post('/api', (request, response) => {
  const data = request.body;
  
  //insert data to database.db datastore
  database.insert(data); 
  //out data in json
  response.json(data);
});
