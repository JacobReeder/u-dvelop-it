const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Tstsb9horror!',
      database: 'election'
    },
    console.log('Connected to the election database.')
  );

//db.query(`SELECT * FROM candidates`, (err, rows) => { //GET candidates
//  console.log(rows);
//});

//GET single candidate
//db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
 // if (err) {
 //   console.log(err);
//}
//console.log(row);
//});

//DELETE candidate
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
 // if (err) {
 //   console.log(err);
//  }
//  console.log(result);
//});

//Create a candidate
//const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
 //             VALUES (?,?,?,?)`;
 // const params = [1, 'Ronald', 'Firbank', 1];

 // db.query(sql, params, (err, result) => {
  //  if(err) {
  //    console.log(err);
  //  }
  //  console.log(result);
  //});


///catchall --must be placed last
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});