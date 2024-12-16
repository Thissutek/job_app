require('dotenv').config();
const express = require('express');
const cors = require('cors')

const bcrypt = require('bcryptjs');
const pool = require('./db/db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Backend')
})

//Sign Up Route
app.post('/api/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      //Checks if the user inputted email exists within the table
      const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({message: 'Email already exists'});
      }
  
      //Hash the Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      //Insert the new user into the database
      const newUser = await pool.query(`INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`, [username, email, hashedPassword]);
  
      res.status(201).json({message: 'User registered successfully', user: newUser.rows[0]} );
    } catch (error) {
      console.error('Error in registration', error);
      res.status(500).json({message: 'Server error'});
    }
  }); 





app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`)
})