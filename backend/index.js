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


// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if users exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    // Compare Password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if(!validPassword) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.rows[0].id, username: user.rows[0].username},
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );

    // Send the token
    res.status(200).json({ message: 'Login Successful', token, username: user.rows[0].username});

  } catch (error) {
    console.error('Error in logging in', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add new job application to table
app.post('/api/jobs', authenticateToken, async (req, res) => {
  const { jobTitle, company, salary, dateApplied, status, interviewStage} = req.body;
  const {userId} = req.user

  if(!userId) {
    return res.status(401).json({ message: "Unauthorized"})
  }

  try {
    const query = `INSERT INTO job_applications (user_id, job_title, company, salary, date_applied, status, interview_stage) 
    VALUES($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [userId, jobTitle, company, salary, dateApplied, status, interviewStage];
    await pool.query(query, values)
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Server error'})
  }

});

//Retrieve job list for existing user
app.get('/api/jobs', authenticateToken, async (req, res) => {
  if(!req.user) {
    return res.status(401).json({ messaage: 'Unauthorized'});
  }
  
  const userId = req.user.userId;

  try {
    const query = 'SELECT * FROM job_applications WHERE user_id = $1;'
    const result = await pool.query(query, [userId])

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching job applications', error);
    res.status(500).json({ message: 'Server Error. Please try again.'})
  }
})


app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`)
})