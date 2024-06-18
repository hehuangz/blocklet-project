/* eslint-disable no-console, import/prefer-default-export */
import sqlite3 from 'sqlite3';

const DATABASE_FILE = './database.db';

export function openDb(): sqlite3.Database {
  return new sqlite3.Database(DATABASE_FILE, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log('Database opened successfully');
    }
  });
}
