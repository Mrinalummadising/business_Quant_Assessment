const express = require('express');
const mysql = require('mysql');

//connect to MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'sample_data_qaunt',
  connectionLimit: 10
});


connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Retrieve sample data historic
app.get('/sample_data_historic/:ticker', (req, res) => {
  const { ticker } = req.params;
  const { column, period } = req.query;

  if (!ticker || !column || !period) {
    res.status(400).json({ error: 'Missing required parameters: column or period' });
    return;
  }

  const columns = column.split(',');
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear() - parseInt(period), currentDate.getMonth(), currentDate.getDate());

  let sql = `SELECT ticker, ${columns.join(',')} FROM sample_data_historic WHERE ticker = ? AND STR_TO_DATE(date, '%m/%d/%Y') >= ?`;

  connection.query(sql, [ticker, startDate], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Data not found for the provided parameters' });
      return;
    }
    res.json(result);
  });
});

// Add sample data historic
app.post('/sample_data_historic', (req, res) => {
  const { ticker, date, gp, fcf, capex } = req.body;
  const sql = `INSERT INTO sample_data_historic (ticker, date, gp, fcf, capex) VALUES (?, ?, ?, ?, ?)`;
  connection.query(sql, [ticker, date, gp, fcf, capex], (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
      return;
    }
    res.status(201).send('User created successfully');
  });
});

// Update sample data historic
app.put('/sample_data_historic/:ticker', (req, res) => {
  const tickerToUpdate = req.params.ticker;
  const { ticker, date, gp, fcf, capex } = req.body;
  const sql = 'UPDATE sample_data_historic SET ticker = ?, date = ?, gp = ?, fcf = ?, capex = ? WHERE ticker = ?';
  connection.query(sql, [ticker, date, gp, fcf, capex, tickerToUpdate], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Stock updated successfully' });
  });
});

// Delete sample data historic
app.delete('/sample_data_historic/:ticker', (req, res) => {
  const tickerToDelete = req.params.ticker;
  const sql = 'DELETE FROM sample_data_historic WHERE ticker = ?';
  connection.query(sql, [tickerToDelete], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Stock deleted successfully' });
  });
});
