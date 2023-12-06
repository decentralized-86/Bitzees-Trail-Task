const mysql = require('mysql');
require('dotenv').config();

// Setup database connection pool
const pool = mysql.createPool({
  connectionLimit : 10, 
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_NAME
});

// Function to insert transaction details into the database
function insertTransaction(sender, receiver, amount, transactionHash) {
  return new Promise((resolve, reject) => {
    // Input validation (basic example)
    if (typeof sender !== 'string' || typeof receiver !== 'string' || 
        typeof amount !== 'number' || typeof transactionHash !== 'string') {
      reject(new Error('Invalid input types'));
      return;
    }

    const query = 'INSERT INTO transactions (sender, receiver, amount, transactionHash) VALUES (?, ?, ?, ?)';
    console.log("query line executed")
    pool.query(query, [sender, receiver, amount, transactionHash], (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        reject(error);
        return;
      }
      resolve(results.insertId);
    });
  });
}


function closeConnection() {
  pool.end((err) => {
    if (err) {
      console.error('Error closing the database connection pool:', err);
    } else {
      console.log('Database connection pool closed.');
    }
  });
}

// Handle application termination signals
process.on('SIGINT', closeConnection);
process.on('SIGTERM', closeConnection);

module.exports = {
  insertTransaction,
  closeConnection
};
