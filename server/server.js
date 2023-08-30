const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// PostgreSQL setup
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

// Routes
app.get('/api/rounds', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rounds ORDER BY date DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.get('/api/handicap', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM rounds ORDER BY date DESC');
      res.json(result.rows);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

app.post('/api/rounds', async (req, res) => {
    try {
        const { course, score, course_rating, slope_rating, date } = req.body;
        const result = await pool.query(
        'INSERT INTO rounds (course, score, course_rating, slope_rating, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [course, score, course_rating, slope_rating, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.delete('/api/rounds/:id', async (req, res) => {
    const roundId = req.params.id;
  
    try {
      const deleteQuery = 'DELETE FROM rounds WHERE id = $1 RETURNING *';
      const { rows } = await pool.query(deleteQuery, [roundId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Round not found' });
      }
  
      res.json({ message: 'Round deleted successfully' });
    } catch (error) {
      console.error('Error deleting round:', error);
      res.status(500).json({ error: 'An error occurred while deleting the round' });
    }
  });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
