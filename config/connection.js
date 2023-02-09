const mysql = require('mysql2/promise');

const connectToDb = async () => {
  try {
    const db = await mysql.createConnection(
      {
        host: '127.0.0.1',
        // MySQL Username
        user: 'root',
        // TODO: Add MySQL Password
        password: 'Xam!12345',
        database: 'employee_db',
    
      },
    );
    console.log(`Connected to the employee_db database.`);
    return db;
  } catch (err) {
    console.log('Failed to connect to the employee_db database.');
    console.log(err);
    throw new Error('Failed to connect to the employee_db database.');
  }
}
module.exports = { connectToDb };

// Connect to database