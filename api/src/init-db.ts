/* eslint-disable */
import sqlite3 from 'sqlite3';

const DATABASE_FILE = './database.db';

const db = new sqlite3.Database(DATABASE_FILE, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database opened successfully');
  }
});

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL
    )
  `,
    (err) => {
      if (err) {
        console.error('Error create table', err);
      } else {
        console.log('Table created successfully');
      }
    }
  );

  db.run(
    `
    INSERT INTO users (username, email, phone) VALUES
    ('John', 'john@example.com', '12345678'),
    ('Tom', 'tom@example.com', '567890')
  `,
    (err) => {
      if (err) {
        console.error('Error inserting data', err);
      } else {
        console.log('Data inserted successfully');
      }
      db.close();
    }
  );
});
