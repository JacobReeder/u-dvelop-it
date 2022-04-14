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

app.get('/api/candidates', (req, res) => {
   const sql = `SELECT * FROM candidates`;

db.query(sql, (err, rows) => { //GET candidates
  if (err) {
    res.status(500).json({ error: err.message });
    return;
 }
  res.json({
    message: 'success',
    data: rows
  });
});
});


//GET single candidate
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

db.query(sql, params, (err, row) => {
  if (err) {
   res.status(400).json({ error: err.message });
   return;
}
 res.json({
   message: 'success',
   data: row
 
});
});
});

//DELETE candidate
app.get('api/candidates/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.statusMessage(400).json({ error: res.message });
 } else if (!result.affectedRows) {
  res.json({
    message: 'Candidate not found',
  });
} else {
  res.json({
    message: 'deleted',
    changes: result.affectedRows,
    id: req.params.id
  });
}
});
});

//Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
             VALUES (?,?,?,?)`;
  const params = [1, 'Ronald', 'Firbank', 1];

  db.query(sql, params, (err, result) => {
    if(err) {
     console.log(err);
   }
   console.log(result);
  });


///catchall --must be placed last
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});